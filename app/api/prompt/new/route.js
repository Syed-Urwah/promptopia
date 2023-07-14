import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) =>{

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: req.json().userId,
            text,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create Prompt", {status: 500});
    }
}