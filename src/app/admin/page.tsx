// components/Dashboard.js
'use client'
import React from 'react'
import { FaCamera, FaCommentDots } from 'react-icons/fa'
import Image from 'next/image'
import backgroundText from '../../../public/assets/images/BackgroundText.png'

const Admin = () => {
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
      <div className="relative z-10 mx-12 my-12 h-screen w-[90%] rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
        <Image src={backgroundText} alt="bg" />
        <div className="mt-8 flex flex-row justify-around space-x-6">
          <div
            className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-[#cfc4b2] px-3 text-center shadow-md"
            onClick={() => {
              window.location.href = '/admin/fotos'
            }}
          >
            <FaCamera size={40} className="mb-4" color="#1b4850" />
            <span className="text-black">Ver Fotos y Videos</span>
          </div>
          <div
            className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-[#cfc4b2] px-3 text-center shadow-md"
            onClick={() => {
              window.location.href = '/admin/mensajes'
            }}
          >
            <FaCommentDots size={40} className="mb-4" color="#1b4850" />
            <span className="center text-black">Ver Mensajes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
