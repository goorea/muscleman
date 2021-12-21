import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from '@src/contexts/ThemeProvider';

import { Container, Title } from './styled';

const Loader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container testID="loader">
      <ActivityIndicator size="large" color={colors.foreground} />
      <Title>불러오는 중...😅😅😅</Title>
    </Container>
  );
};

export default Loader;
