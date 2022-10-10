import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const TrainingName = styled(Text)`
  flex: 1;
`;

export const HeaderButtonGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconButton = styled(Button)`
  margin: 0 3px;
`;

export const AddSetContainer = styled.View`
  padding: 0 10px 10px;
`;

export const AddSetButton = styled(Button)`
  border-radius: 6px;
  margin-top: 10px;
  padding: 6px 0;
`;

export const AddSetWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AddSetText = styled(Text)`
  margin-left: 4px;
`;
