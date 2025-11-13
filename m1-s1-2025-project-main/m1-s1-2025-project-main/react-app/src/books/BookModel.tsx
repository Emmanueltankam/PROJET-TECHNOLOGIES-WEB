/**
 * Modèle de données pour un livre - correspond au modèle backend
 */
export type BookModel = {
  id: string // Identifiant unique du livre
  title: string // Titre du livre
  yearPublished: number // Année de publication
  coverImage: string // URL de l'image de couverture
  description?: string // Description du livre (optionnel)
  genre?: string // Genre du livre (optionnel)
  salesCount?: number // Nombre de ventes (optionnel) - nouveau champ ajouté
  author: {
    firstName: string // Prénom de l'auteur
    lastName: string // Nom de famille de l'auteur
  }
}

/**
 * Modèle pour créer un nouveau livre
 */
export type CreateBookModel = {
  authorId: string // Identifiant de l'auteur
  title: string // Titre du livre
  yearPublished: number // Année de publication
  coverImage: string // URL de l'image de couverture (obligatoire pour la création)
  description?: string // Description du livre (optionnel)
  genre?: string // Genre du livre (optionnel)
}

/**
 * Modèle pour mettre à jour un livre existant
 * Tous les champs sont optionnels pour permettre des mises à jour partielles
 */
export type UpdateBookModel = Partial<CreateBookModel>
