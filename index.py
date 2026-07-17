import base64
import json
import os
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json; charset=utf-8',
}

REQUIRED_FIELDS = ('name', 'phone', 'contact_channel')

FIELD_LABELS = (
    ('name', 'Имя'),
    ('phone', 'Телефон'),
    ('contact_channel', 'Удобный канал связи'),
)

EMAIL_ADDRESS_PATTERN = re.compile(r'^[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+$')


def _response(status_code, payload=None):
    return {
        'statusCode': status_code,
        'headers': CORS_HEADERS,
        'body': '' if payload is None else json.dumps(payload, ensure_ascii=False),
    }


def _get_method(event):
    request_context = event.get('requestContext') or {}
    http_context = request_context.get('http') or {}
    return (event.get('httpMethod') or event.get('method') or http_context.get('method') or 'POST').upper()


def _parse_json_body(event):
    raw_body = event.get('body') or '{}'

    if isinstance(raw_body, dict):
        return raw_body

    if event.get('isBase64Encoded'):
        raw_body = base64.b64decode(raw_body).decode('utf-8')

    return json.loads(raw_body)


def _clean_value(value, max_length=2000):
    if value is None:
        return ''

    return str(value).strip()[:max_length]


def _normalize_payload(payload):
    return {
        str(key): _clean_value(value)
        for key, value in payload.items()
        if value is not None and _clean_value(value)
    }


def _format_lead(data):
    lines = ['Новая заявка с сайта Malta Crown', '']

    for key, label in FIELD_LABELS:
        value = data.get(key)
        if value:
            lines.append(f'{label}: {value}')

    return '\n'.join(lines)


def _get_smtp_recipients(raw_recipients):
    if not isinstance(raw_recipients, str):
        raise ValueError('SMTP_TO_EMAIL must be a comma-separated string')

    recipients = []
    seen = set()
    for raw_recipient in raw_recipients.split(','):
        recipient = raw_recipient.strip()
        if not EMAIL_ADDRESS_PATTERN.fullmatch(recipient):
            raise ValueError('SMTP_TO_EMAIL contains an invalid recipient')

        normalized = recipient.lower()
        if normalized not in seen:
            recipients.append(normalized)
            seen.add(normalized)

    if not recipients:
        raise ValueError('SMTP_TO_EMAIL must contain at least one recipient')

    return recipients


def handler(event, context):
    try:
        method = _get_method(event)

        if method == 'OPTIONS':
            return _response(204)

        if method != 'POST':
            return _response(405, {'status': 'error', 'message': 'Method not allowed'})

        try:
            body = _parse_json_body(event)
        except (TypeError, ValueError):
            return _response(400, {'status': 'error', 'message': 'Invalid JSON body'})

        if not isinstance(body, dict):
            return _response(400, {'status': 'error', 'message': 'Invalid request body'})

        data = _normalize_payload(body)
        missing_fields = [field for field in REQUIRED_FIELDS if not data.get(field)]
        if missing_fields:
            return _response(400, {
                'status': 'error',
                'message': 'Missing required fields',
                'missing': missing_fields,
            })

        smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '465'))
        smtp_username = os.environ.get('SMTP_USERNAME', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        raw_recipients = os.environ.get('SMTP_TO_EMAIL', 'mskoffice@maltacrown.ru')
        extra_recipients = os.environ.get('SMTP_TO_EMAIL_EXTRA', '').strip()
        if extra_recipients:
            raw_recipients = f'{raw_recipients},{extra_recipients}'
        recipients = _get_smtp_recipients(raw_recipients)

        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = ', '.join(recipients)
        msg['Subject'] = 'Новая заявка с сайта Malta Crown'

        reply_to = data.get('email', '')
        if '@' in reply_to and '\n' not in reply_to and '\r' not in reply_to:
            msg['Reply-To'] = reply_to

        msg.attach(MIMEText(_format_lead(data), 'plain', 'utf-8'))

        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
        server.login(smtp_username, smtp_password)
        server.send_message(msg, from_addr=smtp_username, to_addrs=recipients)
        server.quit()

        return _response(200, {'status': 'success', 'message': 'Email sent'})
    except Exception as e:
        print(f'Lead form error: {e}')
        return _response(500, {'status': 'error', 'message': 'Email delivery failed'})
