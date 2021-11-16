import { Source } from 'react-native-fast-image';
import StackFlashMessage, { Options } from 'react-native-stack-flash-message';

import { WeightSet } from '@src/types';
import { Set, TrainingType, User } from '@src/types/graphql';

export const flash = (options: Options) => StackFlashMessage.show(options);

export const getTrainingTypeForKorean = (type: TrainingType): string => {
  switch (type) {
    case TrainingType.Lower:
      return '하체';
    case TrainingType.Chest:
      return '가슴';
    case TrainingType.Back:
      return '등';
    case TrainingType.Shoulder:
      return '어깨';
    case TrainingType.Arm:
      return '팔';
    case TrainingType.Abdominal:
      return '복근';
    case TrainingType.Cardiovascular:
      return '유산소';
    default:
      return '기타';
  }
};

export const isWeightSets = (sets: Set[]): sets is WeightSet[] =>
  sets.every(
    set =>
      (set as WeightSet).weight !== undefined &&
      (set as WeightSet).count !== undefined,
  );

export const getProfileImage = (user: User): Source | number =>
  user.profileImagePath
    ? { uri: user.profileImagePath }
    : require('@src/resources/images/mock.png');
