import { render } from '@testing-library/react-native';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { userFactory, wrapper } from '@tests/functions';

import HomeUser from './index';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

describe('HomeUser 컴포넌트', () => {
  const rendered = () => render(<HomeUser />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(({ key }) =>
      key === 'userState'
        ? userFactory({
            nickname: '심바',
            name: '정형석',
          })
        : null,
    );

    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });
});
