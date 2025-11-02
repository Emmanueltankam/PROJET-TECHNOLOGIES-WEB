export type SaleModel = {
    id: string;          // Identifiant unique de la vente
    clientId: string;   // Identifiant du client
    bookId: string;     // Identifiant du livre
    date: string;       // Date d'achat (format ISO)
};