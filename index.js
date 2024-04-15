const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const geminiApiKey = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
function getQuestion() {
  return new Promise((resolve, reject) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Nhập câu hỏi: ', (input) => {
      rl.close();
      resolve(input);
    });
  });
}
async function generate() {
  try {
    const geminiModel = await googleAI.getGenerativeModel({
      model: "models/gemini-pro",
      geminiConfig,
    });
    const prompt = await getQuestion();
    console.log("");
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    console.log("-----Trả lời:", response.text());
    console.log("");
    console.log("");
    generate();
  } catch (error) {
    console.error(error);
  }
}
generate();
