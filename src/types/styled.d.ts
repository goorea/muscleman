import 'styled-components';
import { Colors } from '@src/types/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {}
}
