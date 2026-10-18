'use client';

import React, { useState } from 'react';
import { FullProject } from '@/lib/data/project';
import { Container } from '@/components/ui/Container';
import { AppIdeaTab } from './AppIdeaTab';
import { FeaturesTab } from './FeaturesTab';
import { ScreensTab } from './ScreensTab';
import { ReleaseChecklistTab } from './ReleaseChecklistTab';
import { FolderGit2, Lightbulb, CheckSquare, Smartphone, CheckCircle2 } from 'lucide-react';

interface ProjectWorkspaceProps {
  project: FullProject;
}

export function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'idea' | 'features' | 'screens' | 'checklist'>('idea');

  const releaseChecklist = (project.release_checklist as Record<string, boolean>) || {};
  const completedChecklistCount = Object.values(releaseChecklist).filter(Boolean).length;

  return (
    <Container className="py-10 space-y-8">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/30">
                Project Workspace
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase">
                {project.status.replace(/_/g, ' ')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
              {project.app_name}
            </h1>
            <p className="text-sm text-purple-100 max-w-xl">
              {project.one_line_purpose}
            </p>
          </div>

          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-4 text-center sm:min-w-[180px]">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">
              {completedChecklistCount} / 8
            </span>
            <p className="text-xs text-purple-200 mt-0.5">Release Tasks Ready</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto space-x-2 pt-2 border-t border-purple-800/60">
          {[
            { id: 'idea', label: 'App Idea', icon: Lightbulb },
            { id: 'features', label: `Features (${project.project_features.length})`, icon: CheckSquare },
            { id: 'screens', label: `Screens (${project.project_screens.length})`, icon: Smartphone },
            { id: 'checklist', label: `Release Checklist (${completedChecklistCount}/8)`, icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-purple-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'idea' && <AppIdeaTab project={project} />}
        {activeTab === 'features' && <FeaturesTab project={project} />}
        {activeTab === 'screens' && <ScreensTab project={project} />}
        {activeTab === 'checklist' && <ReleaseChecklistTab project={project} />}
      </div>
    </Container>
  );
}
