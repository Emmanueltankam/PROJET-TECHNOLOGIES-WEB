// src/modules/vente/create-sale.dto.ts

export class CreateSaleDto {
    clientId: string;  // Identifiant du client
    bookId: string;    // Identifiant du livre
    date: string;      // Date d'achat (format ISO)
}