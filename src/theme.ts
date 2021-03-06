import { StyleSheet } from 'react-native';

import {
  AccentColors,
  CommonColors,
  SocialColors,
  Theme,
} from '@src/types/theme';

export const fonts = {
  thin: 'SpoqaHanSansNeo-Thin',
  normal: 'SpoqaHanSansNeo-Regular',
  bold: 'SpoqaHanSansNeo-Bold',
};

const commonColors: CommonColors = {
  white: '#ffffff',
  black: '#000000',
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  greyOutline: '#bbb',
  disabled: 'hsl(208, 8%, 90%)',
  divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  foreground: '#000000',
  background: '#ffffff',
};

const accentColors: AccentColors = {
  primary: '#2687ED',
  secondary: '#ca71eb',
  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
};

const socialColors: SocialColors = {
  kakao: '#fee500',
  naver: '#1ec800',
  google: '#dd4b39',
  facebook: '#3b5999',
  apple: '#000',
};

const theme: Theme = {
  light: {
    ...commonColors,
    ...accentColors,
    ...socialColors,
  },
  dark: {
    ...commonColors,
    ...accentColors,
    ...socialColors,
    foreground: commonColors.background,
    background: commonColors.foreground,
  },
};

export default theme;
