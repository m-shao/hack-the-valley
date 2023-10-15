import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { disconnect } from 'mongoose';

export async function GET(req) {
	let searchURL = new URL(req.url);
	let searchParams = searchURL.searchParams;
	const file = searchParams.get('file');

	try {
		console.log('a');
		const llm = new OpenAI({
			openAIApiKey: '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',
			temperature: 0,
		});
		console.log('b');
		const prompt = new PromptTemplate({
			inputVariables: ['code'],
			template:
				"Please rate this code '{code}' out of 10 in terms of quality and explain how could be changed or what is good. Answer Structure: 0/10. I gave this rating because... This code could be improved by... or This code is good because",
		});
		console.log('c');

		const chain = new LLMChain({
			llm: llm,
			prompt: prompt,
		});
		console.log('d');

		let output = await chain.call({
			code: file,
		});

		const ratingValue = output.text.split(', ')[0];
		console.log(ratingValue[2]);
		const comments = ratingValue.substring(8);
		console.log(comments);

		if (comments && ratingValue) {
			return Response.json(
				{ rating: 0, comments: output.text },
				{ status: 200 }
			);
		} else {
			return Response.json({ message: 'Data no there' }, { status: 404 });
		}
	} catch (error) {
		console.error(error);
		return Response.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
