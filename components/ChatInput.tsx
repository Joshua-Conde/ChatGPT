'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { database } from '../firebase'

type ChatInputProps = {
  chatId: string
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [prompt, setPrompt] = useState('')
  const { data: session } = useSession()

  const model = 'text-davinci-003'

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (!prompt) {
      return
    }

    const input = prompt?.trim()

    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    }

    await addDoc(
      collection(
        database,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages',
      ),
      message,
    )

    const notification = toast?.loading('ChatGPT is thinking...')

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON?.stringify({
        prompt: input,
        chatId,
        session,
        model,
      }),
    })?.then(() => {
      toast?.success('ChatGPT has responded', { id: notification })
    })
  }

  return (
    <div className="grid content-center bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form
        onSubmit={(event) => sendMessage(event)}
        className="grid-chat-input-real-estate p-5 space-x-5"
      >
        <input
          className="bg-transparent focus:outline-none disabled:text-gray-300 disabled:cursor-not-allowed"
          disabled={!session}
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(event) => setPrompt(event?.target?.value)}
        />
        <button
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!session || !prompt}
          type="submit"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  )
}
export default ChatInput
