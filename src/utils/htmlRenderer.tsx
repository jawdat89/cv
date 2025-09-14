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
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g;
    
    return html.replace(tagRegex, (match, tagName) => {
      if (allowedTags.includes(tagName.toLowerCase())) {
        return match;
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

