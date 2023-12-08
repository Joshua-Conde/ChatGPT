import type { NextApiRequest, NextApiResponse } from 'next'
import openai from '../../lib/chatgpt'

type Option = {
  value: string
  label: string
}

type Data = {
  modelOptions: Option[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const models = await openai?.models?.list()?.then((res) => res?.data)

  const modelOptions = models.map((model) => ({
    label: model?.id,
    value: model?.id,
  }))

  res?.status(200)?.json({ modelOptions })
}

export default handler
