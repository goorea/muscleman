import { render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import CopyModal from '@src/components/CopyModal';
import { wrapper } from '@tests/functions';

describe('CopyModal 컴포넌트', () => {
  const selectedDate = dayjs().format('YYYY-MM-DD');
  const rendered = () =>
    render(<CopyModal selectedDate={selectedDate} />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { queryByTestId, queryByText } = rendered();

    expect(queryByTestId('closeButton')).not.toBeNull();

    expect(
      queryByText(`${dayjs(selectedDate).format('MMMM D일')} 운동 복사하기`),
    ).not.toBeNull();
    expect(queryByText('복사하기')).not.toBeNull();
  });
});
