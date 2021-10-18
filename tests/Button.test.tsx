import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import ThemeProvider from '@src/contexts/ThemeProvider';
import Button, { ButtonProps } from '@src/components/Button';

describe('Button 컴포넌트', () => {
  const rendered = (props?: ButtonProps) =>
    render(
      <ThemeProvider>
        <Button title="버튼" {...props} />
      </ThemeProvider>,
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });
});
