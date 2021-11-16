import { isWeightSets } from '@src/functions';
import { Set } from '@src/types/graphql';

const useFooterText = (sets: Set[]): string => {
  if (isWeightSets(sets)) {
    const topWeight = sets.sort((a, b) => b.weight - a.weight)[0].weight;
    const maxVolume = sets.sort(
      (a, b) => b.weight * b.count - a.weight * a.count,
    )[0];

    return `최고 무게: ${topWeight}kg / 최대 볼륨: ${
      maxVolume.weight * maxVolume.count
    }kg`;
  }

  return '';
};

export default useFooterText;
