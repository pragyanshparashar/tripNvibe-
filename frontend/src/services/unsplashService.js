const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

const cache = new Map()

export async function searchPhoto(query) {
  if (!ACCESS_KEY || !query) return null
  if (cache.has(query)) return cache.get(query)

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    )

    if (!response.ok) {
      cache.set(query, null)
      return null
    }

    const data = await response.json()
    const result = data.results?.[0]

    const photo = result
      ? {
          url: result.urls.regular,
          alt: result.alt_description || query,
          photographerName: result.user?.name,
          photographerUrl: result.user?.links?.html,
        }
      : null

    cache.set(query, photo)
    return photo
  } catch {
    cache.set(query, null)
    return null
  }
}
