"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updatePrompt = (e) => {
    setPrompt(e.target.value);
  }

  const sendPrompt = async () => {
    setIsLoading(true);
    const request = {
      prompt,
    };

    console.log("Sending the prompt");
    console.log(request);
    const res = await fetch("/api/ollama/", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const JSONres = await res.json();
    if (res.ok) {
      setResponse(JSONres.response);
    } else {
      setResponse(JSONres.error);
    }

    setIsLoading(false);
  }
  
  return (
    <div className= "flex h-screen">
      <div className="max-w-3xl mx-auto flex flex-col gap-4 justify-center items-center">
        <textarea className="textarea w-3xl" placeholder="Prompt goes here..." onChange= {updatePrompt}></textarea>
        <button className="btn btn-lg font-normal" onClick={sendPrompt}>Generate</button>
        {isLoading && <span className="loading loading-spinner loading-xs"></span>}
        <p>{response}</p>
      </div>
    </div>
   
  );
}
