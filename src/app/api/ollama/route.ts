import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, fileContent } = await req.json();
    const newPrompt = `File attached:
    ${fileContent}
    Answer the following prompt based on the file attached above:
    ${prompt}
    Answer the prompt directly if no file is attached.
    `
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        prompt: newPrompt,
        model: "llama3",
        stream: false,
      }),
    });
    const {response} = await res.json();
    return Response.json({response}, {status: 201});
  } catch (error) {
    console.error("Error processing the data:", error)
    return Response.json({error: "Failed to process the data"}, {status: 400});
  }
}