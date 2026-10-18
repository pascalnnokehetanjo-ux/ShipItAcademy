import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

interface LessonContentProps {
  content: string;
}

export const LessonContent: React.FC<LessonContentProps> = ({ content }) => {
  return (
    <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            if (!inline && match) {
              return <CodeBlock code={codeString} language={match[1]} />;
            }
            if (!inline && !match) {
              return <CodeBlock code={codeString} language="text" />;
            }
            return (
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-mono text-xs sm:text-sm" {...props}>
                {children}
              </code>
            );
          },
          a({ node, children, href, ...props }: any) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                {...props}
              >
                {children}
              </a>
            );
          },
          h1: ({ children }) => <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-6 mb-3 text-gray-900 dark:text-white">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mt-5 mb-2 text-gray-900 dark:text-white">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-gray-700 dark:text-gray-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-gray-700 dark:text-gray-300">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
