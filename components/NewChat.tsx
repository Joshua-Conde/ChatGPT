'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { database } from '../firebase'

const NewChat = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const createNewChat = async () => {
    const document = await addDoc(
      collection(database, 'users', session?.user?.email!, 'chats'),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      },
    )
    router?.push(`/chat/${document?.id}`)
  }

  return (
    <div
      onClick={() => createNewChat()}
      className="grid-new-chat-real-estate border border-gray-700 chatRow"
    >
      <PlusIcon className="h-4 w-4 justify-self-end" />
      <p>New Chat</p>
    </div>
  )
}

export default NewChat
