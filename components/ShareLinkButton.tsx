'use client';

import { useState } from "react";

export default function ShareLinkButton() {
   const [clicked, setClicked] = useState(false)
   const handleClick = () => {
      // copy url link to clipboard
      navigator.clipboard.writeText(window.location.href);
      setClicked(true);
      setTimeout(() => setClicked(false), 1500)
   }
   console.log('[ShareLinkButton] clicked:', clicked)
   return (
      <button
         onClick={handleClick}
         className="border px-2 py-1 rounded text-slate-500 text-sm
            hover:bg-orange-100 hover:text-slate-700 hover:cursor-pointer"
      >
         {clicked ? 'Link Copied': 'Share Link'}
      </button>
   )
}