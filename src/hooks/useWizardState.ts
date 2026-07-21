import { useCallback, useState, useSyncExternalStore } from 'react';

export interface WizardState<T> {
  currentStep: number;
  data: T;
  errors: Record<string, string>;
  isValid: boolean;
}

interface WizardStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => WizardState<T>;
  getServerSnapshot: () => WizardState<T>;
  setState: (updater: (prev: WizardState<T>) => WizardState<T>) => void;
}

// Backs the wizard's state with an external store instead of useState, so the
// localStorage-restored value can be read synchronously during the client's
// first render (matching what useSyncExternalStore expects) without an SSR
// mismatch or an extra setState-in-effect render pass.
function createWizardStore<T>(initialData: T, storageKey: string): WizardStore<T> {
  const serverState: WizardState<T> = {
    currentStep: 0,
    data: initialData,
    errors: {},
    isValid: false
  };

  let state: WizardState<T> = serverState;

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        state = {
          currentStep: parsed.currentStep || 0,
          data: { ...initialData, ...parsed.data },
          errors: {},
          isValid: false
        };
      } catch (e) {
        console.warn('Failed to parse saved wizard data:', e);
      }
    }
  }

  const listeners = new Set<() => void>();

  function persist() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, JSON.stringify({
      currentStep: state.currentStep,
      data: state.data
    }));
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      return state;
    },
    getServerSnapshot() {
      return serverState;
    },
    setState(updater) {
      state = updater(state);
      persist();
      listeners.forEach((listener) => listener());
    }
  };
}

export function useWizardState<T>(
  initialData: T,
  totalSteps: number,
  storageKey: string
) {
  const [store] = useState<WizardStore<T>>(() => createWizardStore(initialData, storageKey));

  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  const updateData = useCallback((updates: Partial<T>) => {
    store.setState(prev => ({
      ...prev,
      data: { ...prev.data, ...updates },
      errors: {}
    }));
  }, [store]);

  const setErrors = useCallback((errors: Record<string, string>) => {
    store.setState(prev => ({
      ...prev,
      errors,
      isValid: Object.keys(errors).length === 0
    }));
  }, [store]);

  const nextStep = useCallback(() => {
    store.setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, totalSteps - 1)
    }));
    // Scroll to top of page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [store, totalSteps]);

  const prevStep = useCallback(() => {
    store.setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
      errors: {}
    }));
    // Scroll to top of page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [store]);

  const goToStep = useCallback((step: number) => {
    store.setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, totalSteps - 1)),
      errors: {}
    }));
  }, [store, totalSteps]);

  const resetWizard = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
    store.setState(() => ({
      currentStep: 0,
      data: initialData,
      errors: {},
      isValid: false
    }));
  }, [store, initialData, storageKey]);

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
