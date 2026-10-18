import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, ArrowRight } from 'lucide-react';

interface CourseCompleteCardProps {
  show: boolean;
}

export const CourseCompleteCard: React.FC<CourseCompleteCardProps> = ({ show }) => {
  if (!show) return null;

  return (
    <Card className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-xl border-emerald-800 text-center py-12 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
        <Award className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight">Course complete!</h2>
      <p className="text-base text-emerald-100 max-w-lg mx-auto">
        You have successfully completed all 30 lessons. Review your Google Play publication checklist and prepare your final app release.
      </p>
      <div className="pt-4">
        <Button variant="primary" size="lg" href="/project">
          Open my project <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
