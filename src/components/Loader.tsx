import React from 'react';
import { Overlay, Text, useTheme } from 'react-native-elements';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

const Loader: React.FC = () => {
  const { theme } = useTheme();
  const overlayStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors?.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    flex: 1,
  };

  return (
    <Overlay isVisible={true} fullScreen={true} overlayStyle={overlayStyle}>
      <ActivityIndicator size="large" color={theme.colors?.black} />
      <Text style={styles.title}>불러오는 중...😅😅😅</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
  },
});

export default Loader;
