'use client'
import ImageUploader from '@/components/Images'
import React from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri'

const UploadPhoto = () => {
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

      <button
        className="absolute left-6 top-6 z-10 rounded-full bg-white p-2 shadow-lg"
        onClick={handleGoBack}
      >
        <RiArrowGoBackLine className="h-6 w-6 text-gray-500" />
      </button>

      <div className="relative z-10 mx-12 my-44 h-screen w-[90%] max-w-[75%] rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
        <div className="flex h-full w-full flex-col rounded-lg border-4 border-dotted border-gray-300 p-4">
          <div className="overflow-y-auto">
            <ImageUploader />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPhoto
