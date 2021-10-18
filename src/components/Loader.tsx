import React from 'react';
import { Overlay, Text } from 'react-native-elements';
import { ActivityIndicator, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '@src/contexts/ThemeProvider';

const LoaderOverlay = styled(Overlay)`
  background-color: ${props => props.theme.white};
  justify-content: center;
  align-items: center;
  flex: 1;
  elevation: 0;
`;

const Loader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <LoaderOverlay isVisible={true} fullScreen={true}>
      <ActivityIndicator size="large" color={colors?.black} />
      <Text style={styles.title}>불러오는 중...😅😅😅</Text>
    </LoaderOverlay>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
  },
});

export default Loader;
