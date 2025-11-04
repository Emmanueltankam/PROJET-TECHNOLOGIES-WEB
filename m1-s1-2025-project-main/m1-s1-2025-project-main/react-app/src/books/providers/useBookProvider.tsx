import { useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])

  // chargement de la liste des livres
  const loadBooks = () => {
    axios
      .get('http://localhost:3000/books')
      .then(data => {
        setBooks(data.data.data)
      })
      .catch(err => console.error(err))
  }

  // Création d'un nouveau livre
  const createBook = (book: CreateBookModel) => {
    axios
      .post('http://localhost:3000/books', book)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

// Suppression d'un livre avec confirmation
  const deleteBook = async (id: string) => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')
    if (!confirmation) return

    try {
      await axios.delete(`http://localhost:3000/books/${id}`)
      setBooks(prev => prev.filter(b => b.id !== id))
    } catch (error) {
      console.error('Erreur lors de la suppression du livre :', error)
    }
  }

  return { books, loadBooks, createBook, deleteBook }
}





