import { Router } from "express";
import Path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

async function getOpenAIResponse(prompt) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 400,
        });
        return response.data.choices[0].text;
    } catch (e) {
        console.log("Error:", e);
        return null;
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const route = Router();

//paths
const pathWeb = Path.join(__dirname, "../web");
const indexFilePath = Path.join(pathWeb, "index.html");

route.post("/api/gpt/", (req, res) => {
    let datos = req.body;
    (async () => {
        const prompt = `${datos.message}`;
        const response = await getOpenAIResponse(prompt);
        if (response) {
            res.json({
                response: response,
            });
        } else {
            res.json({
                response:
                    "Parece que has logrado el limite de preguntas, intenta en un momento.",
            });
        }
    })();
});
//routes
route.get("/", (req, res) => {
    res.sendFile(indexFilePath);
});
export default route;
