import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  barClassName?: string;
  showPercentage?: boolean;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max = 100,
  label,
  className,
  barClassName,
  showPercentage = true,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div ref={ref} className={clsx('w-full min-w-0', className)}>
      {label && (
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="min-w-0 text-sm font-medium text-gray-700 dark:text-gray-300 break-words">
            {label}
          </span>
          {showPercentage && (
            <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              {value}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={clsx(
            'h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-1500 ease-out',
            isIntersecting ? 'w-full' : 'w-0',
            barClassName
          )}
          style={{
            '--progress-width': `${percentage}%`,
            width: isIntersecting ? `${percentage}%` : '0%',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
