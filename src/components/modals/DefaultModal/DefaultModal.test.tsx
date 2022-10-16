import { render } from '@testing-library/react-native';
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
});
