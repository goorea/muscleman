import 'react-native';
import React from 'react';
import FlashMessage from '@src/components/FlashMessage';
import { render } from '@testing-library/react-native';

describe('FlashMessage 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(<FlashMessage />);

    expect(toJSON()).toMatchSnapshot();
  });
});
