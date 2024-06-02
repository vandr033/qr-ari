import { useState, ChangeEvent, useRef, useEffect } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

interface ImageFile {
  id: string // Add id for unique identification of each image
  url: string
  width: number
  height: number
}

const ImageUploader = () => {
  const [images, setImages] = useState<ImageFile[]>([])
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // Calculate the width of each image container dynamically based on the available space
    const container = document.getElementById('image-container')
    if (container) {
      const containerWidth = container.offsetWidth / 2 - 15 // Subtracting margin and padding
      setContainerWidth(containerWidth)
    }
  }, [images])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => {
        const id = Math.random().toString(36).substr(2, 9) // Generate a random id for each image
        const url = URL.createObjectURL(file)
        return { id, file, url }
      })

      const imagesWithDimensions: Promise<ImageFile>[] = fileArray.map(
        async ({ id, file, url }) => {
          const dimensions = await getImageDimensions(file)
          return { id, url, ...dimensions }
        },
      )

      Promise.all(imagesWithDimensions).then((newImages) => {
        setImages((prevImages) => prevImages.concat(newImages))
      })
    }
  }

  const getImageDimensions = (
    file: File,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = document.createElement('img')
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
        URL.revokeObjectURL(img.src) // Revoke the URL after getting dimensions
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const handleRemoveImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id))
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
        id="image-upload"
      />

      <div
        id="image-container"
        className="h-full"
        style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: '#cfc4b2',
          padding: '10px',
          borderRadius: '5px',
          overflowY: 'auto',
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            style={{
              marginRight: '10px',
              marginBottom: '10px',
              width: '100px',
              height: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '100%', position: 'relative' }}>
              <Image
                src={image.url}
                alt={`image-${image.id}`}
                layout="responsive"
                width={100} // Adjust the width as needed
                height={100} // Adjust the height as needed
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleButtonClick}
        className="mx-auto mt-4 rounded bg-[#1b4850] px-8 py-2 text-center text-black"
      >
        Seleccionar fotos!
      </button>
      {images.length > 0 && (
        <button
          type="button"
          onClick={handleButtonClick}
          className="mx-auto mt-4 rounded bg-[#c4c4c4] px-8 py-2 text-center text-black"
        >
          Confirmar!
        </button>
      )}
    </div>
  )
}

export default ImageUploader
