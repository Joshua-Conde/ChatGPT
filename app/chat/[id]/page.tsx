import Chat from '../../../components/Chat'
import ChatInput from '../../../components/ChatInput'

type ChatPageProps = {
  params: {
    id: string
  }
}
const ChatPage = ({ params: { id } }: ChatPageProps) => (
  <div className="grid-chat-and-chat-input h-screen overflow-hidden">
    <Chat chatId={id} />
    <ChatInput chatId={id} />
  </div>
)

export default ChatPage
