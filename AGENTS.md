# CELAVIE Educational Academy — AGENTS.md

This file contains the permanent project instructions for Codex and other coding agents.

Read this file before making changes.

---

## 1. Project purpose

CELAVIE Educational Academy is a production marketing and lead-generation website.

Primary goals:
- present CELAVIE programs clearly
- support Armenian, English, Russian, and French
- allow visitors to submit applications for SMM, Languages, and Nice programs
- keep the website fast, simple, responsive, accessible, and SEO-friendly

Do not turn this project into a complex web platform.

## 2. Approved architecture

Current approved architecture:

```text
CELAVIE
↓
React + Vite + TypeScript
↓
SMM / Languages / Nice
↓
Application Forms
↓
Make.com
↓
Google Sheets
↓
Applicant Email
```

This architecture is already working. Preserve it unless the user explicitly asks for an architecture change.

## 3. Account/authentication policy

There must be NO account system.

Do not add:
- login
- sign up
- passwords
- login with Google
- OAuth
- student accounts
- user profiles
- dashboards
- student portals
- authentication
- authorization
- Supabase Auth
- Firebase Auth

Visitors should be able to browse the site and submit an application without creating an account.

## 4. Backend policy

Do not add unnecessary backend infrastructure.

Do not add:
- Supabase
- Firebase
- custom database
- custom API server
- LMS
- payments
- admin dashboard
- student database
- course progress
- lessons
- homework
- certificates

WhatsApp integration is NOT part of the project.

Do not add WhatsApp Business, Twilio, Meta WhatsApp Cloud API, or similar services.

## 5. Existing application flow

The application forms must remain.

Current form categories:
- SMM
- Languages
- Nice

Current application delivery flow:

```text
Frontend form
→ Make.com webhook
→ Router
→ Google Sheets
→ Applicant email
```

Do not remove or replace this flow unless explicitly requested.
Do not introduce authentication before form submission.

## 6. Make.com integration

The Make.com integration is production-critical.

Preserve:
- existing webhook environment variable
- existing request structure
- existing registration/application types
- existing working payload fields
- existing error handling
- existing success behavior
- retry behavior
- duplicate-submit protection

Do not hardcode the webhook URL.
Do not rename payload fields unless explicitly requested.
Do not modify Make.com architecture from frontend code.

## 7. Environment variables

Use the existing Vite environment variable architecture.

Current important variable:

```text
VITE_MAKE_REGISTRATION_WEBHOOK_URL
```

Rules:
- never hardcode the real webhook URL into source files
- `.env` must remain ignored by Git
- do not commit secrets
- remember that `VITE_` variables are client-visible by design
- do not pretend a `VITE_` variable is private

## 8. Technology stack

Keep the existing stack unless explicitly requested:
- React
- Vite
- TypeScript
- Tailwind CSS
- existing project dependencies

Prefer the current project patterns.
Do not introduce large dependencies when a small existing solution is enough.

## 9. Design policy

Preserve the existing CELAVIE visual identity.

Do not redesign the website from scratch unless explicitly requested.

Prefer:
- small controlled changes
- consistent spacing
- current component patterns
- responsive layouts
- clean typography
- existing brand direction

Avoid:
- unnecessary animations
- visual experiments
- unrelated design rewrites
- replacing working components without a reason

## 10. Official CELAVIE logo

Use the official logo asset from:

```text
/public/celavie-logo.png
```

Do not:
- generate a replacement logo
- recreate the logo with CSS or text
- distort the logo
- stretch its aspect ratio
- invent alternative brand marks

Use the official asset in appropriate branding locations such as the header and footer.

## 11. Languages

The public website must support:
- Armenian — HY
- English — EN
- Russian — RU
- French — FR

The selected language should apply to the entire public website, not only forms.

Translate user-visible content including:
- navigation
- hero
- sections
- course content
- buttons
- CTAs
- labels
- placeholders
- validation messages
- success/error messages
- contact content
- footer
- legal/public pages
- 404 content

Do not translate:
- internal IDs
- payload keys
- environment variable names
- technical identifiers

Prefer one centralized translation architecture.
Avoid duplicated page trees for each language.
Preserve the selected language across navigation and refresh where practical.
Default language: Armenian, unless the existing implementation has a stronger approved rule.

## 12. Contact information

Official CELAVIE contact information:

Address:
```text
Ք. Երևան, Կենտրոն, Քաջազնունի 1
```

Phone:
```text
095 400 288
```

Use this information consistently where relevant.

Do not invent:
- additional phone numbers
- email addresses
- social profiles
- opening hours
- map coordinates

Use a proper clickable telephone link where appropriate.

## 13. Generated images and testimonials

Current website images may be generated assets.

Do not replace them automatically.
Do not generate new images unless explicitly requested.

Do not add fake:
- testimonials
- reviews
- student names
- ratings
- statistics
- enrollment numbers
- success stories

