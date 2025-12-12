# Jawdat Abdullah - CV Showcase

A modern, responsive CV showcase website built with React, TypeScript, and Tailwind CSS. Features multilingual support (English, Hebrew, Arabic) with smooth animations and professional design.

## Features

- **Multilingual Support** - English, Hebrew, and Arabic with full RTL support
- **Single Page Layout** - All CV sections in one seamless page
- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Automatic theme switching with persistence
- **Smooth Animations** - Elegant transitions, lazy loading, and animated progress bars
- **Print Ready** - Optimized for printing and PDF generation
- **Modern UI** - Clean, professional design with Tailwind CSS
- **Rich Text Support** - HTML rendering for formatted content with XSS protection
- **CV Download** - Unified dropdown selector for downloading English and Hebrew CV PDFs

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom animations
- **Redux Toolkit** - State management
- **Framer Motion** - Smooth animations
- **React i18next** - Internationalization
- **Vite 7** - Fast build tool and dev server
- **Vitest 4** - Testing framework with coverage support
- **React Testing Library** - Component testing utilities

## Sections

- Personal Information
- Work Experience (with technology highlighting)
- Education
- Skills (with animated progress bars)
- Projects (with technology tags)
- Certifications
- Languages (with proficiency levels)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run coverage` - Run tests with coverage

## Key Features Implemented

- **Multilingual Support**: Full i18n implementation with 3 languages (English, Hebrew, Arabic) and RTL support
- **CV Download Selector**: Unified dropdown component for downloading English and Hebrew CV PDFs
- **Animated Progress Bars**: Skills section with smooth progress animations triggered on scroll
- **Lazy Loading**: Sections animate into view using Intersection Observer API
- **Rich Text Rendering**: Safe HTML rendering for formatted content with XSS protection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with Redux persistence
- **Professional Animations**: Subtle, professional animations using Framer Motion and Tailwind CSS
- **Comprehensive Testing**: Unit tests covering all components, hooks, and utilities
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Performance Optimized**: Route-based code splitting, lazy loading, and optimized bundle size
- **State Management**: Redux Toolkit with persistence for theme and CV data

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx       # Navigation and theme toggle
│   ├── LanguageSelector.tsx # Language switcher
│   ├── CVDownloadSelect.tsx # CV download dropdown selector
│   ├── AnimatedProgressBar.tsx # Animated skill bars
│   └── LoadingSpinner.tsx # Loading indicator
├── hooks/              # Custom React hooks
│   ├── useI18n.ts      # Internationalization hook
│   ├── useHtmlTranslation.tsx # HTML-safe translations
│   ├── useIntersectionObserver.tsx # Lazy loading
│   ├── useLanguage.ts  # Language management
│   └── useLocalizedText.ts # Localized text utilities
├── i18n/               # Internationalization files
│   └── locales/        # Language JSON files (en, he, ar)
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard page
│   ├── Preview.tsx     # CV preview page
│   └── Templates.tsx   # Template selection
├── pages/dashboard/   # Dashboard components
│   └── components/     # Section components (Hero, Experience, etc.)
├── store/              # Redux store and slices
│   ├── cvSlice.ts      # CV data and state management
│   └── index.ts        # Store configuration
├── utils/              # Utility functions
│   ├── htmlRenderer.tsx # Safe HTML rendering
│   └── serviceWorker.ts # Service worker utilities
└── test/               # Test setup and utilities
```

## Testing

The project includes comprehensive test coverage:

- **Component Tests**: Header, LanguageSelector, CVDownloadSelect, and other UI components
- **Hook Tests**: Custom hooks for i18n, HTML translation, and intersection observer
- **Utility Tests**: HTML renderer and sanitization functions
- **Store Tests**: Redux slice and state management
- **Integration Tests**: Component interactions and user flows

Run tests with:
```bash
npm test          # Run tests in watch mode
npm run coverage  # Run with coverage report
```

## Recent Updates

- **Bundle Size Optimization**: Implemented route-based code splitting with React.lazy for Preview and Templates pages
- **Build Configuration**: Simplified Vite config with safe optimizations (esbuild minification, CSS code splitting)
- **Hero Image**: Removed click functionality and modal viewer for hero section image
- Updated to Vite 7.2.7 and Vitest 4.0.15 (security fixes)
- Replaced separate CV download buttons with unified Select dropdown component
- Updated job title to "Logistics Process Lead"
- Updated hero title to "Full Stack Developer + Control & Automation Engineering Student"
- Fixed translation key case mismatches
- Improved CV download UX with dropdown selector
- Commented out "Available for opportunities" text
- Updated skill naming (Deno v2)

## License

Private project - All rights reserved.
