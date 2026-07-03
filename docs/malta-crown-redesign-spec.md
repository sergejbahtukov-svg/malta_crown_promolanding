# Malta Crown Redesign Specification

Date: 2026-07-03

Source site: https://maltacrown.com/
Visual reference: https://dribbble.com/shots/27039811-University-Education-Website-UI-UX-Design

## 1. Goal

Create a premium, original, responsive landing page for Malta Crown International Boarding School that can be embedded into Tilda via custom HTML/CSS/JS.

The Dribbble reference is used only as a mood and composition reference: calm premium education style, strong typography, large photography, trust signals, and clear calls to action. The final design must not copy its layout, palette, image treatment, proportions, or UI details 1:1.

The current Malta Crown website is the source for:

- brand meaning;
- factual content;
- school positioning;
- color direction;
- calls to action;
- contacts and trust signals.

## 2. Brand Positioning

Malta Crown is a private international boarding school in Malta for children and teenagers. The website should speak primarily to parents who are choosing a safe, academically strong, international education path for their child.

Core positioning:

- private international boarding school in Malta;
- licensed school, License No. 237;
- official Pearson Edexcel Examination Centre;
- British curriculum;
- IGCSE and A-Level preparation;
- full-time education and boarding care;
- international environment;
- university preparation;
- family support and visa support.

Recommended tone:

- premium but not flashy;
- academic and trustworthy;
- calm, warm, and parent-oriented;
- clear rather than bureaucratic;
- internationally confident.

Avoid:

- over-promising;
- loud marketing claims;
- dense legal phrasing in hero sections;
- copying current long text blocks without editing;
- visual clutter from tables, certificates, and repeated CTAs.

## 3. Color System

Extracted from the current Malta Crown site:

- `#BD1E24` - primary Malta Crown red, used for main CTA buttons and key accents.
- `#FFFDF2` - warm ivory background.
- `#FFFCF2` - secondary warm background.
- `#FFFADD` - light cream highlight.
- `#FFFFFF` - clean surfaces and button text.
- `#222222` - primary text.
- `#000000` - high contrast text.
- `#37271C` - warm dark brown for premium academic accents.
- `#E4E4E4` - soft borders and dividers.
- `#C7C7C7` - secondary borders.
- `#9E9E9E` - muted text.
- `#D15E62` - lighter red accent or hover detail.
- `#0A1F56` - optional institutional navy accent.

Recommended refined palette:

- Background: `#FFFDF2`
- Surface: `#FFFFFF`
- Primary text: `#241F1C`
- Muted text: `#6D625C`
- Primary brand: `#BD1E24`
- Primary hover: `#9F171D`
- Academic navy: `#0A1F56`
- Warm brown: `#37271C`
- Border: `#E7DFD4`
- Soft highlight: `#FFF5D8`

Usage rules:

- Use red only for CTAs, key numbers, small labels, and active states.
- Use ivory and white as the dominant surfaces.
- Use navy sparingly for institutional trust blocks, footer, or document/license accents.
- Avoid a one-color red/cream site; add restrained navy and warm brown for depth.
- Keep high contrast for accessibility, especially on buttons and text over images.

## 4. Typography

Recommended direction:

- Primary sans-serif: `Inter`, `Manrope`, or `Helvetica Neue`.
- Accent serif: `Cormorant Garamond`, `Playfair Display`, or `Georgia`.

Use the serif only for small premium emphasis: one word in the hero, section labels, or a quote. Do not make the whole page decorative.

Desktop type scale:

- Hero H1: 64-80px, line-height 0.95-1.05.
- Section H2: 40-56px, line-height 1.05-1.15.
- Card titles: 20-28px.
- Body: 16-18px.
- Small labels: 12-14px uppercase or small caps.

Mobile type scale:

- Hero H1: 38-46px.
- Section H2: 30-38px.
- Body: 15-17px.

Do not scale font size with viewport width. Use responsive breakpoints.

## 5. Page Structure

### 5.1 Header

Content:

- Malta Crown logo.
- Menu: Programmes, Boarding, Admissions, Why Malta, About, Contacts.
- CTA: Book a Trial Day / Get in Touch.
- Mobile burger menu.

Design:

- Light header on ivory or white.
- Sticky optional, but keep it slim.
- Use a red CTA button and neutral text links.
- Avoid copying the green rounded Dribbble navigation bar.

### 5.2 Hero

Purpose:

Immediately explain what Malta Crown is and why it is trustworthy.

Recommended RU copy:

```text
Частная международная школа-пансион на Мальте
```

Alternative RU headline:

```text
Британское образование на Мальте с проживанием и заботой 24/7
```

Recommended EN headline:

```text
Private International Boarding School in Malta
```

Hero supporting copy RU:

