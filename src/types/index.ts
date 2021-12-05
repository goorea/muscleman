import { Volume } from '@src/types/graphql';

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
