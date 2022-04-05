import { Training, Volume } from '@src/types/graphql';

export interface WeightVolume extends Volume {
  count: number;
  weight: number;
  total: number;
}

export interface CalisthenicsVolume extends Volume {
  count: number;
}

export interface CardiovascularVolume extends Volume {
  times: number;
  distances: number;
}

export interface EditingPlan {
  _id: string;
  plannedAt: string;
  training: Training;
  volumes: EditingVolume[];
}

export interface EditingVolume {
  _id: string;
  complete: boolean;
  count?: number;
  distances?: number;
  times?: number;
  total?: number;
  weight?: number;
}
