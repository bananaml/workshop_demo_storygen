import logo from './logo.svg';
import './App.css';
import StoryPage from './components/StoryPage.js';
import React, { useState, useEffect } from 'react';
const banana = require('@banana-dev/banana-dev');

function App() {
    const [prompt, setPrompt] = useState("");
    const [images, setImages] = useState([]);
    console.log(prompt)

    useEffect(() => {
      // update image list on page
    },[]);

    const summarize = async (prompt) => {
      const { Configuration, OpenAIApi } = require("openai");

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Summarize this in one sentence\n\n" + prompt + "\n",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    }


    const generateImage = async () => {
      //call banana
      const summary = summarize(prompt)
      console.log(summary)
      const promptModded = "A clear, high quality photo showing that " + summary + "highly detailed, cinematic lighting, digital art"
      const out = await banana.run("48e6f984-4f85-4b8a-a2aa-6ade981c129e", "cee3a79a-7983-4f39-9974-9fce016fc809", {"prompt": prompt})
      setImages([...images, {"text": promptModded, "image": out.modelOutputs[0].image_base64}]);
    }

    return (
      <div>
          <input type="text" name="prompt" onChange={(e) => {setPrompt(e.target.value)}} />
          <button onClick={() => {generateImage(prompt)}}>
            Generate story page
          </button>
        {images.map((img) => { return (<p>{img['text']}<img src={"data:image/png;base64," + img['image']} /></p>)
        })}
      </div>
    );
}

export default App;
