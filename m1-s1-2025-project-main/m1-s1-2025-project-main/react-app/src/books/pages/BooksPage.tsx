import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'

/**
 * Composant principal de la page de gestion des livres
 *
 * Cette page utilise le système de routage de TanStack Router pour afficher
 * la liste des livres et gérer les routes imbriquées.
 *
 * Architecture du composant :
 * - BookList : Affiche la liste principale des livres avec leurs fonctionnalités
 * - Outlet : Point de montage pour les routes enfants (ex: détails d'un livre)
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
      {/* 
        Composant BookList qui gère :
        - L'affichage de tous les livres disponibles
        - Les fonctionnalités de recherche et filtrage
        - Les actions CRUD (Create, Read, Update, Delete)
        - La gestion des états de chargement et d'erreur
        - L'interaction avec l'API backend pour les données des livres
      */}
      <BookList />

      {/* 
        Outlet de TanStack Router pour les routes imbriquées :
        - Affiche le contenu des routes enfants (/books/:bookId, etc.)
        - Permet la navigation sans perdre le contexte de la liste
        - Facilite les transitions entre la vue liste et vue détail
        - Maintient l'état de la page parent lors de la navigation
      */}
      <Outlet />
    </div>
  )
}
