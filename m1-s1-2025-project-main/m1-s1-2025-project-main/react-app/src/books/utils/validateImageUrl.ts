export function validateImageUrl(url: string): Promise<boolean> {
  return new Promise(resolve => {
    if (!url) return resolve(false)
    try {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    } catch (e) {
      resolve(false)
    }
  })
}
