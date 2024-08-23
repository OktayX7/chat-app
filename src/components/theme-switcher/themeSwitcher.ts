import { colors } from "../../util/colors.ts";
import styled from "styled-components";

const switcherStyles = {
  light: {
    background: colors.light.buttonBackground,
    handleBackground: colors.light.background,
  },
  dark: {
    background: colors.dark.buttonBackground,
    handleBackground: colors.dark.background,
  },
};

export const Switch = styled.label<{ themeMode: 'light' | 'dark' }>`
  position: relative;
  width: 60px;
  height: 34px;
  background-color: ${({ themeMode }) => switcherStyles[themeMode].background};
  border-radius: 34px;
  cursor: pointer;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span {
    transform: translateX(26px);
  }
`;

export const Slider = styled.span<{ themeMode: 'light' | 'dark' }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 30px;
  height: 30px;
  background-color: ${({ themeMode }) => switcherStyles[themeMode].handleBackground};
  border-radius: 50%;
  transition: 0.4s;
`;
