import { AuthorId } from '../authors/author.entity';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
<<<<<<< HEAD
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  coverImage: string; // Ajout du champ pour l'image de couverture
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
  coverImage: string; // Ajout du champ pour l'image de couverture dans le model
=======
  id: string;                // Identifiant unique du livre
  title: string;             // Titre du livre
  author: BookAuthorModel;   // Auteur du livre
  yearPublished: number;     // Année de publication
  coverImage: string;        // Image de couverture
  description?: string;      // Description du livre (optionnel)
  genre?: string;            // Genre du livre (optionnel)
  salesCount?: number;       // Nombre de ventes (optionnel)
};

export type CreateBookModel = {
  title: string;             // Titre du livre
  authorId: AuthorId;       // Identifiant de l'auteur
  yearPublished: number;     // Année de publication
  coverImage: string;        // Image de couverture
  description?: string;      // Description du livre (optionnel)
  genre?: string;            // Genre du livre (optionnel)
>>>>>>> b97923143bef2fd57fd5881cf0812b6579dee792
};

export type UpdateBookModel = Partial<CreateBookModel>; // Permet de mettre à jour partiellement le livre

export type FilterBooksModel = {
  limit: number;            // Limite de résultats
  offset: number;           // Décalage pour la pagination
  sort?: Partial<Record<keyof BookModel, 'ASC' | 'DESC'>>; // Tri des résultats
};

export type GetBooksModel = {
<<<<<<< HEAD
  totalCount: number;
  data: BookModel[];
=======
  totalCount: number;       // Nombre total de livres
  data: BookModel[];        // Liste des livres
>>>>>>> b97923143bef2fd57fd5881cf0812b6579dee792
};