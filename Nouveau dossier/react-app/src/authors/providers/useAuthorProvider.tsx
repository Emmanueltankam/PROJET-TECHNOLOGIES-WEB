import { useState } from 'react'
import axios from 'axios'
import type {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../AuthorModel'

const API_BASE_URL = 'http://localhost:3000'

export function useAuthorProvider() {
  const [authors, setAuthors] = useState<AuthorModel[]>([])

  const loadAuthors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors`)
      setAuthors(response.data.data || response.data)
    } catch (err) {
      console.error('Error loading authors:', err)
    }
  }

  const createAuthor = async (author: CreateAuthorModel) => {
    try {
      await axios.post(`${API_BASE_URL}/authors`, author)
      await loadAuthors()
    } catch (err) {
      console.error('Error creating author:', err)
    }
  }

  const updateAuthor = async (id: string, author: UpdateAuthorModel) => {
    try {
      await axios.patch(`${API_BASE_URL}/authors/${id}`, author)
      await loadAuthors()
    } catch (err) {
      console.error('Error updating author:', err)
    }
  }

  const deleteAuthor = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/authors/${id}`)
      await loadAuthors()
    } catch (err) {
      console.error('Error deleting author:', err)
    }
  }

  return {
    authors,
    loadAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  }
}
