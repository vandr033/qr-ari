'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import backgroundText from '../../../public/assets/images/BackgroundText.png'
import { FaCamera, FaCommentDots } from 'react-icons/fa'

type Props = {}

const Home = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
  }

  const handleMensajeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMensaje(e.target.value)
  }

  const handleSubmit = () => {
    // Check if inputs are not empty before submitting
    if (nombre.trim() === '' || mensaje.trim() === '') {
      alert('Por favor, complete todos los campos.')
      return
    }

    // Handle the form submission logic here
    console.log('Nombre:', nombre)
    console.log('Mensaje:', mensaje)
    handleCloseModal()
  }

  const handleNavigate = () => {
    window.location.href = '/upload'
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-gray-100 to-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 150" // Adjusted viewBox to cover a large enough area
          preserveAspectRatio="xMidYMid slice" // Ensures the pattern scales properly
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

      {/* Content */}
      <div className="relative z-10 mx-12 w-[90%] rounded-lg bg-white p-8 shadow-lg sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
        <Image src={backgroundText} alt="bg" />
        <div className="mt-8 flex flex-row justify-around space-x-6">
          <div
            className="flex h-40 w-40 flex-col items-center justify-center rounded-lg bg-[#cfc4b2] px-3 text-center shadow-md"
            onClick={handleNavigate}
          >
            <FaCamera size={40} className="mb-4" color="#1b4850" />
            <span className="text-black">Subir Fotos y Videos</span>
          </div>
          <div
            className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-[#cfc4b2] px-3 text-center shadow-md"
            onClick={handleOpenModal}
          >
            <FaCommentDots size={40} className="mb-4" color="#1b4850" />
            <span className="center text-black">Escribir Mensaje</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Escribir Mensaje</h2>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="nombreInput"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombreInput"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={nombre}
                onChange={handleNombreChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="mensajeInput"
              >
                Mensaje
              </label>
              <textarea
                id="mensajeInput"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={mensaje}
                onChange={handleMensajeChange}
                rows={7}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="rounded-md bg-gray-300 px-4 py-2 text-black"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
                onClick={handleSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
