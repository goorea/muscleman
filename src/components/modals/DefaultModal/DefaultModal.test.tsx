import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Text from '@src/components/Text';
import DefaultModal from '@src/components/modals/DefaultModal/index';
import { wrapper } from '@tests/functions';

describe('DefaultModal 컴포넌트', () => {
  const rendered = () =>
    render(
      <DefaultModal>
        <Text>children</Text>
      </DefaultModal>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { queryByTestId, queryByText } = rendered();

    expect(queryByTestId('overlay')).not.toBeNull();
    expect(queryByTestId('closeButton')).not.toBeNull();
    expect(queryByText('children')).not.toBeNull();
  });

  it('Overlay와 CloseButton을 누르면 hide 리스너가 발생한다', async () => {
    const { getByTestId, container } = rendered();

    await act(async () => {
      await fireEvent.press(getByTestId('overlay'));
      await fireEvent.press(getByTestId('closeButton'));
    });

    expect(() => container.findByProps({ visible: false })).not.toThrow();
  });
});
