// components/Login.js
'use client'
import React, { useState } from 'react'

const validUsers = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'admin', password: 'admin' },
  // Add more valid username/password combinations here
]

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const user = validUsers.find(
      (user) => user.username === username && user.password === password,
    )
    if (user) {
      setError('')
      window.location.href = '/admin'
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-gray-100 to-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 150"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <pattern
              id="pattern"
              patternUnits="userSpaceOnUse"
              width="25"
              height="25"
            >
              <image
                href="/assets/images/backgroundPattern.svg"
                x="0"
                y="0"
                width="25"
                height="25"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-12 w-[90%] rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre de Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
