import { navigationMock } from '@mocks/navigationMocks';
import { render } from '@testing-library/react-native';
import React from 'react';

import HomeCarousel from '@src/components/HomeCarousel';
import { wrapper } from '@tests/functions';

describe('HomeCarousel 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(<HomeCarousel navigation={navigationMock} />, {
      wrapper,
    });

    expect(toJSON()).toMatchSnapshot();
  });
});
