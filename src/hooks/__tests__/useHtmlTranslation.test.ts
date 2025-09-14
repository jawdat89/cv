import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useHtmlTranslation } from '../useHtmlTranslation';

// Mock the HtmlRenderer component
vi.mock('@/utils/htmlRenderer', () => ({
  HtmlRenderer: ({ content, className }: { content: string; className?: string }) => {
    const React = require('react');
    return React.createElement('span', {
      'data-testid': 'html-renderer',
      'data-content': content,
      'data-class': className
    }, content);
  },
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
    expect(translation.props['data-content']).toBe('test.key');
  });

  it('applies custom className when provided', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('test.key', 'custom-class');
    
    expect(translation.props['data-class']).toBe('custom-class');
  });

  it('handles translation keys correctly', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('sections.experience.strauss.description');
    
    expect(translation.props['data-content']).toBe('sections.experience.strauss.description');
  });

  it('works with complex translation keys', () => {
    const { result } = renderHook(() => useHtmlTranslation());
    const translation = result.current.getHtmlTranslation('sections.projects.imanage.description', 'project-description');
    
    expect(translation.props['data-content']).toBe('sections.projects.imanage.description');
    expect(translation.props['data-class']).toBe('project-description');
  });
});
