import React from 'react';
import { Lesson } from '@/types/database';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Map } from 'lucide-react';

interface LessonNavigationProps {
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({ previousLesson, nextLesson }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div>
        {previousLesson ? (
          <Button variant="outline" size="md" href={`/lessons/${previousLesson.slug}`}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous: {previousLesson.title}
          </Button>
        ) : (
          <Button variant="outline" size="md" href="/roadmap">
            <Map className="w-4 h-4 mr-2" /> Back to roadmap
          </Button>
        )}
      </div>

      <div>
        {nextLesson ? (
          <Button variant="primary" size="md" href={`/lessons/${nextLesson.slug}`}>
            Next: {nextLesson.title} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="secondary" size="md" href="/roadmap">
            Complete course <Map className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};
