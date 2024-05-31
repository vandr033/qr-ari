'use client'
import React, { useState, useEffect } from 'react'
import { BsUpload } from 'react-icons/bs'
import { RiArrowGoBackLine } from 'react-icons/ri'
import Image from 'next/image'

type Props = {}

const UploadPhoto = (props: Props) => {
  const [uploadedPictures, setUploadedPictures] = useState<string[]>([])
  const [isUploadView, setIsUploadView] = useState<boolean>(true)
  useEffect(() => {
    console.log('uploaded pictures:', uploadedPictures)
  }, [uploadedPictures])

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList) {
      const uploadedPictureURLs: string[] = []
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        const url = URL.createObjectURL(file)
        uploadedPictureURLs.push(url)
      }
      console.log('Uploaded Pictures:', uploadedPictureURLs)
      setUploadedPictures(uploadedPictureURLs)
      localStorage.setItem(
        'uploadedPictures',
        JSON.stringify(uploadedPictureURLs),
      ) // Save to local storage
      setIsUploadView(false)
    }
  }

  const handleGoBack = () => {
    localStorage.removeItem('uploadedPictures')
    setUploadedPictures([])
    setIsUploadView(true)
  }

  useEffect(() => {
    const storedPictures = localStorage.getItem('uploadedPictures')
    if (storedPictures) {
      const parsedPictures = JSON.parse(storedPictures)
      setUploadedPictures(parsedPictures)
      setIsUploadView(false)
    }
  }, [])

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

      {isUploadView ? (
        <div className="relative z-10 mx-12 my-24 h-full w-[90%] rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUploadClick}
            id="upload-input"
          />
          <label
            htmlFor="upload-input"
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-4 border-dotted border-gray-400"
            style={{ minHeight: '200px' }} // Set a minimum height to make sure it's visible
          >
            <BsUpload className="mb-2 h-16 w-16 text-gray-500" />
            <span className="text-lg font-semibold text-gray-500">
              Subir Imágenes
            </span>
          </label>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          {uploadedPictures.map((url, index) => (
            <div key={index} className="mb-4">
              <Image
                src={url}
                alt={`Uploaded Picture ${index}`}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadPhoto
