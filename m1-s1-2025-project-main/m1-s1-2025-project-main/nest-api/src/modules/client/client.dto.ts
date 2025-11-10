import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

// -----------------------------------------------------
// DTO pour la CRÉATION d'un nouveau client
// -----------------------------------------------------
export class CreateClientDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsOptional()
  @IsEmail() // Utiliser IsEmail est plus spécifique pour la validation
  email?: string;

  @IsOptional()
  @IsString() // On peut aussi utiliser @IsUrl si c'est toujours un lien
  photo?: string;
}

// -----------------------------------------------------
// DTO pour la MISE À JOUR (partielle) d'un client
// -----------------------------------------------------
export class UpdateClientDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

// -----------------------------------------------------
// DTO pour la RÉCUPÉRATION d'une liste (avec pagination)
// -----------------------------------------------------
export class GetClientsDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number; // Limite de résultats

  @IsInt()
  @Min(0)
  offset: number; // Décalage pour la pagination

  @IsOptional()
  @IsString()
  sort: string; // Champ optionnel pour le tri (ex: "nom", "prenom:DESC")
}