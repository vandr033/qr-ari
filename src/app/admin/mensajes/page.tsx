'use client'
import React, { useState, useEffect } from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { FaCamera, FaCommentDots } from 'react-icons/fa'
import Image from 'next/image'
import backgroundText from '../../../public/assets/images/BackgroundText.png'
import MensajeComponent from '@/components/MensajeComponent'
import { createBrowserClient } from '@/utils/supabase'

const validUsers = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more valid username/password combinations here
]

const VerMensajes = () => {
  const [mensajes, setMensajes] = useState<any[] | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('mensajes').select()
      setMensajes(data)
    }
    getData()
  }, [])

  const handleGoBack = () => {
    window.location.href = '/admin'
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

      <div className="relative z-10 mx-12 my-12 h-screen w-[90%] overflow-scroll rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-4/5">
        {mensajes && mensajes.length > 0 ? (
          mensajes.map((mensaje, index) => (
            <MensajeComponent key={index} index={index} mensaje={mensaje} />
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-lg font-bold text-black">
              Todavía no hay mensajes!
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleGoBack}
        className="absolute left-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#1b4850] text-white shadow-lg hover:bg-[#163a3e] focus:outline-none"
      >
        <RiArrowGoBackLine size={24} />
      </button>
    </div>
  )
}

export default VerMensajes
