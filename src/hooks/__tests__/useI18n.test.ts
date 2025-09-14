import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useI18n } from '../useI18n';

// Mock react-i18next
const mockI18n = {
  changeLanguage: vi.fn(),
  language: 'en',
  isInitialized: true,
  on: vi.fn(),
  off: vi.fn(),
  exists: vi.fn(() => true),
  options: {
    resources: {
      en: {},
      he: {},
      ar: {},
      fr: {},
    },
  },
};

const mockT = vi.fn((key: string) => key);

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: mockI18n,
  }),
}));

describe('useI18n', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns translation function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.t).toBeDefined();
    expect(typeof result.current.t).toBe('function');
  });

  it('returns getText function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.getText).toBeDefined();
    expect(typeof result.current.getText).toBe('function');
  });

  it('returns getTextWithParams function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.getTextWithParams).toBeDefined();
    expect(typeof result.current.getTextWithParams).toBe('function');
  });

  it('returns hasTranslation function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.hasTranslation).toBeDefined();
    expect(typeof result.current.hasTranslation).toBe('function');
  });

  it('returns changeLanguage function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.changeLanguage).toBeDefined();
    expect(typeof result.current.changeLanguage).toBe('function');
  });

  it('returns getCurrentLanguage function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.getCurrentLanguage).toBeDefined();
    expect(typeof result.current.getCurrentLanguage).toBe('function');
  });

  it('returns getAvailableLanguages function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.getAvailableLanguages).toBeDefined();
    expect(typeof result.current.getAvailableLanguages).toBe('function');
  });

  it('returns getDirection function', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.direction).toBeDefined();
    expect(typeof result.current.direction).toBe('string');
  });

  it('returns isInitialized state', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.isInitialized).toBe(true);
  });

  it('returns direction state', () => {
    const { result } = renderHook(() => useI18n());
    
    expect(result.current.direction).toBe('ltr');
  });

  it('calls translation function correctly', () => {
    const { result } = renderHook(() => useI18n());
    
    result.current.t('test.key');
    expect(mockT).toHaveBeenCalledWith('test.key');
  });

  it('getText returns translation or fallback', () => {
    const { result } = renderHook(() => useI18n());
    
    const translation = result.current.getText('test.key', 'fallback');
    expect(translation).toBe('test.key');
  });

  it('getTextWithParams calls translation with params', () => {
    const { result } = renderHook(() => useI18n());
    
    result.current.getTextWithParams('test.key', { name: 'John' }, 'fallback');
    expect(mockT).toHaveBeenCalledWith('test.key', { name: 'John' });
  });

  it('hasTranslation checks if key exists', () => {
    const { result } = renderHook(() => useI18n());
    
    result.current.hasTranslation('test.key');
    expect(mockI18n.exists).toHaveBeenCalledWith('test.key');
  });

  it('changeLanguage calls i18n changeLanguage', async () => {
    const { result } = renderHook(() => useI18n());
    
    await act(async () => {
      await result.current.changeLanguage('he');
    });
    
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith('he');
  });

  it('getCurrentLanguage returns current language', () => {
    const { result } = renderHook(() => useI18n());
    
    const currentLang = result.current.getCurrentLanguage();
    expect(currentLang).toBe('en');
  });

  it('getAvailableLanguages returns available languages', () => {
    const { result } = renderHook(() => useI18n());
    
    const languages = result.current.getAvailableLanguages();
    expect(languages).toEqual(['en', 'he', 'ar', 'fr']);
  });

  it('getDirection returns correct direction for RTL languages', () => {
    mockI18n.language = 'he';
    const { result } = renderHook(() => useI18n());
    
    const direction = result.current.direction;
    expect(direction).toBe('rtl');
  });

  it('getDirection returns ltr for LTR languages', () => {
    mockI18n.language = 'en';
    const { result } = renderHook(() => useI18n());
    
    const direction = result.current.direction;
    expect(direction).toBe('ltr');
  });
});
