import { Set } from '@src/types/graphql';

export interface WeightSet extends Set {
  count: number;

  weight: number;
}
