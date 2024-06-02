import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

type Props = {
  mensaje: {
    Id: number
    Nombre: string
    Mensaje: string
    Numero: string
  }
  index: number
}

const MensajeComponent = (props: Props) => {
  const { Nombre, Mensaje, Numero } = props.mensaje

  return (
    <div
      key={props.index}
      className="relative flex flex-row items-center justify-between border-b-2 border-gray-300 py-6"
    >
      <div className="flex h-full w-full flex-col bg-[#cfc4b2] px-2 py-8">
        <span className="text-lg font-bold">{Nombre}</span>
        <span>{Mensaje}</span>
      </div>
      {Numero && (
        <a
          href={`https://wa.me/${Numero}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-9
           right-4 rounded-full bg-white p-2 shadow-lg"
        >
          <FaWhatsapp size={24} color="#25D366" />
        </a>
      )}
    </div>
  )
}

export default MensajeComponent
