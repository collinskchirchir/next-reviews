'use client';

import { LinkIcon } from '@heroicons/react/20/solid'

import { useState } from "react";

export default function ShareLinkButton() {
   const [clicked, setClicked] = useState(false)
   const handleClick = () => {
      // copy url link to clipboard
      navigator.clipboard.writeText(window.location.href);
      setClicked(true);
      setTimeout(() => setClicked(false), 1500)
   }
   return (
      <button
         onClick={handleClick}
         className="border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm
            hover:bg-orange-100 hover:text-slate-700 hover:cursor-pointer"
      >
         <LinkIcon className='h-4 w-4' />
         {clicked ? 'Link Copied': 'Share Link'}
      </button>
   )
}