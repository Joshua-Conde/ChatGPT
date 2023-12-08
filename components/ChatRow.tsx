'use client'

import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { database } from '../firebase'

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from 'firebase/firestore'

type ChatRowProps = {
  id: string
}

const ChatRow = ({ id }: ChatRowProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [active, setActive] = useState(false)

  const [messages] = useCollection(
    collection(
      database,
      'users',
      session?.user?.email!,
      'chats',
      id,
      'messages',
    ),
  )

  useEffect(() => {
    if (!pathname) {
      return
    }

    setActive(pathname?.includes(id))
  }, [pathname])

  const removeChat = async () => {
    const chatRef = doc(database, 'users', session?.user?.email!, 'chats', id)
    const messagesRef = collection(chatRef, 'messages')

    const messagesSnapshot = await getDocs(messagesRef)
    const batch = writeBatch(database)

    messagesSnapshot?.forEach((doc) => {
      batch?.delete(doc?.ref)
    })

    await batch?.commit()

    await deleteDoc(chatRef)

    router?.replace('/')
  }

  return (
    <Link
      href={`/chat/${id}`}
      className={`rounded-lg px-5 py-3 grid grid-cols-2 gap-3 md:grid-chat-row-real-estate hover:bg-gray-700/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out ${
        active && 'bg-gray-700/50'
      }`}
    >
      <div className="justify-self-end md:justify-self-start">
        <ChatBubbleLeftIcon className="h-5 w-5" />
      </div>
      <p className="hidden md:block col-span-1 truncate">
        {messages?.docs[messages?.docs?.length - 1]?.data()?.text || 'New Chat'}
      </p>
      <div className="md:justify-self-end md:col-start-3 md:col-end-4">
        <TrashIcon
          onClick={() => removeChat()}
          className="h-5 w-5 text-gray-700 hover:text-red-700"
        />
      </div>
    </Link>
  )
}

export default ChatRow
