import { Source } from 'react-native-fast-image';
import StackFlashMessage, { Options } from 'react-native-stack-flash-message';

import {
  CalisthenicsVolume,
  CardiovascularVolume,
  WeightVolume,
} from '@src/types';
import {
  TrainingCategory,
  TrainingType,
  User,
  Volume,
} from '@src/types/graphql';

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

export const getTrainingCategoryForKorean = (
  category: TrainingCategory,
): string => {
  switch (category) {
    case TrainingCategory.Weight:
      return '중량 운동';
    case TrainingCategory.Calisthenics:
      return '맨몸 운동';
    case TrainingCategory.Cardiovascular:
    default:
      return '유산소 운동';
  }
};

export const isCalisthenicsVolume = (
  volume: Volume,
): volume is CalisthenicsVolume =>
  (volume as CalisthenicsVolume).count !== undefined &&
  (volume as CalisthenicsVolume).weight === undefined;

export const isCardiovascularVolume = (
  volume: Volume,
): volume is CardiovascularVolume =>
  (volume as CardiovascularVolume).times !== undefined &&
  (volume as CardiovascularVolume).distances !== undefined;

export const isWeightVolume = (volume: Volume): volume is WeightVolume =>
  (volume as WeightVolume).weight !== undefined &&
  (volume as WeightVolume).count !== undefined;

export const getProfileImage = (user: User): Source | number =>
  user.profileImagePath
    ? { uri: user.profileImagePath }
    : require('@src/resources/images/mock.png');
