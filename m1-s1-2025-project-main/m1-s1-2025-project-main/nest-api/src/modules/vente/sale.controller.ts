import { Body, Controller, Post, Get } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './create-sale.dto';
import type { SaleModel } from './sale.model'; // Utiliser import type

@Controller('sales') // Point d'entrée pour les ventes
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Post() // Pour créer une vente
    create(@Body() createSaleDto: CreateSaleDto): SaleModel {
        return this.saleService.createSale(createSaleDto);
    }

    @Get() // Pour récupérer toutes les ventes
    findAll(): SaleModel[] {
        return this.saleService.getSales();
    }
}

// src/modules/vente/sale.model.ts