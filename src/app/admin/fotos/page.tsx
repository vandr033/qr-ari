'use client'
import React, { useState } from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { FaCamera, FaCommentDots } from 'react-icons/fa'
import Image from 'next/image'
import backgroundText from '../../../public/assets/images/BackgroundText.png'

const VerFotos = () => {
  const handleGoBack = () => {
    window.history.back()
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

      <div className="relative z-10 mx-12 my-12 h-screen w-[90%] rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-4/5"></div>
    </div>
  )
}

export default VerFotos
