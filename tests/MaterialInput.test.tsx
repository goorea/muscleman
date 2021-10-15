import 'react-native';
import React from 'react';
import MaterialInput from '@src/components/MaterialInput';
import { render } from '@testing-library/react-native';

describe('MaterialInput 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(<MaterialInput />);

    expect(toJSON()).toMatchSnapshot();
  });
});
