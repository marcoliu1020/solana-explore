'use client'

import { useState } from 'react'
import { Copy, CheckIcon } from 'lucide-react'

export default function CopyClipboard({ text }: { text: string }) {
  const [hasCopy, setHasCopy] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setHasCopy(true)
    setTimeout(() => setHasCopy(false), 2000) // Reset after 2 seconds
  }

  return (
    <button onClick={handleCopy} className="cursor-pointer">
      <Copy className={`size-5 ${hasCopy ? 'hidden' : 'block'}`} />
      <CheckIcon
        className={`size-5 ${hasCopy ? 'block text-green-500' : 'hidden'}`}
      />
    </button>
  )
}
