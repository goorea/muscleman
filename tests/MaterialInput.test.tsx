import { render } from '@testing-library/react-native';
import React from 'react';

import MaterialInput from '@src/components/MaterialInput';
import { wrapper } from '@tests/functions';

describe('MaterialInput 컴포넌트', () => {
  const onChange = jest.fn();

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(
      <MaterialInput onChange={onChange} label="이름" />,
      { wrapper },
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
