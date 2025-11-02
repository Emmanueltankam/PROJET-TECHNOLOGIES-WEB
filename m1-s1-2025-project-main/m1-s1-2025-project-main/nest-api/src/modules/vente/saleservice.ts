import { Injectable } from '@nestjs/common';
import  { CreateSaleDto } from './createsaledto';
import { SaleModel } from './salemodel';

@Injectable()
export class SaleService {
    private sales: SaleModel[] = []; // Utilisez une base de données dans un projet réel

    createSale(createSaleDto: CreateSaleDto): SaleModel {
        const newSale: SaleModel = {
            id: this.generateId(), // Générer un ID unique
            ...createSaleDto, // Copier les données du DTO dans le nouvel objet
        };
        this.sales.push(newSale); // Ajouter la vente à la liste
        return newSale; // Retourner la nouvelle vente
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9); // Générer un ID unique (peut ne pas être suffisamment robuste pour une production)
    }

    getSales(): SaleModel[] {
        return this.sales; // Retourner toutes les ventes
    }
}