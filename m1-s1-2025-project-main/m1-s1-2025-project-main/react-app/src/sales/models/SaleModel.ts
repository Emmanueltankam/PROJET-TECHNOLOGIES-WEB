/**
 * Modèle de données pour une vente/achat
 * Correspond au modèle backend PurchaseModel
 */
export type SaleModel = {
  id: string // Identifiant unique de la vente
  purchaseDate: Date // Date de l'achat
  clientId: string // Identifiant du client
  bookId: string // Identifiant du livre
  client?: {
    id: string
    name: string
    firstName: string
    email?: string
    photoUrl?: string
  }
  book?: {
    id: string
    title: string
    yearPublished: number
    coverImage: string
    description?: string
    genre?: string
    author: {
      firstName: string
      lastName: string
    }
  }
}

/**
 * Modèle pour créer une nouvelle vente
 */
export type CreateSaleModel = {
  clientId: string // Identifiant du client
  bookId: string // Identifiant du livre
  purchaseDate: Date // Date de l'achat
}
