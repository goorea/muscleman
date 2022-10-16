import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { wrapper } from '@tests/functions';

import ConfirmModal from './index';

describe('ConfirmModal 컴포넌트', () => {
  const message = 'Hello World';
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const confirmText = '확인';
  const cancelText = '취소';
  const rendered = () =>
    render(
      <ConfirmModal
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText={confirmText}
        cancelText={cancelText}
      />,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { queryByText, queryByTestId } = rendered();

    expect(queryByText(message)).not.toBeNull();
    expect(queryByText(confirmText)).not.toBeNull();
    expect(queryByText(cancelText)).not.toBeNull();

    expect(queryByTestId('closeButton')).not.toBeNull();
  });

  it('닫기 버튼을 누르면 onCancel 함수가 실행된다', async () => {
    const { getByTestId } = rendered();

    await act(async () => await fireEvent.press(getByTestId('closeButton')));

    expect(onCancel).toBeCalled();
  });

  it('확인 버튼을 누르면 onConfirm 함수가 실행된다', async () => {
    const { getByText } = rendered();

    await act(async () => await fireEvent.press(getByText(confirmText)));

    expect(onConfirm).toBeCalled();
  });

  it('취소 버튼을 누르면 onCancel 함수가 실행된다', async () => {
    const { getByText } = rendered();

    await act(async () => await fireEvent.press(getByText(cancelText)));

    expect(onCancel).toBeCalled();
  });
});
