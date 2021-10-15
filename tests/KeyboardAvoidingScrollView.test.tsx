import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import KeyboardAvoidingScrollView from '@src/components/KeyboardAvoidingScrollView';

describe('KeyboardAvoidingScrollView 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(<KeyboardAvoidingScrollView />);

    expect(toJSON()).toMatchSnapshot();
  });
});
