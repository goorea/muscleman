import { css } from 'styled-components/native';

export const flexFill = css`
  flex: 1;
`;

export const flexCenter = css`
  align-items: center;
  justify-content: center;
`;

export const flexFillCenter = css`
  ${flexFill}
  ${flexCenter}
`;
