import { render } from '@testing-library/react-native';
import React from 'react';

import { wrapper } from '@tests/functions';

import NeedAuthenticate from './index';

describe('NeedAuthenticate 컴포넌트', () => {
  const rendered = () => render(<NeedAuthenticate />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(queryByText('로그인 후 이용 가능합니다!')).not.toBeNull();
    expect(queryByText('💪')).not.toBeNull();
    expect(queryByText('로그인 하러가기')).not.toBeNull();
  });
});
