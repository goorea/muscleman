import { isWeightVolume } from '@src/functions';
import { WeightVolume } from '@src/types';
import { Volume } from '@src/types/graphql';

const useFooterText = (volumes: Volume[]): string => {
  if (volumes.length && volumes.every(isWeightVolume)) {
    const topWeight = (volumes as WeightVolume[]).sort(
      (a, b) => b.weight - a.weight,
    )[0].weight;
    const maxVolume = (volumes as WeightVolume[]).sort(
      (a, b) => b.total - a.total,
    )[0];

    return `최고 무게: ${topWeight}kg / 최대 볼륨: ${
      maxVolume.weight * maxVolume.count
    }kg`;
  }

  return '';
};

export default useFooterText;
