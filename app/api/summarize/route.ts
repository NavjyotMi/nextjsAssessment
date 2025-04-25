import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);

export async function POST(req: Request) {
  try {
    console.log("POST request received at /api/summarize");
    let { text } = await req.json();
    // console.log("Request body:", req.body);
    // console.log("Prompt received:", text);

    const prompt = `Summarize the following text in 2-3 lines: ${text}`;
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    text = response.text();
    console.log("Response from Gemini:", text);

    return NextResponse.json({ text });
    // return NextResponse.json({ text: "This is a test response" });
  } catch (err) {
    console.error("[GEMINI ERROR]", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
