import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { adminDatabase } from '../../firebaseAdmin'
import query from '../../lib/queryApi'

const askQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, chatId, model, session } = req?.body

  if (!prompt) {
    res?.status(400)?.json({ error: 'Please provide a prompt!' })
    return
  }

  if (!chatId) {
    res?.status(400)?.json({ error: 'Please provide a valid chat ID!' })
    return
  }

  const response = await query(prompt, model)

  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer for that!',
    createdAt: admin?.firestore?.Timestamp?.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  }

  await adminDatabase
    ?.collection('users')
    ?.doc(session?.user?.email!)
    ?.collection('chats')
    ?.doc(chatId)
    ?.collection('messages')
    ?.add(message)

  res?.status(200)?.json({ error: message?.text })
}

export default askQuestion
