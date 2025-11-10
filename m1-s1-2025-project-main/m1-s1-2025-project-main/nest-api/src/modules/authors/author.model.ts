import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photo: string; // Ajout du champ pour la photo de l'auteur
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photo: string; // Ajout du champ pour la photo de l'auteur
};