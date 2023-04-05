import { Configuration, OpenAIApi } from 'openai';

import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';

import { useState } from 'react';

const App = () => {
	const configuration = new Configuration({
		apiKey: 'Your API Key',
	});

	const openai = new OpenAIApi(configuration);

	const [storedValues, setStoredValues] = useState([]);

	const generateResponse = async (newQuestion, setNewQuestion) => {
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stop: ['/'],
		};
		

		let completeOptions = {
			...options,
			prompt: newQuestion,
		};

		const response = await openai.createCompletion(completeOptions);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					answer: response.data.choices[0].text,
				},
				...storedValues,
			]);
			setNewQuestion('');
		}
	};

	return (
		<div>
			<div className="header-section">
				<h1>ChatGPT CLONE</h1>
			</div>
			<FormSection generateResponse={generateResponse} />
			{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
		</div>
	);
};

export default App;
