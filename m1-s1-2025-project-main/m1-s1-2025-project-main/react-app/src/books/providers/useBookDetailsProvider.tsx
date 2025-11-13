import { useState } from 'react'
import axios from 'axios'
import type { BookModel } from '../BookModel'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = async () => {
    if (!id) return
    
    setIsLoading(true)
    try {
      console.log(`Loading book with ID: ${id}`)
      const response = await axios.get(`http://localhost:3000/books/${id}`)
      console.log('Book API response:', response.data)
      
      // Gérer différentes structures de réponse
      let bookData = response.data
      if (response.data.data) {
        bookData = response.data.data
      }
      
      // Vérifier que les données du livre contiennent l'auteur
      if (bookData && bookData.author) {
        console.log('Book loaded with author:', bookData.author)
        setBook(bookData)
      } else if (bookData) {
        console.warn('Book data missing author information:', bookData)
        setBook(bookData)
      } else {
        console.error('No book data received')
      }
    } catch (error) {
      console.error('Error loading book:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, book, loadBook }
}
