// VerFotos component
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import backgroundText from '../../../public/assets/images/BackgroundText.png'
import { createBrowserClient } from '@/utils/supabase'

const VerFotos = () => {
  const [fotos, setFotos] = useState<any[] | null>(null)
  const supabase = createBrowserClient()

  const getFotosFromBucket = async () => {
    try {
      const { data, error } = await supabase.from('fotosPaths').select('*')
      if (error) {
        throw error
      }
      getFotoPathsFromDB(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getFotoPathsFromDB = async (data: any[]) => {
    try {
      const paths = data.map((item) => item.fullPath)
      const urls = await Promise.all(
        paths.map((path) => supabase.storage.from('').getPublicUrl(path)),
      )
      console.log('URLS', urls)
      setFotos(urls)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFotosFromBucket()
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

      <div className="relative z-10 mx-12 my-12 h-screen w-[90%] overflow-scroll rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-4/5">
        {fotos && fotos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {fotos.map((foto, index) => (
              <div key={index} className="h-[200px] w-full">
                <Image
                  src={foto.data.publicUrl}
                  alt="foto"
                  layout="responsive"
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-lg font-bold text-black">
              Todavía no hay fotos!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerFotos
