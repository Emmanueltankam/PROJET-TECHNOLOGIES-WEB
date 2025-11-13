import { useState } from 'react'
import type { AuthorModel } from '../../authors/AuthorModel'
import axios from 'axios'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([])

  const loadAuthors = async () => {
    try {
      console.log('Loading authors from API...')
      const response = await axios.get('http://localhost:3000/authors')
      console.log('Authors API response:', response.data)

      // Gérer différentes structures de réponse
      let authorsData = response.data
      if (response.data.data) {
        authorsData = response.data.data
      }
      if (Array.isArray(authorsData)) {
        setAuthors(authorsData)
        console.log(
          'Authors loaded successfully:',
          authorsData.length,
          'authors',
        )
      } else {
        console.error('Authors data is not an array:', authorsData)
      }
    } catch (error) {
      console.error('Error loading authors:', error)
      // Si erreur réseau, afficher plus de détails
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'ECONNREFUSED'
      ) {
        console.error(
          'Connection refused - Make sure the backend server is running on port 3000',
        )
      }
    }
  }

  return { authors, loadAuthors }
}
