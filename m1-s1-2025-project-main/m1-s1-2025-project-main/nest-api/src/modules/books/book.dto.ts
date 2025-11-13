import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import type { AuthorId } from '../authors/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  yearPublished: number;

  @IsString()
  coverImage: string; // Champ pour l'image de couverture du livre

  @IsOptional()
  @IsString()
  description?: string; // Champ optionnel pour la description du livre

  @IsOptional()
  @IsString()
  genre?: string; // Champ optionnel pour le genre du livre
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string; // Champ optionnel pour le titre

  @IsOptional()
  @IsUUID(4)
  authorId?: AuthorId; // Champ optionnel pour l'identifiant de l'auteur

  @IsOptional()
  @IsInt()
  @Min(1500)
  @Max(2025)
  yearPublished?: number; // Champ optionnel pour l'année de publication

  @IsOptional()
  @IsString()
  description?: string; // Champ optionnel pour la description

  @IsOptional()
  @IsString()
  genre?: string; // Champ optionnel pour le genre
}

export class GetBooksDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number; // Limite de résultats

  @IsInt()
  @Min(0)
  offset: number; // Décalage pour la pagination

  @IsOptional()
  @IsString()
  sort?: string; // Champ optionnel pour le tri
}
