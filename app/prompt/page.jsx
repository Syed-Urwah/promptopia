"use client"

import Feed from '@components/Feed'
import Loader from '@components/Loader';
import React, { useEffect, useState } from 'react'

export default function page() {

  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPrompt = async () => {
    setLoading(true);
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPrompts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPrompt()
  }, [])

  return (
    <>

      <div className="h-screen w-screen flex justify-center gap-4 items-center">
        {loading ?
          <Loader />
          : prompts.map((e) => {
            return <Feed key={e._id} prompt={e}/>
          })
        }
      </div>


    </>

  )
}
