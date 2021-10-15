import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/elements';

const KeyboardAvoidingScrollView: React.FC = ({ children }) => {
  const headerHeight = React.useContext(HeaderHeightContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}>
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingScrollView;
