import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_KEY_OPENAI,
});

export async function POST(request: Request) {
  const data = await request.json();

  let imageURL!: string;
  let imageFileName!: string;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `
      NFT Card with two section. 
      First section have black background and white font with Title: Question and text: ${data.question}. 
      Second section have white background and black font with Title: Answer and text: ${data.answer}.
      Use only the text that is specified.
      `,
      n: 1,
      size: "1024x1024",
    });

    imageURL = response?.data[0]?.url || '';

    const urlObject = new URL(imageURL);
    const pathArray = urlObject.pathname.split("/");

    imageFileName = pathArray[pathArray.length - 1];

  } catch (error) {
    console.log("ERR", error);
  }

  return NextResponse.json({
    nftURL: imageURL,
    fileName: imageFileName,
  });
}
