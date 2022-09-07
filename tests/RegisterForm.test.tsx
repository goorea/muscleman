import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import RegisterForm from '@src/components/RegisterForm';
import { wrapper } from '@tests/functions';

describe('RegisterForm 컴포넌트', () => {
  const onSubmit = jest.fn();
  const rendered = () =>
    render(<RegisterForm onSubmit={onSubmit} errorMessages={[]} />, {
      wrapper,
    });

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('이름, 닉네임, 전화번호, 생일 입력 필드와 확인 버튼이 보인다', () => {
    const { queryByTestId, queryByText } = rendered();

    expect(queryByTestId('nameField')).not.toBeNull();
    expect(queryByTestId('nicknameField')).not.toBeNull();
    // expect(queryByTestId('telField')).not.toBeNull();
    // expect(queryByTestId('birthField')).not.toBeNull();
    expect(queryByText('확인')).not.toBeNull();
  });

  it('이름을 입력하지 않거나 2글자보다 적거나 8글자보다 많으면 에러메세지가 보인다', async () => {
    const { getByTestId, getByText, queryByText } = rendered();
    const nameField = getByTestId('nameField');

    expect(queryByText('이름을 입력해주세요')).toBeNull();
    expect(queryByText('2글자보다 적습니다')).toBeNull();
    expect(queryByText('8글자보다 많습니다')).toBeNull();

    await act(async () => fireEvent.press(getByText('확인')));

    expect(queryByText('이름을 입력해주세요')).not.toBeNull();

    await act(async () => fireEvent.changeText(nameField, '1'));

    expect(queryByText('2글자보다 적습니다')).not.toBeNull();

    await act(async () => fireEvent.changeText(nameField, '1'.repeat(9)));

    expect(queryByText('8글자보다 많습니다')).not.toBeNull();
  });

  it('닉네임을 입력하지 않거나 2글자보다 적거나 8글자보다 많으면 에러메세지가 보인다', async () => {
    const { getByTestId, getByText, queryByText } = rendered();
    const nicknameField = getByTestId('nicknameField');

    expect(queryByText('닉네임을 입력해주세요')).toBeNull();
    expect(queryByText('2글자보다 적습니다')).toBeNull();
    expect(queryByText('8글자보다 많습니다')).toBeNull();

    await act(async () => fireEvent.press(getByText('확인')));

    expect(queryByText('닉네임을 입력해주세요')).not.toBeNull();

    await act(async () => fireEvent.changeText(nicknameField, '1'));

    expect(queryByText('2글자보다 적습니다')).not.toBeNull();

    await act(async () => fireEvent.changeText(nicknameField, '1'.repeat(9)));

    expect(queryByText('8글자보다 많습니다')).not.toBeNull();
  });

  // it('휴대폰 번호를 입력하지 않거나 생일을 입력하지 않으면 에러 메세지가 보인다', async () => {
  //   const { getByText, queryByText } = rendered();
  //
  //   expect(queryByText('휴대폰 번호를 입력해주세요')).toBeNull();
  //   expect(queryByText('생년월일을 선택해주세요')).toBeNull();
  //
  //   await act(async () => fireEvent.press(getByText('확인')));
  //
  //   expect(queryByText('휴대폰 번호를 입력해주세요')).not.toBeNull();
  //   expect(queryByText('생년월일을 선택해주세요')).not.toBeNull();
  // });

  it('올바른 값을 입력한 뒤에 확인 버튼을 누르면 onSubmit 함수가 실행된다', async () => {
    const { getByTestId, getByText } = rendered();

    await act(async () => {
      fireEvent.changeText(getByTestId('nameField'), 'John');
      fireEvent.changeText(getByTestId('nicknameField'), 'John');
      // fireEvent.changeText(getByTestId('telField'), '01012341234');
      // fireEvent.changeText(getByTestId('birthField'), '1970-01-01');
    });

    await act(async () => fireEvent.press(getByText('확인')));

    expect(onSubmit).toHaveBeenCalled();
  });
});
