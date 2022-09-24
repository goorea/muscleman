import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import RecoilObserver from '@src/components/RecoilObserver';
import { Unit } from '@src/components/VolumeKeyboard/hooks/useUnit';
import { selectedEditingVolumeIDState } from '@src/screens/EditPlanScreen/recoils';
import { wrapper } from '@tests/functions';

import VolumeKeyboard from './index';

describe('VolumeKeyboard 컴포넌트', () => {
  const onChange = jest.fn();
  const rendered = (node?: any) =>
    render(
      <>
        {!!node && <RecoilObserver node={node} onChange={onChange} />}
        <VolumeKeyboard />
      </>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('확인 버튼을 누르면 볼륨을 선택 해제한다', async () => {
    const { getByText } = rendered(selectedEditingVolumeIDState);

    await act(async () => await fireEvent.press(getByText('확인')));

    expect(onChange).toBeCalledWith('');
  });

  it('Unit을 변경하는 버튼을 누르면 Storage에 저장된다', async () => {
    const unit: Unit = '10';
    const { getByTestId } = rendered();

    await act(
      async () => await fireEvent.press(getByTestId(`unitButton${unit}`)),
    );

    expect(AsyncStorage.setItem).toBeCalledWith('@setUnit', unit);
  });

  it('Unit을 변경하는 버튼을 누르면 해당 Unit의 +- 버튼이 노출된다', async () => {
    const unit: Unit = '10';
    const { getByTestId, queryByText } = rendered();

    expect(queryByText(`-${unit}`)).toBeNull();
    expect(queryByText(`+${unit}`)).toBeNull();

    await act(
      async () => await fireEvent.press(getByTestId(`unitButton${unit}`)),
    );

    expect(queryByText(`-${unit}`)).not.toBeNull();
    expect(queryByText(`+${unit}`)).not.toBeNull();
  });

  // Unit만큼 무게를 뺄 수 있다
  // Unit이 무게보다 클 때는 뺄 수 없다
  // 1만큼 무게를 뺄 수 있다
  // 무게가 0이면 1만큼 뺄 수 없다
  // Unit만큼 무게를 더할 수 있다
  // 1만큼 무게를 더할 수 있다
  // 5만큼 횟수를 뺄 수 있다
  // 횟수가 5보다 작다면 뺄 수 없다
  // 1만큼 무게를 뺄 수 있다
  // 횟수가 0이면 1만큼 뺄 수 없다
  // 5만큼 횟수를 더 할 수 있다
  // 1만큼 횟수를 더 할 수 있다
});
