import { render } from '@testing-library/react-native';
import React from 'react';

import Image from '@src/components/Image';

describe('Image 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(
      <Image source={{ uri: 'https://via.placeholder.com/40x40' }} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
