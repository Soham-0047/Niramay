
import { GoogleGenerativeAI } from "@google/generative-ai";

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const prompt = `
  
  I want to update this code:



  const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
exports.chatbotController = async (req, res) => {
    try {
      const { text } = req.body;
      const { data } = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Answer question similar to how yoda from star war would",
        max_tokens: 300,
        temperature: 0.7,
      });
      if (data) {
        if (data.choices[0].text) {
          return res.status(200).json(data.choices[0].text);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        message: err.message,
      });
    }
  };




  And I want to use Google gemini api(your api) here.
  Accordingly update above code, hoe use that gemini API here.

  Refernce code:

  import { GoogleGenerativeAI } from "@google/generative-ai";

 async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const prompt ="Some query"

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();


  `

  // Use dynamic import for node-fetch
//   const { default: fetch } = await import("node-fetch");

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();