```text
Malta Crown обучает детей 5-18 лет по британской программе, готовит к IGCSE и A-Level и принимает учеников со всего мира на кампусе в St. Julian's.
```

Hero supporting copy EN:

```text
Malta Crown welcomes students aged 5-18 to a licensed international school in Malta, following the British curriculum with IGCSE and A-Level preparation.
```

Trust badge:

```text
License No. 237 | Pearson Edexcel Examination Centre
```

Primary CTA:

- RU: `Записаться на консультацию`
- EN: `Book a Free Trial Day`

Secondary CTA:

- RU: `Смотреть программы`
- EN: `Explore Programmes`

Visual:

- Large real photo of school life, campus, students in class, or Malta environment.
- Add a small original trust panel: license, age range, boarding care.
- Do not copy the exact Dribbble arrangement with identical right-side photo geometry and overlay.

### 5.3 Trust Strip

Use 4 compact facts:

- Since 1999
- License No. 237
- Ages 5-18
- Pearson Edexcel Centre No. 98328

RU labels:

- `С 1999 года`
- `Лицензия No. 237`
- `Возраст 5-18`
- `Pearson Edexcel Centre`

### 5.4 Programmes

Cards or structured rows:

1. Primary School
   - RU: `Начальная школа`
   - Ages 5-10, Years 1-6.

2. Secondary School
   - RU: `Средняя школа`
   - Ages 11-16, Years 7-11, IGCSE pathway.

3. Post-Secondary
   - RU: `Подготовка к университету`
   - Ages 16-18, Years 12-13, A-Level preparation.

4. Camps and Short-Term Programmes
   - RU: `Каникулы и краткосрочные программы`
   - Summer Camp, Winter Camp, induction programmes.

### 5.5 About The School

Use a concise version of the current text.

RU draft:

```text
Malta Crown - международная школа-пансион в St. Julian's, Malta, где дети из разных стран учатся по британской программе в безопасной и поддерживающей среде. Школа сочетает академическую подготовку, индивидуальные образовательные маршруты, внеклассные занятия и круглосуточную заботу для учеников, проживающих на кампусе.
```

EN draft:

```text
Malta Crown is an international boarding school in St. Julian's, Malta, bringing together local and overseas students in a safe, supportive academic environment. The school combines the British curriculum, individual learning pathways, extracurricular activities, and full-time boarding care.
```

### 5.6 Why Choose Us

Use a numbered or editorial grid, not an overlong list.

Core advantages:

- Individual educational plan.
- International environment.
- Career guidance programme.
- Project activities.
- Tutoring programme.
- Live-in study opportunity.
- Internationally recognized qualifications.
- Family visa support.
- Family office.

Recommended visible count: 6 cards on landing page, with optional expanded content later.

### 5.7 Boarding And Daily Routine

Explain the parent-relevant experience:

- full board;
- 2-3-4-bed rooms;
- separate bathroom;
- education from morning to afternoon;
- English and extracurricular activities after lunch;
- evening leisure and supervision;
- 5 meals a day for full school day / boarding.

Visual:

- boarding rooms;
- dining/living areas;
- students in supervised activities;
- campus building.

### 5.8 University Preparation

Use a process-style section:

- English Language
- Career Guidance
- University Path
- Portfolio Formation
- Admission Support

This section should feel structured and reassuring. Avoid long paragraphs.

### 5.9 Why Malta

Use the strongest points:

- English-speaking European country.
- Mediterranean climate.
- Safe island environment.
- Rich historical and cultural context.
- International lifestyle.
- Good environment for children.

### 5.10 Admissions CTA

Main CTA block:

RU:

```text
Получите персональное предложение по обучению в Malta Crown
```

EN:

```text
Find out more about studying at Malta Crown and get a personal offer
```

Fields:

- Parent name.
- Phone / WhatsApp.
- Email.
- Child age.
- Preferred programme.
- Message.
- Privacy agreement.

In Tilda, use either:

- native Tilda form block styled to match the custom design; or
- custom HTML form connected to Tilda forms/CRM if technically confirmed.

### 5.11 Contacts And Footer

Current contacts:

- International boarding school Malta Crown
- "L-Arkati", Mensija street, St. Julian's STJ1960, Malta
- Tel: +356 99 78 78 20
- Tel: +356 2755 5589
- WhatsApp/Telegram: +356 7997 7110
- info.maltacrown@gmail.com
- info@maltacrown.com

Footer links:

- Programmes
- Boarding
- Admissions
- Tuition fees
- Visa support
- Documents
- Contacts
- Instagram
- Facebook
- WhatsApp
- Telegram

## 6. Visual Asset Direction

Use:

