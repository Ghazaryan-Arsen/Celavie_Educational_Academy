# CELAVIE Educational Academy - Architecture & Dependency Audit
**Updated**: 2026-09-09
**Scope**: Current local frontend architecture after repository cleanup.

## Current Architecture

React Frontend ? SMM / Languages / Nice ? Make.com ? Google Sheets ? Applicant Email

The owner has confirmed all three registration flows working end to end. The frontend uses the shared registration service; Sheets and email processing run in Make.com. No local database, authentication, dashboard, LMS, or payment backend is required.

### React/Vite Setup
- **Framework**: React 19.2.8 with React Router DOM 7.18.2
- **Build Tool**: Vite 8.2.2 with @vitejs/plugin-react
- **Styling**: Tailwind CSS 4.3.3 with Vite integration
- **TypeScript**: Strict mode enabled (6.0.2)
- **CSS Preprocessing**: Tailwind utilities only, no SCSS/Less
- **Entry Point**: [main.tsx](src/main.tsx)
- **Root Component**: [App.tsx](src/App.tsx) - BrowserRouter wrapper with Navigation, Footer, Routes

### Routing & Page Structure
```
App.tsx (BrowserRouter)
├── Navigation (Header + Mobile Menu)
├── Routes
│   ├── / → HomePage (Course showcase + embedded forms)
│   ├── /about → AboutPage (Static content)
│   ├── /services → ServicesPage (Course catalog)
│   ├── /contact → ContactPage (Contact form, frontend-only)
│   ├── /register → RegisterPage (3-step course registration form)
│   ├── /courses/:slug → LanguageCourseDetailsPage (Timeline + FAQ)
│   ├── /courses/smm/:tier → SMMCourseDetailsPage (Tier details)
│   ├── /nice-exchange → NiceExchangePage (NICE form)
│   ├── /privacy → PrivacyPage (Static)
│   ├── /terms → TermsPage (Static)
│   └── * → 404 Not Found
├── Footer
└── ScrollToTop (on route change)
```

### Component Organization
**Layout** ([src/components/layout/](src/components/layout/)):
- Navigation.tsx - Header navigation with language switcher (UI-only, no i18n)
- Footer.tsx - Footer with links and contact info

**Domain** ([src/components/domain/](src/components/domain/)):
- CourseCard.tsx ✅ Used in ServicesPage
- CourseOverviewCard.tsx ✅ Used in course detail pages
- TestimonialCard.tsx ✅ Used in HomePage

**UI Building Blocks** ([src/components/ui/](src/components/ui/)):
- Badge.tsx ✅ Used extensively for labels
- Button.tsx ✅ Used in forms and CTAs
- Input.tsx ✅ Used in all forms
- Select.tsx ✅ Used in forms and filters
- Textarea.tsx ✅ Used for essays/notes
- Breadcrumb.tsx ✅ Used on all pages
- SectionWrapper.tsx ✅ Page section layout wrapper
- Container.tsx ⚠️ Only used inside SectionWrapper (never directly)
- FAQAccordion.tsx ✅ Used in course details
- RegistrationStepper.tsx ✅ Used in RegisterPage/HomePage
- ImageGallery.tsx ✅ Used in course galleries
- Lightbox.tsx ✅ Used by ImageGallery for zoom
- Timeline.tsx ✅ Used in LanguageCourseDetailsPage

---


## Registration Data Flow

- HomePage and RegisterPage submit SMM and Language registrations through src/lib/registration.ts.
- HomePage and NiceExchangePage submit Nice applications through the same service.
- src/lib/niceExchange.ts retains Nice form defaults and validation only.
- src/types/registration.ts defines the payloads; src/types/niceExchange.ts retains the Nice form type.
- The service generates registrationId and submittedAt and POSTs JSON using VITE_MAKE_REGISTRATION_WEBHOOK_URL.
- Success requires a successful HTTP response, including plain-text Accepted. Failures preserve form input for retry.
- Language and level derive from the selected course. Nice age is serialized as a number.

## Dependencies

### Production Dependencies
```json
"react": "^19.2.8"                   // UI framework
"react-dom": "^19.2.8"               // React rendering
"react-router-dom": "^7.18.2"        // Client-side routing
"tailwind-merge": "^3.6.0"           // Tailwind class merging (used)
"clsx": "^2.1.1"                     // Classname conditional merging (minimal use)
"lucide-react": "^1.34.0"            // Icon library (used throughout)
```

**Total Production Dependencies**: 6 packages (clean, minimal)

### Development Dependencies
```json
"@vitejs/plugin-react": "^6.1.0"     // React plugin for Vite
"@tailwindcss/vite": "^4.3.3"        // Tailwind CSS Vite plugin
"tailwindcss": "^4.3.3"              // Tailwind CSS engine
"typescript": "~6.0.2"               // TypeScript compiler
"vite": "^8.2.2"                     // Build tool
"@types/react": "^19.2.18"           // React type definitions
"@types/react-dom": "^19.2.4"        // React DOM type definitions
"@types/node": "^24.13.3"            // Node type definitions
"oxlint": "^1.79.0"                  // Linter (minimal config)
```

**Total Dev Dependencies**: 9 packages


All remaining production dependencies are used by the frontend. Make uses native fetch; separate email, Sheets, or HTTP-client packages are unnecessary.

## Other Existing Frontend Behavior

- Course, FAQ, and testimonial content is supplied by src/data/mockData.ts.
- ContactPage still uses a frontend-only submission placeholder; this is separate from registration and was not changed.
- The navigation language switcher is UI-only. WhatsApp integration remains deferred.
- Container, Lightbox, and ImageGallery are retained; this cleanup does not broaden into component refactoring.

## Validation and Maintenance

Preserve the existing design, public routes, validation, and working registration behavior. Run npm.cmd run build and npm.cmd run lint after changes. Follow with a live regression of SMM, Languages, and Nice through Make, Sheets, and applicant email before release.

Local cleanup does not operate on external databases or accounts. No deployment or Git publication is part of this cleanup.
