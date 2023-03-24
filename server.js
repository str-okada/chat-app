const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3080;


// open ai
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-j0WGaD1mkube8Sv2HvAkgAYD",
  apiKey: process.env.APIKEY
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  })
  res.json({
    message: response.data.choices[0].text,
  })
})


app.listen( PORT, () => {
  console.log(`${PORT} // Start server`);
});



