import { FullTheme } from 'react-native-elements';
import { StyleProp, TextStyle } from 'react-native';

export const fonts = {
  thin: 'SpoqaHanSansNeo-Thin',
  normal: 'SpoqaHanSansNeo-Regular',
  bold: 'SpoqaHanSansNeo-Bold',
};

export const defaultFontStyles: StyleProp<TextStyle> = {
  fontFamily: fonts.normal,
};

const theme: Partial<FullTheme> = {
  Text: {
    style: defaultFontStyles,
  },
  Badge: {
    textStyle: defaultFontStyles,
  },
  Button: {
    titleStyle: defaultFontStyles,
    disabledTitleStyle: defaultFontStyles,
  },
  Input: {
    disabledInputStyle: defaultFontStyles,
    inputStyle: defaultFontStyles,
    errorStyle: defaultFontStyles,
    labelStyle: defaultFontStyles,
  },
  PricingCard: {
    titleStyle: defaultFontStyles,
    pricingStyle: defaultFontStyles,
    infoStyle: defaultFontStyles,
  },
  SearchBar: {
    inputStyle: defaultFontStyles,
  },
  SocialIcon: {
    fontStyle: defaultFontStyles,
  },
  Tile: {
    titleStyle: defaultFontStyles,
    captionStyle: defaultFontStyles,
  },
};

export default theme;
