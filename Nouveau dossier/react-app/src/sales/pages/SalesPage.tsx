import { SaleList } from '../components/SaleList'

/**
 * Page de gestion des ventes/achats
 *
 * Affiche la liste complète de toutes les ventes enregistrées
 * avec les informations du client et du livre associés
 */
export function SalesPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#395E66' }}>
        Gestion des Ventes
      </h1>
      <SaleList />
    </div>
  )
}
