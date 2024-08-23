import { useState, useCallback } from 'react';
import { getChatGPTResponse } from '../api/chatgpt';

interface Message {
	id: number;
	text: string;
	sender: 'user' | 'bot';
}

export const useChatMessages = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const addMessage = useCallback((message: Message) => {
		setMessages(prevMessages => [...prevMessages, message]);
	}, []);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	const addBotResponse = useCallback(async (userMessage: string) => {
		const botMessage: Message = {
			id: Date.now(),
			text: await getChatGPTResponse(userMessage),
			sender: 'bot'
		};
		setMessages(prevMessages => [...prevMessages, botMessage]);
	}, []);

	return { messages, addMessage, clearMessages, addBotResponse };
};
