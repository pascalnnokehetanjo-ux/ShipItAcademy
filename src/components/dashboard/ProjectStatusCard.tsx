import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Project } from '@/types/database';
import { FolderGit2, Plus, ArrowRight } from 'lucide-react';

interface ProjectStatusCardProps {
  project: Project | null;
  featureCount?: number;
}

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ project, featureCount = 0 }) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <FolderGit2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Android App Project</span>
        </h3>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 uppercase">
          {project ? project.status.replace(/_/g, ' ') : 'Not Started'}
        </span>
      </div>

      {!project ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Start by defining the Android app you want to build and publish on Google Play.
          </p>
          <Button variant="outline" size="sm" href="/project" className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Create my project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{project.app_name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {project.one_line_purpose || 'Android app workspace'}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>{featureCount} planned features</span>
            <Button variant="ghost" size="sm" href="/project" className="text-blue-600 dark:text-blue-400 p-0 hover:bg-transparent">
              Open project <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
