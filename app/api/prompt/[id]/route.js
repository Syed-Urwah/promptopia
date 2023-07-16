import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {

    try {

        connectToDB();


        const prompt = await Prompt.findById(params.id);
        return new NextResponse(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new NextResponse(error, {status: 500});
    }


}