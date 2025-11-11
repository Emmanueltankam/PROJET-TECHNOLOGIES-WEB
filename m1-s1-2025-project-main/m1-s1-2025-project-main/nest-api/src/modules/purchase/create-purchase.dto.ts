import { IsUUID, IsDateString } from 'class-validator';

export class CreatePurchaseDto {
    @IsUUID(4)
    customerId: string; // Identifiant du client

    @IsUUID(4)
    bookId: string; // Identifiant du livre

    @IsDateString()
    purchaseDate: Date; // Date de l'achat
}