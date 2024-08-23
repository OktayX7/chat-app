import styled, { createGlobalStyle } from 'styled-components';
import {colors} from "../../util/colors.ts";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const ChatContainer = styled.div<{ themeMode: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: auto;
  overflow: hidden;
  background-color: ${({ themeMode }) => colors[themeMode].background};
  color: ${({ themeMode }) => colors[themeMode].text};
`;

export const Messages = styled.div<{ themeMode: 'light' | 'dark' }>`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: ${({ themeMode }) => colors[themeMode].suggestionsBackground};
`;

export const Message = styled.div<{ themeMode: 'light' | 'dark' }>`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ themeMode }) => colors[themeMode].messageBackground};
`;

export const MessageImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px 0;
`;

export const InputForm = styled.form<{ themeMode: 'light' | 'dark' }>`
  position: relative;
  display: flex;
  padding: 10px;
  background-color: ${({ themeMode }) => colors[themeMode].inputBackground};
  border-top: 1px solid ${colors.light.borderColor};
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${colors.light.borderColor};
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px;
  margin-left: 10px;
  border: none;
  background-color: ${colors.light.buttonBackground};
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.light.buttonHoverBackground};
  }
`;

export const ComboBox = styled.div`
  margin: 10px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.light.borderColor};
  border-radius: 4px;
`;

export const Suggestions = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  background-color: ${colors.light.suggestionsBackground};
  border: 1px solid ${colors.light.borderColor};
  border-radius: 4px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Suggestion = styled.div`
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;
  border-right: 1px solid ${colors.light.borderColor};

  &:hover {
    background-color: ${colors.light.suggestionsHoverBackground};
  }
`;

export const ThemeToggle = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
  padding: 10px;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 0.5);
`;
