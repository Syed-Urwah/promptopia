"use client"

import Loader from '@components/Loader';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

  const { id } = useParams();

  const [prompt, setPrompt] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPrompt = async () => {
    setLoading(true);
    const response = await fetch(`/api/prompt/${id}`);
    const data = await response.json();
    setPrompt(data);
    console.log(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchPrompt();
    console.log(id);
  }, [])

  return (
    <div className='container'>
      {loading ?
        <Loader /> :
        <>
          <h2>{ prompt.text }</h2>
          <p>{prompt.tag}</p>
        </>}
    </div>
  )
}
