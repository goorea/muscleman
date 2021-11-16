import { render } from '@testing-library/react-native';
import React from 'react';

import SocialIcon from '@src/components/SocialIcon';
import { SocialProvider } from '@src/types/graphql';

describe('SocialIcon 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(<SocialIcon provider={SocialProvider.Naver} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
