'use client'

import { createBrowserClient } from '@/utils/supabase'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('mensajes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
