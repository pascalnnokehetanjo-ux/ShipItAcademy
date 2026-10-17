import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = ({ children, className, size = 'lg', ...props }: ContainerProps) => {
  const maxWidths = {
    sm: 'max-w-xl',
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8 w-full', maxWidths[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};
