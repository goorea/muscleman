import styled from 'styled-components/native';
import Button from '@src/components/Button';
import Text from '@src/components/Text';

export const Container = styled.View`
  padding: 20px;
`;

export const Title = styled(Text)`
  margin-bottom: 20px;
`;

export const Submit = styled(Button)`
  margin-top: auto;
`;

export const GenderContainer = styled.View`
  margin-top: 20px;
`;

export const GenderSelectors = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const GenderSelector = styled(Button)`
  flex: 1;
  padding: 20px 0;
`;
