import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) =>{

    try {
        await connectToDB();

        const {userId, text, tag} = await req.json();

        const newPrompt = new Prompt({
            creator: userId,
            text: text,
            tag: tag
        })

        await newPrompt.save();

        return new NextResponse(JSON.stringify(newPrompt), {status: 200})
    } catch (error) {
        return new NextResponse("Failed to create Prompt", {status: 500});
    }
}