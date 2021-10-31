import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  UseFormStateReturn,
} from 'react-hook-form';
import React from 'react';

export type RenderProps<
  TFieldValues,
  TName extends FieldPath<TFieldValues>,
> = (props: {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}) => React.ReactElement;
