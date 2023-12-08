import { getServerSession } from 'next-auth'
import SessionProvider from '../components/SessionProvider'
import SideBar from '../components/SideBar'
import ClientProvider from '../components/ClientProvider'
import Login from '../components/Login'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import './globals.css'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  return (
    <html>
      <title>ChatGPT-Cloned</title>
      <body>
        <SessionProvider session={session}>
          {session ? (
            <div className="grid-main-page-real-estate">
              <div className="bg-[#202123] max-w-xs overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              <div className="bg-[#343541]">
                <ClientProvider />
                {children}
              </div>
            </div>
          ) : (
            <Login />
          )}
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
