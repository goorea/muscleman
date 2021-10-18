import 'styled-components';
import { Colors } from 'react-native-elements/dist/config/colors';

declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

declare module 'styled-components' {
  export interface DefaultTheme extends RecursivePartial<Colors> {}
}
