'use client'

import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import React from 'react'

export function Form() {
  async function uploadImage(formData: FormData) {
    const imageFile = formData.get('image') as File
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    })
    revalidatePath('/')
    return blob
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await uploadImage(formData)
  }

  return (
    <div className="rounded bg-white p-4 shadow">
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
