"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/github-dark.css";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("jsx", javascript);

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Highlight code blocks
      contentRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [content]);

  // Simple markdown to HTML conversion
  const renderMarkdown = (markdown: string) => {
    let html = markdown;

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, lang, code) =>
        `<pre><code class="language-${lang || "plaintext"}">${code.trim()}</code></pre>`
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Paragraphs
    html = html.replace(/\n\n/g, "</p><p>");
    html = `<p>${html}</p>`;

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, "");
    html = html.replace(/<p>(<h[1-6])/g, "$1");
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
    html = html.replace(/<p>(<pre>)/g, "$1");
    html = html.replace(/(<\/pre>)<\/p>/g, "$1");

    return html;
  };

  return (
    <div
      ref={contentRef}
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:mb-4
        prose-h2:text-3xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-20
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-20
        prose-p:leading-7 prose-p:mt-6
        prose-a:text-ai1-electric prose-a:no-underline hover:prose-a:text-ai1-cyan prose-a:transition-colors
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-muted prose-pre:border prose-pre:border-border
        prose-blockquote:border-l-4 prose-blockquote:border-ai1-cyan prose-blockquote:italic
        prose-ul:list-disc prose-ul:ml-6
        prose-ol:list-decimal prose-ol:ml-6
        prose-li:my-2
        prose-img:rounded-lg prose-img:my-6
        prose-hr:my-8"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
