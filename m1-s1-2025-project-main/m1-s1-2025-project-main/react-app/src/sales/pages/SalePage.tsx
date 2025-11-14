import { Outlet } from '@tanstack/react-router'
import { SaleList } from '../components/SaleList.tsx'

/**
 * Composant principal de la page de gestion des ventes
 *
 * Cette page affiche l'interface utilisateur pour gérer les ventes enregistrées.
 * Elle utilise un composant enfant SaleList pour afficher la liste complète des ventes.
 *
 * Structure du composant :
 * - Un conteneur principal avec du padding pour l'espacement
 * - Un titre stylisé "Gestion des Ventes" avec couleur personnalisée
 * - Le composant SaleList qui gère l'affichage et les interactions avec la liste des ventes
 *
 * @returns JSX Element - Interface de la page des ventes
 */
export function SalePage() {
  return (
    // Conteneur principal avec padding uniforme pour l'espacement autour du contenu
    <div style={{ padding: '1rem' }}>
      {/* Titre principal de la page avec style personnalisé */}
      <h1 style={{ marginBottom: '2rem', color: '#395E66' }}>
        Gestion des Ventes
      </h1>

      {/* 
        Composant SaleList qui encapsule toute la logique d'affichage des ventes :
        - Récupération des données depuis l'API
        - Affichage de la liste des ventes
        - Gestion des interactions (ajout, suppression)
        - États de chargement et d'erreur
      */}
      <SaleList />
      <Outlet />
    </div>
  )
}
