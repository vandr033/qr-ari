import { useState, ChangeEvent, useRef, useEffect } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { createBrowserClient } from '@/utils/supabase'

interface ImageFile {
  id: string
  url: string
  width: number
  height: number
  file: File // Add the file property to the ImageFile interface
}

const ImageUploader = () => {
  const [images, setImages] = useState<ImageFile[]>([])
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const supabase = createBrowserClient()

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
          return { id, url, ...dimensions, file } // Include the file property
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

  const handleUploadClick = async () => {
    for (const image of images) {
      const { file } = image // Retrieve the file from the image object
      const { data, error } = await supabase.storage
        .from('Fotos')
        .upload(`image_${image.id}.jpg`, file)

      if (error) {
        console.error('Error uploading image:', error.message)
      } else {
        uploadToDb(data)
        console.log('Image uploaded successfully:', data)
        // Clear the images state after successful upload
        setImages([])
      }
    }
  }

  const uploadToDb = async (imagePaths: any) => {
    console.log(imagePaths)
    const { data, error } = await supabase
      .from('fotosPaths')
      .insert([{ fullPath: imagePaths.fullPath }])
      .select()

    if (error) {
      console.error('Error inserting image paths:', error.message)
    } else {
      console.log('Image paths inserted successfully:', data)
    }
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          padding: '10px',
          backgroundColor: '#cfc4b2',
          borderRadius: '5px',
          overflowY: 'auto',
          minHeight: '400px',
        }}
      >
        {images.map((image) => (
          <div key={image.id} style={{ position: 'relative' }}>
            <Image
              src={image.url}
              alt={`image-${image.id}`}
              layout="responsive"
              width={image.width}
              height={image.height}
            />
            <button
              onClick={() => handleRemoveImage(image.id)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <IoClose />
            </button>
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
          onClick={handleUploadClick}
          className="mx-auto mt-4 rounded bg-[#c4c4c4] px-8 py-2 text-center text-black"
        >
          Confirmar!
        </button>
      )}
    </div>
  )
}

export default ImageUploader
