import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts"
import { LLMChain } from "langchain/chains";

const llm = new OpenAI({
   openAIApiKey: "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", 
   temperature: 0.1,
});

//Connecting with ChatGPT to get the rating and the comments
const template =
 "Please rate this code '{code}' out of 10 in terms of quality."
 const prompt = new PromptTemplate ({
  template: template,
  inputVariables: ["code"]
 })

const chain = new LLMChain({
  llm: llm, 
  prompt: prompt,
})

//Producing an answer from ChatGPT 
const output = await chain.call({
  code: 'while True: pass ',
})

console.log(output);

