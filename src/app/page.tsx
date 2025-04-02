"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const updatePrompt = (e) => {
    setPrompt(e.target.value);
  }

  const sendPrompt = async () => {
    setIsLoading(true);
    const request = {
      prompt,
      fileContent,
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

  const uploadFile = async (e) => {
    const file: Blob = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    if (file.type == "application/pdf") {
      const formData: FormData = new FormData();
      formData.append("pdf", file, file.name);
      let response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });
      response = await response.json();
      setFileContent(response.content);
      console.log(response.content);
    } else {
      const reader = new FileReader();
      reader.readAsText(file, 'utf-8');
      reader.onload = (event) => {
        setFileContent(event.target?.result);
        console.log(event.target?.result);
      }
    }
  }

  const clearFile = () => {
    setFileContent("");
    setFileName("");
  }
  
  return (
    <div className= "flex h-screen">
      <div className="max-w-3xl mx-auto flex flex-col gap-4 justify-center items-center">
        <h1 className = "text-3xl font-bold">Ollama Chat</h1>
        <div className="w-full inline-block">
          <label htmlFor="uploadFileBtn" className="btn btn-md font-normal">Upload</label>
          <input type = "file" id = "uploadFileBtn" className="hidden" onChange={uploadFile}></input>
          <div className="flex flex-row gap-2">
            <span>{fileName}</span>
            {fileName != "" && <button className = "link" onClick={clearFile}>Clear</button>}
          </div>
        </div>
        <textarea className="textarea w-3xl" placeholder="Prompt goes here..." onChange= {updatePrompt}></textarea>
        <button className="btn btn-md font-normal" onClick={sendPrompt}>Generate</button>
        {isLoading && <span className="loading loading-spinner loading-xs"></span>}
        <p>{response}</p>
      </div>
    </div>
   
  );
}
