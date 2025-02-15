'use client'
import React from 'react'

export default function Loader() {
    return (
        <div className='bg-white h-screen w-full text-primary inset-0 fixed flex items-center justify-center z-50'>
            <div className='w-5 h-5 border-t-transparent rounded-full border-primary animate-spin border-solid'></div>
            <h2 className='ml-4 italic'>Loading ...</h2>
        </div>
    )
}
