import React, { useState } from 'react';
import { LayoutRectangle, TextInput, TextInputProps } from 'react-native';

import Text from '@src/components/Text';

import useAnimation from './hooks/useAnimation';
import useFromPicker from './hooks/useFromPicker';
import useListeners from './hooks/useListeners';
import { Container, Label, Wrapper, Input } from './styled';

type P = TextInputProps & {
  onChange: (text: string) => void;
  label: string;
  error?: string;
};

const MaterialInput: React.ForwardRefRenderFunction<TextInput, P> = (
  props,
  ref,
) => {
  const [active, setActive] = useState<boolean>(!!props.value);
  const [labelLayout, setLabelLayout] = useState<
    Pick<LayoutRectangle, 'width' | 'height'>
  >({
    width: 0,
    height: 16,
  });

  const { onLabelLayout, onFocus, onBlur } = useListeners(
    setLabelLayout,
    setActive,
    props.value,
    props.onFocus,
    props.onBlur,
  );
  const { translateX, translateY, scale } = useAnimation(active, labelLayout);
  useFromPicker(active, setActive, props.value);

  return (
    <Container>
      <Wrapper>
        <Label
          onLayout={onLabelLayout}
          color={active ? 'grey3' : 'foreground'}
          style={{ transform: [{ translateX }, { translateY }, { scale }] }}>
          {props.label}
        </Label>
        <Input
          ref={ref}
          {...props}
          onChangeText={props.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Wrapper>
      {!!props.error && (
        <Text size={12} color="error">
          {props.error}
        </Text>
      )}
    </Container>
  );
};

export default React.forwardRef(MaterialInput);
