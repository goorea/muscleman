import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import EditVolume from '@src/components/EditVolume';
import RecoilObserver from '@src/components/RecoilObserver';
import { selectedEditingVolumeIDState } from '@src/screens/EditPlanScreen/recoils';
import { EditingVolume } from '@src/types';
import { planFactory, volumeFactory, wrapper } from '@tests/functions';

describe('EditVolum 컴포넌트', () => {
  const plan = planFactory();
  const editingVolume = volumeFactory(plan, { weight: 100, count: 5 });
  plan.volumes = [];
  plan.volumes[0] = editingVolume;
  const drag = jest.fn();
  const onChange = jest.fn();
  const rendered = () =>
    render(
      <>
        <RecoilObserver
          node={selectedEditingVolumeIDState}
          onChange={onChange}
        />
        <EditVolume
          editingVolume={editingVolume as EditingVolume}
          planID={plan._id}
          index={0}
          drag={drag}
        />
      </>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { queryByText, queryByTestId } = rendered();

    expect(queryByTestId('dragButton')).not.toBeNull();
    expect(queryByTestId('toggleButton')).not.toBeNull();
    expect(queryByTestId('deleteButton')).not.toBeNull();

    expect(queryByText('1Set')).not.toBeNull();
    expect(queryByText(`${editingVolume.weight}kg`)).not.toBeNull();
    expect(queryByText(`${editingVolume.count}개`)).not.toBeNull();
  });

  it('누르면 선택된다', async () => {
    const { getByTestId } = rendered();

    await act(async () => fireEvent.press(getByTestId('volumeContainer')));

    expect(onChange).toBeCalledWith(editingVolume._id);
  });
});
