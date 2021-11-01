import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/elements';
import { Container } from './styled';

type P = {
  floatChildren?: React.ReactNode;
};

const KeyboardAvoidingScrollView: React.FC<P> = ({
  children,
  floatChildren,
}) => {
  const headerHeight = React.useContext(HeaderHeightContext);

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}>
      <ScrollView>{children}</ScrollView>
      {floatChildren}
    </Container>
  );
};

export default KeyboardAvoidingScrollView;
