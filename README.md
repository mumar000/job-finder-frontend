# Job Finder Frontend

> Enterprise-grade Next.js 15 frontend for the Job Finder application - AI-powered freelance job matching platform

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwind-css)
![License](https://img.shields.io/badge/license-ISC-green)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Architecture](#architecture)
- [UI Components](#ui-components)
- [API Integration](#api-integration)
- [Styling & Theming](#styling--theming)
- [Performance](#performance)
- [Security](#security)
- [SEO](#seo)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - JWT-based auth with HTTP-only cookies
- 🎨 **Dark/Light Mode** - System-aware theme switching with next-themes
- 📱 **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- ♿ **Accessibility** - WCAG 2.1 compliant with ARIA labels and keyboard navigation
- 🚀 **Performance Optimized** - Server components, code-splitting, image optimization
- 🔍 **SEO Optimized** - Metadata API, Open Graph, structured data
- 🎭 **Professional UI** - Inspired by Stripe and Plaid design systems
- 🔒 **Security Hardened** - CSP headers, input sanitization, XSS prevention

### Application Features
- **Job Management** - Browse, filter, and track job opportunities
- **AI Match Scoring** - View match scores for each job (0-100)
- **Upwork Integration** - Connect and sync Upwork profile
- **Proposal System** - Create and manage job proposals
- **Analytics Dashboard** - Track job search metrics and performance
- **Notifications** - Real-time updates on new jobs and responses
- **User Preferences** - Customizable filters and notification settings

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2
- **Build Tool**: Turbopack
- **Language**: JavaScript (ES2022+)

### Styling
- **CSS Framework**: Tailwind CSS 4.1
- **Component Variants**: class-variance-authority
- **Typography**: Geist Font (Sans & Mono)
- **Theme**: next-themes with system detection

### UI & Components
- **Primitives**: Radix UI
- **Animations**: Framer Motion
- **Icons**: (To be added)
- **Form Handling**: react-hook-form + Zod validation

### Data & API
- **HTTP Client**: Native Fetch API
- **State Management**: React hooks + Context API
- **Validation**: Zod schemas
- **Cookies**: js-cookie

### Developer Tools
- **Linting**: ESLint with Next.js config
- **Code Quality**: Prettier (to be configured)
- **Testing**: Vitest + Playwright (to be configured)
- **Bundle Analysis**: @next/bundle-analyzer (configured)

## 📁 Project Structure

```
job-finder-frontend/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with providers
│   ├── page.js                   # Home page
│   ├── globals.css               # Global styles & CSS variables
│   ├── (auth)/                   # Auth route group (to be added)
│   │   ├── login/
│   │   └── register/
│   └── dashboard/                # Protected dashboard routes (to be added)
│       ├── layout.js
│       ├── page.js
│       ├── jobs/
│       ├── analytics/
│       ├── proposals/
│       ├── settings/
│       └── notifications/
│
├── components/                   # React components
│   ├── ui/                       # Base UI components (Shadcn-style)
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── card.js
│   │   ├── badge.js
│   │   ├── label.js
│   │   └── skeleton.js
│   ├── forms/                    # Form components (to be added)
│   ├── layout/                   # Layout components (to be added)
│   ├── features/                 # Feature-specific components (to be added)
│   └── providers/                # React context providers
│       └── theme-provider.js
│
├── lib/                          # Business logic & utilities
│   ├── api/                      # API client services
│   │   ├── client.js             # Base API client with auth
│   │   ├── auth.js               # Auth API methods
│   │   ├── jobs.js               # Jobs API methods
│   │   ├── upwork.js             # Upwork integration API
│   │   └── index.js              # Centralized exports
│   ├── utils/                    # Utility functions
│   │   ├── cn.js                 # Class name merger
│   │   ├── formatters.js         # Date, currency, number formatters
│   │   └── validators.js         # Zod schemas & validation helpers
│   ├── constants/                # Constants & configuration
│   │   └── index.js              # App constants, routes, enums
│   ├── hooks/                    # Custom React hooks (to be added)
│   ├── auth/                     # Auth utilities (to be added)
│   └── validation/               # Validation schemas (to be added)
│
├── hooks/                        # Custom hooks (to be added)
├── public/                       # Static assets
│   ├── images/
│   └── icons/
│
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example environment variables
├── .gitignore                    # Git ignore rules
├── jsconfig.json                 # JavaScript config with path aliases
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0
- Backend API running on `http://localhost:3000`

### Installation

1. **Clone the repository** (if not already)
   ```bash
   cd job-finder-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

### Available Scripts

```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
npm run analyze      # Analyze bundle size
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_PREFIX=/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_SITE_NAME=Job Finder

# Authentication
NEXT_PUBLIC_JWT_COOKIE_NAME=job_finder_token

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# External Services (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

## 💻 Development

### Code Structure Principles

1. **Separation of Concerns**
   - UI components only handle rendering
   - Business logic lives in `/lib`
   - API calls centralized in `/lib/api`
   - Validation schemas in `/lib/utils/validators.js`

2. **Naming Conventions**
   - Folders: `kebab-case`
   - Components: `PascalCase.js`
   - Utilities: `camelCase.js`
   - Constants: `SCREAMING_SNAKE_CASE`

3. **Component Patterns**
   - Use Server Components by default
   - Add `'use client'` only when needed
   - Extract reusable logic to custom hooks
   - Co-locate related components

### Adding New Features

1. Create API service in `/lib/api/`
2. Create validation schemas in `/lib/utils/validators.js`
3. Build UI components in `/components/ui/` or `/components/features/`
4. Create page in `/app/`
5. Add route constant in `/lib/constants/`

## 🏗️ Architecture

### Data Flow

```
User Action → Component → API Client → Backend
                  ↓
              Validation (Zod)
                  ↓
              State Update (React Hooks)
                  ↓
              UI Re-render
```

### Authentication Flow

```
Login/Register → API Call → JWT Token Received
                                  ↓
                          Store in HTTP-only Cookie
                                  ↓
                          Attach to All Requests
                                  ↓
                          Protected Routes Accessible
```

### Theme System

```
System Preference → next-themes Provider → CSS Variables
        ↓                                         ↓
  User Toggle                           Tailwind Classes
```

## 🎨 UI Components

### Available Components

- **Button** - Multiple variants (default, outline, ghost, link)
- **Input** - Styled form input with focus states
- **Card** - Container with header, content, footer
- **Badge** - Status indicators and labels
- **Label** - Form labels with accessibility
- **Skeleton** - Loading placeholders

### Component Usage

```jsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Theme Colors

Colors are defined as HSL CSS variables in `app/globals.css`:

- `--background` / `--foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--muted` / `--muted-foreground`
- `--destructive` / `--destructive-foreground`
- `--border`, `--input`, `--ring`

## 🔌 API Integration

### API Client Usage

```javascript
import { authApi, jobsApi, upworkApi } from '@/lib/api'

// Authentication
await authApi.login({ email, password })
await authApi.register({ email, password, confirmPassword })
const user = await authApi.getMe()
await authApi.logout()

// Jobs
const jobs = await jobsApi.getJobs({ status: 'new', limit: 20 })
const job = await jobsApi.getJob(jobId)
await jobsApi.updateJobStatus(jobId, 'applied')

// Upwork
const authUrl = await upworkApi.getConnectUrl()
await upworkApi.syncProfile()
const status = await upworkApi.getStatus()
```

### Error Handling

```javascript
try {
  const data = await jobsApi.getJobs()
} catch (error) {
  console.error(error.message) // User-friendly message
  console.error(error.status)  // HTTP status code
  console.error(error.data)    // Response data
}
```

## 🎨 Styling & Theming

### Tailwind Utility Classes

```jsx
// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Dark mode
<div className="bg-white dark:bg-gray-900">

// Custom utilities
<div className="text-balance">  // Text wrap balance
```

### CSS Variables

```css
/* Light mode */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
}

/* Dark mode */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}
```

## ⚡ Performance

### Optimization Techniques

1. **Server Components** - Default for all components
2. **Image Optimization** - next/image with AVIF/WebP
3. **Code Splitting** - Automatic route-based splitting
4. **Font Optimization** - next/font with variable fonts
5. **Bundle Analysis** - Analyze with `npm run analyze`
6. **Caching** - Route caching with revalidation

### Performance Targets

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

### Implemented Security Measures

- **HTTP-only Cookies** - Secure token storage
- **CSRF Protection** - SameSite cookie attribute
- **XSS Prevention** - Input sanitization
- **CSP Headers** - Content Security Policy
- **Secure Headers** - X-Frame-Options, HSTS, etc.
- **Input Validation** - Zod schemas on all forms
- **API Authentication** - JWT bearer tokens

### Security Headers (next.config.js)

```javascript
headers: [
  'X-Frame-Options: SAMEORIGIN',
  'X-Content-Type-Options: nosniff',
  'X-XSS-Protection: 1; mode=block',
  'Strict-Transport-Security: max-age=63072000',
  'Referrer-Policy: origin-when-cross-origin',
]
```

## 🔍 SEO

### SEO Features

- **Metadata API** - Dynamic page metadata
- **Open Graph** - Social media previews
- **Twitter Cards** - Twitter-specific metadata
- **Canonical URLs** - Duplicate content prevention
- **Structured Data** - JSON-LD schemas (to be added)
- **Sitemap** - Auto-generated sitemap.xml (to be added)
- **Robots.txt** - Crawler instructions (to be added)

### Metadata Example

```javascript
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.png'],
  },
}
```

## 🧪 Testing

### Testing Strategy (To Be Implemented)

1. **Unit Tests** - Vitest for utilities and hooks
2. **Component Tests** - React Testing Library
3. **E2E Tests** - Playwright for user flows
4. **Visual Regression** - Percy or Chromatic

### Running Tests

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:watch  # Watch mode
```

## 📦 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Platforms

- **Vercel** (Recommended) - Zero-config deployment
- **Netlify** - JAMstack platform
- **AWS Amplify** - Full-stack hosting
- **Docker** - Containerized deployment

### Environment Variables

Ensure all `NEXT_PUBLIC_*` variables are set in your deployment platform.

## 🏆 Best Practices

### Component Development
- ✅ Use Server Components by default
- ✅ Minimize client-side JavaScript
- ✅ Extract logic to `/lib` utilities
- ✅ Use Zod for validation
- ✅ Implement loading and error states

### Performance
- ✅ Optimize images with next/image
- ✅ Use dynamic imports for heavy components
- ✅ Implement route-level code splitting
- ✅ Enable compression and caching

### Accessibility
- ✅ Use semantic HTML
- ✅ Add ARIA labels
- ✅ Support keyboard navigation
- ✅ Test with screen readers

### Security
- ✅ Sanitize all user inputs
- ✅ Use HTTP-only cookies
- ✅ Implement CSP headers
- ✅ Validate on both client and server

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Document complex logic

## 📝 License

ISC License - See LICENSE file for details

## 🙏 Acknowledgments

- **Next.js Team** - Amazing framework
- **Vercel** - Deployment platform
- **Tailwind Labs** - Utility-first CSS
- **Radix UI** - Accessible primitives
- **shadcn/ui** - Component inspiration

---

**Built with ❤️ using Next.js 16, React 19, and Tailwind CSS 4**

For questions or support, please open an issue on GitHub.
