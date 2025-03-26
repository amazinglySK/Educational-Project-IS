import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        prompt,
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