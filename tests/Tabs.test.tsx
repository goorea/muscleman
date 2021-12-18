import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Tab from '@src/components/Tab';
import Tabs from '@src/components/Tabs';
import Text from '@src/components/Text';
import { wrapper } from '@tests/functions';

describe('Tabs 컴포넌트', () => {
  const items = [...Array(3).keys()].map(i => ({
    title: `Item ${i}`,
    contents: `Contents ${i}`,
  }));
  const rendered = () =>
    render(
      <Tabs>
        {items.map((item, index) => (
          <Tab key={index} title={item.title} active={index === 0}>
            <Text>{item.contents}</Text>
          </Tab>
        ))}
      </Tabs>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('탭을 누르면 컨텐츠가 변경된다', async () => {
    const { queryByText, getByText } = rendered();

    expect(queryByText('Contents 0')).not.toBeNull();
    expect(queryByText('Contents 1')).toBeNull();

    await act(async () => fireEvent.press(getByText('Item 1')));

    expect(queryByText('Contents 0')).toBeNull();
    expect(queryByText('Contents 1')).not.toBeNull();
  });
});
