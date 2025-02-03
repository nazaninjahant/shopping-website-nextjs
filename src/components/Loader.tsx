'use client'
import React from 'react'

export default function Loader() {
    return (
        <div className='bg-black/70 h-screen w-full text-white inset-0 fixed flex items-center justify-center'>
            <div className='w-5 h-5 border-t-transparent rounded-full border-white animate-spin border-solid'></div>
            <h2 className='ml-4 italic'>Loading ...</h2>
        </div>
    )
}
