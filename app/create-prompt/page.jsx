"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {

    //hooks
    const {data: session} = useSession();
    const router = useRouter();

    //states
    const [prompt, setPrompt] = useState("");
    const [tag, setTag] = useState("");



    const createPrompt = async (e) => {
        e.preventDefault();
        console.log("sdad")

        // const res = await axios.post("http://localhost:3000/api/create-prompt/new", {
        //     creator: session?.user.id,
        //     prompt: "my prompt",
        //     tag: "my tag"
        // });

        const res = await fetch("/api/prompt/new",{
            method: "POST",
            body: JSON.stringify({
              text: prompt,
              userId: session?.user.id,
              tag: tag,
            }),
          })
 
        console.log(res);
        
        res.ok && router.push('/')
    }

    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>Create Post</span>
            </h1>
            <p className='desc text-left max-w-md'>
                Create and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform
            </p>

            <form
                onSubmit={createPrompt}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your AI Prompt
                    </span>

                    <textarea
                        value={prompt}
                        onChange={(e)=> setPrompt(e.target.value)}
                        placeholder='Write your post here'
                        required
                        className='form_textarea '
                    />
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Field of Prompt{" "}
                        <span className='font-normal'>
                            (#product, #webdevelopment, #idea, etc.)
                        </span>
                    </span>
                    <input
                        value={tag}
                        onChange={(e)=>setTag(e.target.value)}
                        type='text'
                        placeholder='#Tag'
                        required
                        className='form_input'
                    />
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/' className='text-gray-500 text-sm'>
                        Cancel
                    </Link>

                    <button
                        type='submit'
                        // disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                    >
                        Create
                    </button>
                </div>
            </form>
        </section>
    )
}
