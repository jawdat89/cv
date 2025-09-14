import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HtmlRenderer } from '../htmlRenderer';

describe('HtmlRenderer', () => {
  it('renders plain text correctly', () => {
    render(<HtmlRenderer content="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders bold text correctly', () => {
    render(<HtmlRenderer content="This is <b>bold</b> text" />);
    const boldElement = screen.getByText('bold');
    expect(boldElement).toBeInTheDocument();
    expect(boldElement.tagName).toBe('B');
  });

  it('renders multiple bold elements', () => {
    render(<HtmlRenderer content="<b>React</b> and <b>Node.js</b> are great" />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders italic text correctly', () => {
    render(<HtmlRenderer content="This is <i>italic</i> text" />);
    const italicElement = screen.getByText('italic');
    expect(italicElement).toBeInTheDocument();
    expect(italicElement.tagName).toBe('I');
  });

  it('renders strong text correctly', () => {
    render(<HtmlRenderer content="This is <strong>strong</strong> text" />);
    const strongElement = screen.getByText('strong');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement.tagName).toBe('STRONG');
  });

  it('renders underlined text correctly', () => {
    render(<HtmlRenderer content="This is <u>underlined</u> text" />);
    const underlinedElement = screen.getByText('underlined');
    expect(underlinedElement).toBeInTheDocument();
    expect(underlinedElement.tagName).toBe('U');
  });

  it('renders line breaks correctly', () => {
    render(<HtmlRenderer content="Line 1<br/>Line 2" />);
    const container = screen.getByText(/Line 1/);
    expect(container).toBeInTheDocument();
  });

  it('sanitizes dangerous HTML tags', () => {
    render(<HtmlRenderer content="<script>alert('xss')</script>Safe content" />);
    expect(screen.getByText(/Safe content/)).toBeInTheDocument();
    expect(screen.queryByText(/alert\('xss'\)/)).not.toBeInTheDocument();
  });

  it('sanitizes dangerous attributes', () => {
    render(<HtmlRenderer content={'<b onclick="alert(\'xss\')">Safe bold</b>'} />);
    const boldElement = screen.getByText('Safe bold');
    expect(boldElement).toBeInTheDocument();
    expect(boldElement).not.toHaveAttribute('onclick');
  });

  it('applies custom className', () => {
    render(<HtmlRenderer content="Test content" className="custom-class" />);
    const element = screen.getByText('Test content');
    expect(element).toHaveClass('custom-class');
  });

  it('handles empty content', () => {
    render(<HtmlRenderer content="" />);
    const container = document.querySelector('span');
    expect(container).toBeInTheDocument();
  });

  it('handles mixed allowed and disallowed tags', () => {
    render(<HtmlRenderer content="<b>Bold</b> and <div>div</div> and <i>italic</i>" />);
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
    expect(screen.queryByText('div')).not.toBeInTheDocument();
  });

  it('preserves nested allowed tags', () => {
    render(<HtmlRenderer content="<b><i>Bold and italic</i></b>" />);
    const element = screen.getByText('Bold and italic');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('I');
  });
});
