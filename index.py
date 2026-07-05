import smtplib
import json
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))

        smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '465'))
        smtp_username = os.environ.get('SMTP_USERNAME', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        to_email = os.environ.get('SMTP_TO_EMAIL', '')

        form_fields = []
        for key, value in body.items():
            form_fields.append(f"{key}: {value}")

        form_text = "\n".join(form_fields)

        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = to_email
        msg['Subject'] = "Новая заявка с сайта maltacrown.ru"

        body_text = f"Поступила новая заявка с сайта:\n\n{form_text}"
        msg.attach(MIMEText(body_text, 'plain', 'utf-8'))

        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
        server.quit()

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'status': 'success', 'message': 'Email sent'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'status': 'error', 'message': str(e)})
        }
