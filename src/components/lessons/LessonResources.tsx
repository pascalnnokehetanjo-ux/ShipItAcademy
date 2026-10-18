import React from 'react';
import { Card } from '@/components/ui/Card';
import { ExternalLink, BookOpen } from 'lucide-react';

interface ResourceItem {
  title: string;
  url: string;
}

interface LessonResourcesProps {
  resources: any[];
}

export const LessonResources: React.FC<LessonResourcesProps> = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  return (
    <Card className="space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
        <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <span>Recommended Resources</span>
      </h3>

      <div className="space-y-2">
        {resources.map((res: ResourceItem, idx: number) => (
          <a
            key={idx}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
              {res.title}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        ))}
      </div>
    </Card>
  );
};
