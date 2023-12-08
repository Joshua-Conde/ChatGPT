'use client'

import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { database } from '../firebase'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import Message from './Message'

type ChatProps = {
  chatId: string
}

const Chat = ({ chatId }: ChatProps) => {
  const { data: session } = useSession()
  const [messages] = useCollection(
    session &&
      query(
        collection(
          database,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages',
        ),
        orderBy('createdAt', 'asc'),
      ),
  )

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      {messages?.empty && (
        <>
          <p className="mt-10 text-white text-center">
            {' '}
            Type in a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs?.map((message) => (
        <Message key={message?.id} message={message?.data()} />
      ))}
    </div>
  )
}

export default Chat
