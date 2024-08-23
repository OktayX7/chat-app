import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/completions';
const API_KEY = 'REACT_APP_OPENAI_API_KEY'; // Set your OpenAI API key here

if (!API_KEY) {
  throw new Error('API key is missing. Please set REACT_APP_OPENAI_API_KEY in your .env file.');
}

export const getChatGPTResponse = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo', // Use a supported model
        prompt: message,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching ChatGPT response:', error.message);
      return error.message;
    } else {
      console.error('Unexpected error:', error);
      return 'Sorry, I am unable to respond at the moment.';
    }
  }
};
