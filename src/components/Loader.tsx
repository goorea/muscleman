import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Text from '@src/components/Text';
import { flexFillCenter } from '@src/styles/flex';
import { useTheme } from '@src/contexts/ThemeProvider';

const Container = styled.View`
  background-color: ${props => props.theme.background};
  ${flexFillCenter}
`;

const Title = styled(Text)`
  margin-top: 10px;
`;

const Loader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <ActivityIndicator size="large" color={colors.foreground} />
      <Title>불러오는 중...😅😅😅</Title>
    </Container>
  );
};

export default Loader;
