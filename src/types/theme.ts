export interface CommonColors {
  readonly black: string;
  readonly white: string;
  readonly grey0: string;
  readonly grey1: string;
  readonly grey2: string;
  readonly grey3: string;
  readonly grey4: string;
  readonly grey5: string;
  readonly greyOutline: string;
  readonly disabled: string;
  readonly divider: string;
  readonly foreground: string;
  readonly background: string;
}

export interface AccentColors {
  readonly primary: string;
  readonly secondary: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
}

export interface SocialColors {
  readonly kakao: string;
  readonly naver: string;
  readonly google: string;
  readonly facebook: string;
  readonly apple: string;
}

export interface Colors extends CommonColors, AccentColors, SocialColors {}

export type Theme = {
  light: Colors;
  dark: Colors;
};

export interface ThemeContextState {
  dark: boolean;
  toggleTheme: () => void;
  colors: Colors;
}
