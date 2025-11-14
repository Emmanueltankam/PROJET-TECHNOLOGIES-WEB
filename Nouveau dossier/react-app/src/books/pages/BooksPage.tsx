import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'

/**
 * Composant principal de la page de gestion des livres
 *
 * Fonctionnement du routage :
 * - La route parent '/books' affiche ce composant
 * - Les routes enfants (comme '/books/:bookId') sont rendues dans l'Outlet
 * - Permet la navigation entre la liste et les détails sans rechargement complet
 *
 * @returns JSX Element - Interface de la page des livres avec routage imbriqué
 */
export function BooksPage() {
  return (
    <div>
      <BookList />
      <Outlet />
    </div>
  )
}
