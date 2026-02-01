
export interface ArtifactAnalysis {
  name: string;
  originLocation: string;
  period: string;
  culture: string;
  description: string;
  significance: string;
  estimatedYear: string;
  materials: string[];
  confidence: number;
}

// Define the structure for saved artifacts in the catalog
export interface SavedArtifact {
  id: string;
  image: string;
  data: ArtifactAnalysis;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
