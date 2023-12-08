'use client'

import { signOut, useSession } from 'next-auth/react'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { database } from '../firebase'
import ChatRow from './ChatRow'
import NewChat from './NewChat'
import ModelSelection from './ModelSelection'

const SideBar = () => {
  const { data: session } = useSession()
  const [chats] = useCollection(
    session &&
      query(
        collection(database, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc'),
      ),
  )

  return (
    <div className="grid-side-bar-real-estate p-2 h-screen bg-[#202123]">
      <div className="overflow-y-auto">
        <NewChat />
        <ModelSelection />
        <div className="space-y-2 my-2">
          {chats?.docs?.map((chat) => <ChatRow key={chat?.id} id={chat?.id} />)}
        </div>
      </div>
      <div className="sticky self-end justify-self-center w-full">
        {session && (
          <img
            onClick={() => signOut()}
            src={session?.user?.image!}
            alt="Profile picture"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto bg-2 hover:opacity-50 mb-1.5"
          />
        )}
      </div>
    </div>
  )
}

export default SideBar
