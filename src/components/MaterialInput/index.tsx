import React, { useState } from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import Text from '@src/components/Text';
import useAnimation from './hooks/useAnimation';
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
  const [active, setActive] = useState<boolean>(false);
  const [labelLayout, setLabelLayout] = useState<
    Pick<LayoutRectangle, 'width' | 'height'>
  >({
    width: 0,
    height: 0,
  });
  const onLabelLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setLabelLayout(nativeEvent.layout);
  };
  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) {
      props.onFocus(event);
    }

    setActive(true);
  };
  const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onBlur) {
      props.onBlur(event);
    }

    if (!props.value) {
      setActive(false);
    }
  };

  const { translateX, translateY, scale } = useAnimation(active, labelLayout);

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
