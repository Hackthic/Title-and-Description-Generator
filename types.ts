
export interface Shot {
  number: number;
  visual: string;
  audio: string;
}

export interface OptimizationResult {
  refinedScript: Shot[];
  titles: string[];
  description: string;
  editingGuide: string;
}

export interface AppState {
  inputScript: string;
  isOptimizing: boolean;
  result: OptimizationResult | null;
  error: string | null;
}
