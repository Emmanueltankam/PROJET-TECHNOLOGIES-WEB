import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  photo: string; // Ajout du champ pour la photo de l'auteur
}

