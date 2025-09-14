import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useHtmlTranslation } from '../useHtmlTranslation';

import React from 'react';

// Mock the HtmlRenderer component
vi.mock('@/utils/htmlRenderer', () => ({
  HtmlRenderer: ({ content, className }: { content: string; className?: string }) => {
    const element = React.createElement('span', {
      'data-testid': 'html-renderer',
      'data-content': content,
      'data-class': className,
      className: className
    }, content);
    // Add the props to the element for testing
    (element as React.ReactElement).props = {
      'data-testid': 'html-renderer',
      'data-content': content,
      'data-class': className,
      className: className
    };
    return element;
  },
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key as the translation
  }),
}));

describe('useHtmlTranslation', () => {
  it('returns a function to get HTML translations', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    
    expect(result.current.getHtmlTranslation).toBeDefined();
    expect(typeof result.current.getHtmlTranslation).toBe('function');
  });

  it('renders translation with HTML content', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('test.key');
    
    expect(translation).toBeDefined();
    expect(translation.type.name).toBe('HtmlRenderer');
    expect(translation.props.content).toBe('test.key');
  });

  it('applies custom className when provided', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('test.key', 'custom-class');
    
    expect(translation.props.className).toBe('custom-class');
  });

  it('handles translation keys correctly', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('sections.experience.strauss.description');
    
    expect(translation).toBeDefined();
    expect(translation.type.name).toBe('HtmlRenderer');
    expect(translation.props.content).toBe('sections.experience.strauss.description');
  });

  it('works with complex translation keys', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('sections.projects.imanage.description', 'project-description');
    
    expect(translation.props.className).toBe('project-description');
    expect(translation.type.name).toBe('HtmlRenderer');
    expect(translation.props.content).toBe('sections.projects.imanage.description');
  });
});
