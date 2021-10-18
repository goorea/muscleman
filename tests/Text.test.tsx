import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import Text, { TextProps } from '@src/components/Text';
import ThemeProvider from '@src/contexts/ThemeProvider';

describe('Text 컴포넌트', () => {
  const rendered = (props?: TextProps) =>
    render(
      <ThemeProvider>
        <Text {...props} />
      </ThemeProvider>,
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('weight, size, color, style, ellipsis props를 가지고 있다', () => {
    const { container } = rendered({
      weight: 'bold',
      size: 20,
      color: 'primary',
      style: {
        marginTop: 10,
      },
      ellipsis: true,
    });

    expect(container.props.children.props).toHaveProperty('weight');
    expect(container.props.children.props).toHaveProperty('size');
    expect(container.props.children.props).toHaveProperty('color');
    expect(container.props.children.props).toHaveProperty('style');
    expect(container.props.children.props).toHaveProperty('ellipsis');
  });
});
