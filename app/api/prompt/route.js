import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        connectToDB();

        const prompts = await Prompt.find();

        return new NextResponse(JSON.stringify(prompts), {status: 200});

    } catch (error) {
        return new NextResponse(error, {status: 500});
    }
}