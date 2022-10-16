import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { wrapper } from '@tests/functions';

import AcceptModal from './index';

describe('AcceptModal 컴포넌트', () => {
  const onConfirm = jest.fn();
  const rendered = () =>
    render(<AcceptModal onConfirm={onConfirm} loading={false} />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('이용약관 동의, 개인정보 처리방침 동의, 확인 버튼이 보인다', () => {
    const { queryByText } = rendered();

    expect(queryByText('이용약관 동의')).not.toBeNull();
    expect(queryByText('개인정보 처리방침 동의')).not.toBeNull();
    expect(queryByText('확인')).not.toBeNull();
  });

  it('이용약관이나 개인정보 처리방침에 동의하지 않았다면 확인 버튼이 꺼져 있다', () => {
    const { getByText } = rendered();

    expect(getByText('확인')).toBeDisabled();
  });

  it('이용약관과 개인정보 처리방침을 동의하고 확인 버튼을 누르면 onConfirm 함수가 발생한다', async () => {
    const { getByText } = rendered();

    await act(async () => {
      fireEvent.press(getByText('이용약관 동의'));
      fireEvent.press(getByText('개인정보 처리방침 동의'));
    });

    await act(async () => fireEvent.press(getByText('확인')));

    expect(onConfirm).toHaveBeenCalled();
  });
});
