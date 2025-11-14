import { useState, useEffect } from 'react'
import axios from 'axios'
import type { BookModel } from '../../books/BookModel'

const API_BASE_URL = 'http://localhost:3000'

export function useAuthorBooks(authorId: string) {
  const [books, setBooks] = useState<BookModel[]>([])
  const [loading, setLoading] = useState(false)

  const loadAuthorBooks = async () => {
    if (!authorId) return

    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/books`)
      const allBooks = response.data.data || response.data
      // Filtrer les livres par auteur
      const authorBooks = allBooks.filter(
        (book: BookModel) => book.author?.id === authorId,
      )
      setBooks(authorBooks)
    } catch (err) {
      console.error('Error loading author books:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAuthorBooks()
  }, [authorId])

  return {
    books,
    loading,
    loadAuthorBooks,
  }
}
