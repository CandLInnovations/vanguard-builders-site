import { useState, useCallback, useEffect } from 'react';

export interface WizardState<T> {
  currentStep: number;
  data: T;
  errors: Record<string, string>;
  isValid: boolean;
}

export function useWizardState<T>(
  initialData: T,
  totalSteps: number,
  storageKey: string
) {
  // Always start with initial state for SSR compatibility
  const [state, setState] = useState<WizardState<T>>({
    currentStep: 0,
    data: initialData,
    errors: {},
    isValid: false
  });

  // Load saved data from localStorage after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setState({
            currentStep: parsed.currentStep || 0,
            data: { ...initialData, ...parsed.data },
            errors: {},
            isValid: false
          });
        } catch (e) {
          console.warn('Failed to parse saved wizard data:', e);
        }
      }
    }
  }, [initialData, storageKey]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify({
        currentStep: state.currentStep,
        data: state.data
      }));
    }
  }, [state.currentStep, state.data, storageKey]);

  const updateData = useCallback((updates: Partial<T>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...updates },
      errors: {}
    }));
  }, []);

  const setErrors = useCallback((errors: Record<string, string>) => {
    setState(prev => ({
      ...prev,
      errors,
      isValid: Object.keys(errors).length === 0
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, totalSteps - 1)
    }));
    // Scroll to top of page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
      errors: {}
    }));
    // Scroll to top of page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, totalSteps - 1)),
      errors: {}
    }));
  }, [totalSteps]);

  const resetWizard = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
    setState({
      currentStep: 0,
      data: initialData,
      errors: {},
      isValid: false
    });
  }, [initialData, storageKey]);

  const canGoNext = useCallback(() => {
    return state.currentStep < totalSteps - 1 && Object.keys(state.errors).length === 0;
  }, [state.currentStep, state.errors, totalSteps]);

  const canGoBack = useCallback(() => {
    return state.currentStep > 0;
  }, [state.currentStep]);

  return {
    ...state,
    updateData,
    setErrors,
    nextStep,
    prevStep,
    goToStep,
    resetWizard,
    canGoNext,
    canGoBack,
    progress: ((state.currentStep + 1) / totalSteps) * 100
  };
}