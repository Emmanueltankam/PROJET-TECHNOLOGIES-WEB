import { AuthorList } from '../components/AuthorList'

/**
 * Composant principal de la page de gestion des auteurs
 *
 * Cette page affiche l'interface utilisateur pour gérer les auteurs de la bibliothèque.
 * Elle utilise un composant enfant AuthorList pour afficher la liste complète des auteurs.
 *
 * Structure du composant :
 * - Un conteneur principal avec du padding pour l'espacement
 * - Un titre stylisé "Gestion des Auteurs" avec couleur personnalisée
 * - Le composant AuthorList qui gère l'affichage et les interactions avec la liste des auteurs
 *
 * @returns JSX Element - Interface de la page des auteurs
 */
export function AuthorsPage() {
  return (
    // Conteneur principal avec padding uniforme pour l'espacement autour du contenu
    <div style={{ padding: '1rem' }}>
      {/* Titre principal de la page avec style personnalisé */}
      <h1 style={{ marginBottom: '2rem', color: '#395E66' }}>
        Gestion des Auteurs
      </h1>

      {/* 
        Composant AuthorList qui encapsule toute la logique d'affichage des auteurs :
        - Récupération des données depuis l'API
        - Affichage de la liste des auteurs
        - Gestion des interactions (ajout, modification, suppression)
        - États de chargement et d'erreur
      */}
      <AuthorList />
    </div>
  )
}
