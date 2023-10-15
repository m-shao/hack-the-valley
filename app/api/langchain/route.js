import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { disconnect } from 'mongoose';

export async function GET(req) {
	let searchURL = new URL(req.url);
	let searchParams = searchURL.searchParams;
	const file = searchParams.get('file');

	try {
		const llm = new OpenAI({
			openAIApiKey: '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',
			temperature: 0,
		});
		const prompt = new PromptTemplate({
			inputVariables: ['code'],
			template:
				"Please rate this code '{code}' out of 10 in terms of quality. Example Answer: 1/10. I gave this rating because...",
		});

		const chain = new LLMChain({
			llm: llm,
			prompt: prompt,
		});

		const output = await chain.call({
			code: file,
		});

		const ratingValue = output.text.split(', ')[0];
		console.log(ratingValue[2]);
		const comments = ratingValue.substring(8);
		console.log(comments);

		if (comments && ratingValue) {
			return Response.json(
				{ rating: ratingValue[2], comments: comments },
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
