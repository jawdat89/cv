# Jawdat Abdullah - CV Showcase

A modern, responsive CV showcase website built with React, TypeScript, and Tailwind CSS. Features multilingual support (English, Hebrew, Arabic, French) with smooth animations and professional design.

## Features

- **Multilingual Support** - English, Hebrew, Arabic, and French
- **Single Page Layout** - All CV sections in one seamless page
- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Automatic theme switching
- **Smooth Animations** - Elegant transitions, lazy loading, and animated progress bars
- **Print Ready** - Optimized for printing and PDF generation
- **Modern UI** - Clean, professional design with Tailwind CSS
- **Rich Text Support** - HTML rendering for formatted content
- **Download CV** - Hebrew PDF version available for download

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom animations
- **Redux Toolkit** - State management
- **Framer Motion** - Smooth animations
- **React i18next** - Internationalization
- **Vite** - Fast build tool
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

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

- **Multilingual Support**: Full i18n implementation with 4 languages (English, Hebrew, Arabic, French)
- **Animated Progress Bars**: Skills section with smooth progress animations triggered on scroll
- **Lazy Loading**: Sections animate into view using Intersection Observer API
- **Rich Text Rendering**: Safe HTML rendering for formatted content with XSS protection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with localStorage persistence
- **Professional Animations**: Subtle, professional animations using Framer Motion and Tailwind CSS
- **Comprehensive Testing**: 59 unit tests covering all components, hooks, and utilities
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and theme toggle
│   ├── LanguageSelector.tsx # Language switcher
│   └── AnimatedProgressBar.tsx # Animated skill bars
├── hooks/              # Custom React hooks
│   ├── useI18n.tsx     # Internationalization hook
│   ├── useHtmlTranslation.tsx # HTML-safe translations
│   └── useIntersectionObserver.tsx # Lazy loading
├── i18n/               # Internationalization files
│   └── locales/        # Language JSON files
├── pages/              # Page components
│   └── Dashboard.tsx   # Main CV display
├── store/              # Redux store and slices
│   └── cvSlice.ts      # CV data and state management
├── utils/              # Utility functions
│   └── htmlRenderer.tsx # Safe HTML rendering
└── test/               # Test setup and utilities
```

## Testing

The project includes comprehensive test coverage with 59 unit tests:

- **Component Tests**: Header, LanguageSelector, and other UI components
- **Hook Tests**: Custom hooks for i18n, HTML translation, and intersection observer
- **Utility Tests**: HTML renderer and sanitization functions
- **Store Tests**: Redux slice and state management
- **Integration Tests**: Component interactions and user flows

Run tests with:
```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
npm run coverage  # Run with coverage report
```

## License

Private project - All rights reserved.
