import 'react-native';
import { render } from '@testing-library/react-native';
import React from 'react';

import Loader from '@src/components/Loader';
import { wrapper } from '@tests/functions';

describe('Loader 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = render(<Loader />, { wrapper });

    expect(queryByText('불러오는 중...😅😅😅')).not.toBeNull();
  });
});
