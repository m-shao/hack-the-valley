import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { disconnect } from "mongoose";

const llm = new OpenAI({
  openAIApiKey: "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", 
  temperature: 0, 
}); 
const prompt = new PromptTemplate({
  inputVariables: ["code"],
  template: "Please rate this code '{code}' out of 10 in terms of quality. Example Answer: 1/10. I gave this rating because..."
})

const chain = new LLMChain({
  llm: llm, 
  prompt: prompt,
})

const output = await chain.call({
  code: "const json = { key: value };",
})

const ratingValue = output.text.split(', ')[0];
console.log(ratingValue[2])
const comments = ratingValue.substring(8)
console.log(comments)