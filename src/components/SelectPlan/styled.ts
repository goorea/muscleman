import styled from 'styled-components/native';

import Image from '@src/components/Image';
import Text from '@src/components/Text';

export const Container = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  margin-left: 4px;
`;

export const Body = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TrainingImage = styled(Image)`
  width: 75px;
  height: 75px;
  margin-right: 16px;
`;

export const VolumesContainer = styled.View`
  flex: 1;
`;

export const VolumeWrapper = styled.View`
  flex-direction: row;
`;

export const FilledText = styled(Text)`
  width: 22%;
  text-align: right;
`;
