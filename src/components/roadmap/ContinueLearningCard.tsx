import React from 'react';
import { Lesson } from '@/types/database';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlayCircle, Clock, BookMarked } from 'lucide-react';

interface ContinueLearningCardProps {
  nextLesson: Lesson | null;
  moduleTitle?: string;
  globalLessonNumber?: number;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  nextLesson,
  moduleTitle,
  globalLessonNumber,
}) => {
  if (!nextLesson) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-xl border-blue-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-0.5 rounded-full">
              Continue where you left off
            </span>
            {moduleTitle && (
              <span className="text-xs text-blue-200 flex items-center space-x-1">
                <BookMarked className="w-3.5 h-3.5" />
                <span>{moduleTitle}</span>
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Lesson {globalLessonNumber}: {nextLesson.title}
          </h2>
          <p className="text-sm text-blue-100 max-w-xl line-clamp-2">
            {nextLesson.summary || 'Pick up right where you left off and continue building your Android app.'}
          </p>
          <div className="flex items-center space-x-2 text-xs text-blue-200 pt-1">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Estimated time: {nextLesson.estimated_minutes} minutes</span>
          </div>
        </div>

        <div>
          <Button variant="secondary" size="lg" href={`/lessons/${nextLesson.slug}`} className="w-full md:w-auto shadow-lg">
            <PlayCircle className="w-5 h-5 mr-2" /> Continue Lesson
          </Button>
        </div>
      </div>
    </Card>
  );
};
