'use client';

import React, { useState, useActionState } from 'react';
import { submitOnboardingAction } from '@/app/(protected)/onboarding/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Smartphone, CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { ExperienceLevel, LearningGoal } from '@/types/database';

export function OnboardingForm() {
  const [step, setStep] = useState<number>(1);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>('');
  const [learningGoal, setLearningGoal] = useState<LearningGoal | ''>('');
  const [weeklyHours, setWeeklyHours] = useState<string>('');

  const [state, formAction, isPending] = useActionState(submitOnboardingAction, null);

  const handleNext = () => {
    if (step === 1 && !experienceLevel) return;
    if (step === 2 && !learningGoal) return;
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-[520px] mx-auto py-12 px-4">
      <Card className="space-y-6 shadow-xl border-gray-200 dark:border-gray-800">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Step {step} of 3
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {step === 1 && 'What is your coding experience?'}
            {step === 2 && 'What is your primary learning goal?'}
            {step === 3 && 'How much time can you commit weekly?'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {step === 1 && 'Help us tailor the curriculum speed to your background.'}
            {step === 2 && 'We will guide you directly toward achieving this milestone.'}
            {step === 3 && 'Consistency is key to publishing your first app.'}
          </p>
        </div>

        {state?.error && (
          <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="experienceLevel" value={experienceLevel} />
          <input type="hidden" name="learningGoal" value={learningGoal} />
          <input type="hidden" name="weeklyHours" value={weeklyHours} />

          {step === 1 && (
            <div className="space-y-3">
              {[
                { id: 'beginner', label: 'Complete beginner', desc: 'I have never written code before.' },
                { id: 'some_coding', label: 'Some coding experience', desc: 'I know basic programming concepts or web dev.' },
                { id: 'developer_new_to_android', label: 'Developer new to Android', desc: 'I am a developer transitioning to mobile.' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setExperienceLevel(opt.id as ExperienceLevel)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    experienceLevel === opt.id
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{opt.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                  {experienceLevel === opt.id && <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {[
                { id: 'build_first_app', label: 'Build my first app', desc: 'Turn my personal app idea into a working prototype.' },
                { id: 'publish_google_play', label: 'Publish an app to Google Play', desc: 'Go through the full release and store listing process.' },
                { id: 'learn_android', label: 'Learn Android development', desc: 'Master Kotlin and Jetpack Compose fundamentals.' },
                { id: 'portfolio_project', label: 'Create a portfolio project', desc: 'Build an impressive production-grade app for interviews.' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setLearningGoal(opt.id as LearningGoal)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    learningGoal === opt.id
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{opt.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                  {learningGoal === opt.id && <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {[
                { id: 'less_than_3', label: 'Less than 3 hours', desc: 'Casual learning pace.' },
                { id: '3_to_5', label: '3–5 hours', desc: 'Steady weekly progress.' },
                { id: '5_to_10', label: '5–10 hours', desc: 'Dedicated building pace.' },
                { id: 'more_than_10', label: 'More than 10 hours', desc: 'Fast-track to Google Play publication.' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setWeeklyHours(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    weeklyHours === opt.id
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{opt.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                  {weeklyHours === opt.id && <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            {step > 1 ? (
              <Button type="button" variant="outline" size="md" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                disabled={(step === 1 && !experienceLevel) || (step === 2 && !learningGoal)}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="secondary"
                size="md"
                disabled={isPending || !weeklyHours}
              >
                {isPending ? 'Saving profile...' : 'Complete setup'}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
