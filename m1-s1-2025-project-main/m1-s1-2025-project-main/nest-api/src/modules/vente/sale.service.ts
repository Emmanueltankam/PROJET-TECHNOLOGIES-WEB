import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './create-sale.dto';
import { SaleModel } from './sale.model';
import { v4 as uuidv4 } from 'uuid'; // Pour générer des ID uniques

@Injectable()
export class SaleService {
    private sales: SaleModel[] = []; // Stockage en mémoire pour les ventes

    createSale(createSaleDto: CreateSaleDto): SaleModel {
        const newSale: SaleModel = {
            id: uuidv4(), // Générer un ID unique
            ...createSaleDto,
        };
        this.sales.push(newSale); // Ajouter la vente à la liste
        return newSale; // Retourner la nouvelle vente
    }

    getSales(): SaleModel[] {
        return this.sales; // Retourner toutes les ventes
    }
}