import { render } from '@testing-library/react-native';
import React from 'react';

import { SocialProvider } from '@src/types/graphql';

import SocialIcon from './index';

describe('SocialIcon 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(<SocialIcon provider={SocialProvider.Naver} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
