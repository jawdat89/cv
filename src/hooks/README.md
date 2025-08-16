# I18n Hooks

This folder contains custom hooks for internationalization (i18n) functionality.

## Available Hooks

### `useI18n()`

A comprehensive hook that provides all i18n functionality including translation, language management, and direction detection.

```typescript
import { useI18n } from '@/hooks';

const MyComponent = () => {
  const { 
    t, 
    getText, 
    getTextWithParams, 
    hasTranslation,
    currentLanguage,
    changeLanguage,
    getAvailableLanguages,
    isInitialized,
    direction 
  } = useI18n();

  // Basic translation
  const title = t('navigation.personalInfo');
  
  // Translation with fallback
  const description = getText('some.key', 'Fallback text');
  
  // Translation with parameters
  const welcome = getTextWithParams('welcome.message', { name: 'John' }, 'Welcome!');
  
  // Check if translation exists
  if (hasTranslation('some.key')) {
    // Do something
  }
  
  // Change language
  const handleLanguageChange = async () => {
    await changeLanguage('ar');
  };

  return (
    <div dir={direction}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{welcome}</p>
    </div>
  );
};
```

### `useLanguage()`

A focused hook for language management only.

```typescript
import { useLanguage } from '@/hooks';

const LanguageSelector = () => {
  const { 
    currentLanguage, 
    changeLanguage, 
    getAvailableLanguages 
  } = useLanguage();

  const availableLanguages = getAvailableLanguages();

  return (
    <select 
      value={currentLanguage} 
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {availableLanguages.map(lang => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
```

### `useLocalizedText()`

A hook focused on text localization with fallback support.

```typescript
import { useLocalizedText } from '@/hooks';

const LocalizedComponent = () => {
  const { getText, getTextWithParams, hasTranslation } = useLocalizedText();

  const title = getText('page.title', 'Default Title');
  const message = getTextWithParams('greeting', { name: 'User' }, 'Hello!');

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};
```

## Features

- **Type Safety**: All hooks are fully typed with TypeScript
- **Fallback Support**: Automatic fallback to default text when translations are missing
- **RTL Support**: Automatic direction detection for RTL languages (Arabic, Hebrew, etc.)
- **Async Language Switching**: Safe language switching with error handling
- **Initialization Tracking**: Track when i18n is fully initialized
- **Parameter Interpolation**: Support for dynamic values in translations

## Usage in Components

```typescript
import { useI18n } from '@/hooks';

const Dashboard = () => {
  const { t, direction } = useI18n();

  return (
    <div dir={direction}>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.description')}</p>
    </div>
  );
};
```

## Translation Keys Structure

The hooks work with the existing translation structure in `src/i18n/locales/`:

```json
{
  "navigation": {
    "personalInfo": "Personal Info",
    "experience": "Experience"
  },
  "actions": {
    "save": "Save",
    "cancel": "Cancel"
  }
}
```
