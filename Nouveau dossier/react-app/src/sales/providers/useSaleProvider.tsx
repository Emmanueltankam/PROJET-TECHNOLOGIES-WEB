import { useState, useCallback } from 'react'
import axios from 'axios'
import type { SaleModel, CreateSaleModel } from '../models/SaleModel'

const API_BASE_URL = 'http://localhost:3000'

/**
 * Hook personnalisé pour gérer les ventes
 *
 * Fournit toutes les fonctionnalités nécessaires pour :
 * - Récupérer toutes les ventes
 * - Récupérer les ventes d'un client spécifique
 * - Créer une nouvelle vente (achat de livre par un client)
 * - Supprimer une vente
 *
 * @returns Objet contenant:
 *   - sales: Tableau des ventes
 *   - loading: État de chargement
 *   - error: Message d'erreur si applicable
 *   - loadSales: Fonction pour charger toutes les ventes
 *   - loadSalesByClient: Fonction pour charger les ventes d'un client
 *   - createSale: Fonction pour créer une nouvelle vente
 *   - deleteSale: Fonction pour supprimer une vente
 */
export function useSaleProvider() {
  const [sales, setSales] = useState<SaleModel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Récupère toutes les ventes depuis l'API
   * Charge les données avec les clients et livres associés
   */
  const loadSales = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_BASE_URL}/sales`)
      setSales(response.data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des ventes:', err)
      setError('Impossible de charger les ventes')
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Récupère les ventes d'un client spécifique
   * @param clientId L'identifiant du client
   */
  const loadSalesByClient = useCallback(async (clientId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `${API_BASE_URL}/sales/client/${clientId}`,
      )
      setSales(response.data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des ventes du client:', err)
      setError('Impossible de charger les ventes du client')
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Crée une nouvelle vente (enregistre un achat de livre par un client)
   * @param sale Les données de la vente à créer
   */
  const createSale = useCallback(
    async (sale: CreateSaleModel) => {
      try {
        setError(null)
        const response = await axios.post(`${API_BASE_URL}/sales`, {
          ...sale,
          purchaseDate:
            sale.purchaseDate instanceof Date
              ? sale.purchaseDate.toISOString()
              : sale.purchaseDate,
        })
        // Recharge la liste des ventes après création
        await loadSales()
        return response.data
      } catch (err) {
        console.error('Erreur lors de la création de la vente:', err)
        setError('Impossible de créer la vente')
        throw err
      }
    },
    [loadSales],
  )

  /**
   * Supprime une vente
   * @param id L'identifiant de la vente à supprimer
   */
  const deleteSale = useCallback(
    async (id: string) => {
      try {
        setError(null)
        await axios.delete(`${API_BASE_URL}/sales/${id}`)
        // Recharge la liste des ventes après suppression
        await loadSales()
      } catch (err) {
        console.error('Erreur lors de la suppression de la vente:', err)
        setError('Impossible de supprimer la vente')
        throw err
      }
    },
    [loadSales],
  )

  return {
    sales,
    loading,
    error,
    loadSales,
    loadSalesByClient,
    createSale,
    deleteSale,
  }
}