Real testimonials and real academy media will be added later.

If placeholder/fake trust content already exists, report it instead of inventing replacements.

## 14. SEO

When working on SEO, prefer safe production improvements.

Check only relevant files.

Possible SEO areas:
- page titles
- meta descriptions
- canonical URL
- robots.txt
- sitemap.xml
- Open Graph
- favicon
- structured data
- semantic headings
- image alt text
- internal links
- multilingual SEO
- 404 page

Do not perform a risky route migration only for SEO.

If language-prefixed URLs such as `/hy/`, `/en/`, `/ru/`, `/fr/` require a major rewrite, report the recommendation instead of forcing it.

Current production origin:

```text
https://celavie-educational-academy.vercel.app/
```

Do not invent a custom domain.

## 15. Accessibility

Preserve and improve accessibility when relevant.

Check:
- form labels
- accessible button names
- keyboard navigation
- visible focus states
- semantic navigation
- heading hierarchy
- image alt text
- document language
- contrast

Do not redesign the site merely for an accessibility cleanup.

## 16. Responsive behavior

Preserve mobile and desktop behavior.

When relevant, verify common widths such as:
- 360px
- 390px
- 430px
- tablet
- desktop

Pay attention to longer Armenian, Russian, and French text.
Do not allow translations to break layouts.

## 17. Performance

Use conservative performance improvements.

Good examples:
- lazy-load below-the-fold images
- remove obviously unused imports
- avoid unnecessary dependencies
- avoid oversized assets when practical

Do not perform broad architecture rewrites for synthetic performance scores.

## 18. Validation and application behavior

Preserve the existing working validation rules.

Do not weaken validation while translating messages or changing UI.

Preserve:
- required-field behavior
- current age rules
- current person-name validation
- current phone validation
- current email validation
- explicit program/course selection
- Nice application validation
- success/failure behavior
- retry behavior
- duplicate-submit protection
- form reset behavior

If unsure about a validation rule, inspect the current implementation instead of guessing.

## 19. Scope discipline

This is important for quality and Codex credit efficiency.

For every task:
1. Read this `AGENTS.md`.
2. Inspect only files relevant to the requested task.
3. Do not re-audit unrelated architecture.
4. Make the smallest safe change.
5. Do not refactor unrelated working code.
6. Do not create extra files unless they are useful.
7. Reuse existing components/helpers when practical.
8. Stop when the requested task is complete.

Avoid broad prompts such as:

```text
Analyze the entire project deeply.
```

Prefer targeted inspection.

Examples:

For logo tasks:
```text
Inspect only header, footer, layout, and branding assets.
```

For SEO tasks:
```text
Inspect routing, index.html, public assets, and SEO-related files only.
```

For translation tasks:
```text
Inspect the current i18n implementation and visible UI strings only.
```

For form tasks:
```text
Inspect only the relevant form page, validation helpers, types, and submission service.
```

## 20. Audit → Implement → Verify workflow

For medium or large work, prefer three stages.

### Stage 1 — Audit
- inspect relevant files only
- do not modify code
- identify exact files and changes needed
- report risks

### Stage 2 — Implement
- implement only approved items
- keep changes minimal
- preserve unrelated behavior

### Stage 3 — Verify
- review the diff
- run the approved checks
- report regressions
- fix only issues caused by the task

This workflow is preferred over one giant project-wide task.

## 21. Build and lint

Before finishing a code-changing task, use the existing project scripts.

At minimum, when relevant:

```text
npm run build
npm run lint
```

If the project later provides a dedicated verification command such as:

```text
npm run verify
```

prefer that command.

Do not perform unrelated lint cleanup unless necessary.

## 22. Git and deployment safety

Do not automatically run:

```text
git add
git commit
git push
vercel deploy
```

Do not deploy.

Leave changes local until the user reviews them.

Only perform Git or deployment actions when explicitly requested.

## 23. File deletion safety

Before deleting code:
- confirm it is unused
- search imports/references
- check routes
- check types
- check related styles
- make sure working application behavior will not break

Do not delete files only because they look old.

When removing old architecture such as Supabase remnants, verify zero active references remain.

## 24. No guessing

Do not invent missing business requirements.

If information is unknown:
- preserve current working behavior
- report the uncertainty
- ask only if the missing answer blocks safe implementation

Do not invent:
- course details
- prices
- contact details
- social links
- reviews
- statistics
- credentials
- backend services

## 25. Final report format

After a code-changing task, return a short structured report.

Include:
1. Files modified
2. Files created
3. Files deleted
4. What changed
5. What was intentionally preserved
6. Build result
7. Lint result
8. Remaining manual checks
9. Git status

Do not produce a long project history unless specifically requested.

## 26. Core principle

CELAVIE should remain:

```text
simple
stable
fast
multilingual
conversion-focused
easy to maintain
```

Prefer fewer moving parts.
Do not add complexity without a clear business reason.
