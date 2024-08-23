import React, { useState, useEffect, useRef } from 'react';
import {
	GlobalStyle,
	ChatContainer,
	Messages,
	Message,
	MessageImage,
	InputForm,
	Input,
	Button,
	ComboBox,
	Select,
	Suggestions,
	Suggestion,
	ThemeToggle
} from './chatStyled.ts';
import { useChatMessages } from '../../hooks/useChatMessages';
import {options} from "../../util/constant.ts";
import ThemeSwitcher from "../theme-switcher/ThemeSwitcher.tsx";



const Chat: React.FC = () => {
	const { messages, addMessage, addBotResponse } = useChatMessages();
	const [input, setInput] = useState<string>('');
	const [showComboBox, setShowComboBox] = useState<boolean>(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const endOfMessagesRef = useRef<HTMLDivElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim()) {
			if (input.startsWith('/image')) {
				const parts = input.split(' ');
				const imageNumber = parts[1] ? parseInt(parts[1], 10) : 1;
				const imageUrl = `https://picsum.photos/200?random=${imageNumber}`;
				addMessage({ id: messages.length, text: imageUrl, sender: 'user' });
			} else if (input.startsWith('/select')) {
				setShowComboBox(true);
			} else {
				addMessage({ id: messages.length, text: input, sender: 'user' });
				addBotResponse(input);
			}
			setInput('');
		}
	};

	const handleOptionSelect = (option: string) => {
		addMessage({ id: messages.length, text: option, sender: 'user' });
		addBotResponse(option);
		setShowComboBox(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInput(value);

		if (value) {
			const filteredSuggestions = options.filter(option =>
				option.toLowerCase().includes(value.toLowerCase())
			);
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		setInput(suggestion);
		setSuggestions([]);
	};

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<ChatContainer themeMode={theme}>
			<GlobalStyle />
			<ThemeToggle>
				<ThemeSwitcher themeMode={theme} toggleTheme={toggleTheme} />
			</ThemeToggle>
			<Messages themeMode={theme}>
				{messages.map((msg, index) => (
					<div key={index}>
						{msg.text.startsWith('https://') ? (
							<MessageImage src={msg.text} alt="Random" />
						) : (
							<Message themeMode={theme}>{msg.text}</Message>
						)}
					</div>
				))}
				<div ref={endOfMessagesRef} />
			</Messages>
			{showComboBox && (
				<ComboBox>
					<Select onChange={(e) => handleOptionSelect(e.target.value)}>
						<option value="">Select an option...</option>
						{options.map((option, index) => (
							<option key={index} value={option}>{option}</option>
						))}
					</Select>
				</ComboBox>
			)}
			<InputForm onSubmit={handleSubmit} themeMode={theme}>
				<Input
					type="text"
					value={input}
					onChange={handleChange}
					placeholder="Type a message..."
				/>
				<Button type="submit">Send</Button>
				{suggestions.length > 0 && (
					<Suggestions>
						{suggestions.map((suggestion, index) => (
							<Suggestion
								key={index}
								onClick={() => handleSuggestionClick(suggestion)}
							>
								{suggestion}
							</Suggestion>
						))}
					</Suggestions>
				)}
			</InputForm>
		</ChatContainer>
	);
};

export default Chat;
