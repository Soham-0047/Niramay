// import dotenv from "dotenv"
// import { GoogleGenerativeAI } from "@google/generative-ai";


// dotenv.config()


// export const chatbotController = async (req, res) => {
//   try {
//     const { text } = req.body;

//     // Create a new instance of GoogleGenerativeAI with your API key
//     const genAI = new GoogleGenerativeAI('YOUR_GOOGLE_GENERATIVE_API_KEY');

//     // Get the generative model (in this case, 'gemini-pro')
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // Specify your prompt (use the provided text from the request body)
//     const prompt = text;

//     // Generate content using the generative model
//     const result = await model.generateContent(prompt);

//     // Extract the generated text from the response
//     const response = await result.response;
//     const generatedText = response.text();

//     // Return the generated text in the response
//     return res.status(200).json({ generatedText });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };
