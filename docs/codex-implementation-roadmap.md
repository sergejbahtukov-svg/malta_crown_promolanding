# Codex Implementation Roadmap

Use this roadmap after approving the redesign specification in `docs/malta-crown-redesign-spec.md`.

## Work Mode

Build one production slice per iteration. Keep the site static, Tilda-friendly, and scoped under `.mcrown-site`.

Do not copy the Dribbble reference 1:1. Use it only for quality level, spacious rhythm, strong typography, and premium education mood.

## Iteration 1 - Static Skeleton

Owner: main Codex or worker.

Deliverables:

- `index.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- base `.mcrown-site` wrapper;
- design tokens from the Malta Crown palette;
- responsive container and section spacing;
- placeholder image references.

Definition of Done:

- HTML opens locally;
- CSS is scoped;
- no external framework;
- page has basic structure for all future sections.

## Iteration 2 - Header And Hero

Deliverables:

- logo area;
- desktop navigation;
- mobile menu markup;
- hero headline, subtitle, trust badge, CTAs;
- hero visual block;
- initial mobile layout.

Definition of Done:

- hero looks polished at 360, 768, 1280;
- CTA labels fit;
- first viewport shows brand, offer, and next-section hint.

## Iteration 3 - Programmes And Trust

Deliverables:

- trust strip with License No. 237, Since 1999, Ages 5-18, Pearson Edexcel;
- programme cards for Primary, Secondary, Post-Secondary, Camps;
- concise RU/EN-ready copy.

Definition of Done:

- programme cards are readable;
- cards do not depend on fixed text height;
- mobile layout is one column.

## Iteration 4 - About And Why Choose Us

Deliverables:

- about section;
- 6 key benefits;
- premium editorial layout;
- optional numbered cards.

Definition of Done:

- content is edited, not pasted as long raw paragraphs;
- section has visual rhythm and clear hierarchy.

## Iteration 5 - Boarding And University Path

Deliverables:

- boarding/daily routine section;
- university preparation process;
- supporting image slots.

Definition of Done:

- parent-relevant facts are easy to scan;
- process works as stacked cards or timeline.

## Iteration 6 - Why Malta, CTA, Footer

Deliverables:

- Why Malta section;
- final lead form / CTA block;
- contacts footer;
- social/contact links.

Definition of Done:

- all contact data from the current website is included;
- form fields and privacy consent are present;
- mobile footer is tap-friendly.

## Iteration 7 - Interactivity

Deliverables:

- mobile menu JS;
- accordions or tabs if used;
- smooth anchor scrolling;
- basic form UX if custom form is used.

Definition of Done:

- no JS errors;
- interaction works with keyboard and click/tap;
- page remains usable without heavy scripts.

## Iteration 8 - Visual QA

Deliverables:

- screenshots at 360, 768, 1280, 1440;
- fixes for spacing, overflow, image crops, buttons;
- color/contrast pass.

Definition of Done:

- no horizontal scroll;
- no overlapping text;
- no broken image layout;
- first viewport feels premium and stable.

## Iteration 9 - Tilda Packaging

Deliverables:

- T123-ready HTML/CSS/JS block;
- asset URL replacement plan;
- Tilda preview checklist.

Definition of Done:

- code is embeddable in Tilda;
- styles do not leak outside `.mcrown-site`;
- CTAs and forms are ready for analytics.

## Subagent Split

Use subagents only for bounded parallel work:

- Content agent: edit/translate section copy and flag factual risks.
- Visual QA agent: inspect screenshots and report layout issues.
- Tilda packaging agent: prepare the final single-block embed and check CSS scoping.
- Implementation workers: only on disjoint file/section ownership to avoid conflicts.

The main agent should keep ownership of final integration and visual consistency.
