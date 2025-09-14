import React from 'react';

interface HtmlRendererProps {
  content: string;
  className?: string;
}

export const HtmlRenderer: React.FC<HtmlRendererProps> = ({ content, className }) => {
  // Simple HTML sanitization - only allow safe tags
  const sanitizeHtml = (html: string): string => {
    // Allow only specific tags for formatting
    const allowedTags = ['b', 'strong', 'i', 'em', 'u', 'br'];
    
    // First, remove script tags and their content completely
    const sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Then handle other tags
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g;
    
    return sanitized.replace(tagRegex, (match, tagName) => {
      if (allowedTags.includes(tagName.toLowerCase())) {
        // For allowed tags, remove all attributes and keep only the tag name
        if (match.startsWith('</')) {
          return `</${tagName.toLowerCase()}>`;
        } else {
          return `<${tagName.toLowerCase()}>`;
        }
      }
      return ''; // Remove disallowed tags
    });
  };

  const sanitizedContent = sanitizeHtml(content);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