- real school photos;
- students in class and activities;
- campus and boarding spaces;
- Malta/St. Julian's environment;
- document/license visuals;
- restrained crown motif;
- warm natural photography.

Avoid:

- low-quality screenshots;
- visually inconsistent gallery images;
- overloaded certificate scans in main flow;
- photos of children without rights confirmation;
- generic stock photos that hide the real school.

Recommended image preparation:

- crop all photos to consistent ratios: 4:5, 3:2, 16:10;
- apply light warm color correction;
- compress to WebP where possible;
- keep important faces/objects away from text overlays;
- prepare mobile crops separately for hero if needed.

## 7. Tilda Implementation Rules

Preferred technical approach:

- Build a standalone static prototype first.
- Use plain HTML, CSS, and vanilla JS.
- No React/Vue.
- No external UI frameworks.
- Embed into Tilda via `T123 HTML code`.
- Scope all CSS under `.mcrown-site`.
- Prefix JS hooks with `data-mcrown-*`.
- Avoid global selectors like `body`, `h1`, `button` without namespace.

File structure for local build:

```text
index.html
assets/
  css/
    styles.css
  js/
    main.js
  img/
```

Tilda embed version:

```html
<div class="mcrown-site">
  <!-- page HTML -->
</div>
<style>
  /* scoped CSS */
</style>
<script>
  /* scoped JS */
</script>
```

Interactive elements:

- mobile menu;
- smooth anchor navigation;
- programme tabs or accordion;
- FAQ accordion;
- optional image slider/gallery;
- form validation if using custom form.

Analytics and ads:

- preserve the premium Tilda domain for advertising;
- keep conversion events on all CTA buttons;
- track form submissions;
- track WhatsApp/Telegram clicks;
- add UTM-safe links.

## 8. Responsive Requirements

Test viewports:

- 360px mobile;
- 768px tablet;
- 1280px desktop;
- 1440px wide desktop.

Desktop:

- max content width 1180-1280px;
- 12-column layout;
- hero split around 5/7 or 6/6;
- sections spaced 80-120px apart.

Tablet:

- reduce hero type size;
- keep two-column layout only when content remains readable;
- turn dense grids into 2 columns.

Mobile:

- header becomes burger;
- hero stacks: label, headline, copy, CTA, photo, trust facts;
- cards become one column;
- large stats become 2x2 grid;
- timelines become accordions or simple stacked steps;
- buttons have full-width or natural paired layout.

Quality rules:

- no horizontal scroll;
- no overlapping text;
- buttons must fit longest labels;
- image crops must remain meaningful;
- footer contacts must be tap-friendly.

## 9. Content Cleanup Tasks

Before final publishing, review and fix:

- `р. р.` artifacts in educational documents section;
- typo `ualifications`;
- inconsistent `SCHOOL NEws`;
- long legal/academic paragraphs;
- outdated dates, fees, and calendar references;
- links to Google Drive, forms, and documents;
- consistency of Cambridge / Pearson Edexcel / IGCSE / A-Level wording;
- privacy policy wording and consent checkbox;
- image rights for children and campus photos.

## 10. Codex Effort Plan

Recommended phased execution:

1. Static skeleton
   - Create `index.html`, `assets/css/styles.css`, `assets/js/main.js`.
   - Add scoped design tokens and reset.
   - Effort: 1 iteration.

2. Header and hero
   - Implement the premium first screen.
   - Add responsive header and CTA.
   - Effort: 1-2 iterations.

3. Core content sections
   - Programmes, trust strip, about, why choose us.
   - Effort: 2 iterations.

4. Boarding, university preparation, why Malta
   - Add visual split sections and process blocks.
   - Effort: 1-2 iterations.

5. Forms, FAQ, footer
   - Add contact CTA, fields, consent, footer.
   - Effort: 1 iteration.

6. Interactivity
   - Mobile menu, accordions, tabs, smooth anchors.
   - Effort: 1 iteration.

7. Visual QA
   - Browser checks at 360, 768, 1280, 1440.
   - Fix spacing, text overflow, image framing.
   - Effort: 1-2 iterations.

8. Tilda packaging
   - Convert local prototype into T123-ready HTML/CSS/JS.
   - Replace local images with Tilda/CDN URLs.
   - Verify preview inside Tilda.
   - Effort: 1 iteration.

Total recommended effort: 9-12 Codex iterations for a polished production-ready page.

## 11. Immediate Next Step

Build the local static prototype, starting with:

- scoped CSS tokens;
- header;
- hero;
- trust strip;
- programme cards;
- initial responsive rules.

Use placeholder image paths first if final images are not ready:

```text
assets/img/hero-campus.webp
assets/img/school-life-01.webp
assets/img/boarding-01.webp
assets/img/malta-01.webp
```

When final images are available, replace placeholders and run visual QA again.
