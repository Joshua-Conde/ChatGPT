'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = () => (
  <div className="bg-[#11A37F] grid place-content-center h-screen">
    <Image
      src={'https://links.papareact.com/2i6'}
      alt="logo"
      width={300}
      height={300}
    />
    <button
      onClick={() => signIn('google')}
      className="
      text-white
      text-3xl
      font-bold
      animate-pulse"
    >
      Sign In to use ChatGPT
    </button>
  </div>
)

export default Login
