import React from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '@src/contexts/ThemeProvider';
import Text from '@src/components/Text';

const LoaderOverlay = styled(Overlay)`
  background-color: ${props => props.theme.white};
  justify-content: center;
  align-items: center;
  flex: 1;
  elevation: 0;
`;

const Title = styled(Text)`
  margin-top: 10px;
`;

const Loader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <LoaderOverlay isVisible={true} fullScreen={true}>
      <ActivityIndicator size="large" color={colors.black} />
      <Title>불러오는 중...😅😅😅</Title>
    </LoaderOverlay>
  );
};

export default Loader;
