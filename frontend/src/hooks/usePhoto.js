import { useEffect, useState } from 'react'
import { searchPhoto } from '../services/unsplashService'

export function usePhoto(query) {
  const [photo, setPhoto] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(query))

  useEffect(() => {
    if (!query) {
      setPhoto(null)
      setIsLoading(false)
      return
    }

    let isMounted = true
    setIsLoading(true)

    searchPhoto(query).then((result) => {
      if (!isMounted) return
      setPhoto(result)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [query])

  return { photo, isLoading }
}
