"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface WizardStep {
  title: string;
  content: ReactNode;
}

interface StepWizardProps {
  steps: WizardStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete?: () => void;
  completeLabel?: string;
  showPhaseNote?: ReactNode;
}

export function StepWizard({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  completeLabel = "Continue",
  showPhaseNote,
}: StepWizardProps) {
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between gap-2">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= currentStep
                  ? "bg-[var(--ch-teal)] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`mt-1 hidden text-center text-xs sm:block ${
                i === currentStep ? "font-medium text-[var(--ch-navy)]" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {showPhaseNote}

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="font-display mb-6 text-2xl font-semibold text-[var(--ch-navy)]">
          {steps[currentStep].title}
        </h2>
        {steps[currentStep].content}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-40"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            if (isLast && onComplete) onComplete();
            else onStepChange(Math.min(steps.length - 1, currentStep + 1));
          }}
          className="inline-flex items-center gap-1 rounded-full bg-[var(--ch-teal)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--ch-teal-light)]"
          aria-label={isLast ? completeLabel : "Next step"}
        >
          {isLast ? completeLabel : "Continue"}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
