import { AuthorId } from '../authors/author.entity';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
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
};

export type UpdateBookModel = Partial<CreateBookModel>;

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof BookModel, 'ASC' | 'DESC'>>;
};

export type GetBooksModel = {
  totalCount: number;
  data: BookModel[];
};