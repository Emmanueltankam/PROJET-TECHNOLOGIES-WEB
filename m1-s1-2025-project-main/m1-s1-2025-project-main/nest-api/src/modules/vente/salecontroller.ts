import { Body, Controller, Post, Get } from '@nestjs/common';
import { SaleService } from './saleservice'; // Vérifiez que le nom du fichier est correct
import { CreateSaleDto } from './createsaledto'; // Vérifiez le nom du fichier
import { SaleModel } from './salemodel'; // Vérifiez le nom du fichier

@Controller('sales') // Endpoint: /sales
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Post() // POST /sales
    create(@Body() createSaleDto: CreateSaleDto): SaleModel {
        return this.saleService.createSale(createSaleDto); // Crée une nouvelle vente
    }

    @Get() // GET /sales
    findAll(): SaleModel[] {
        return this.saleService.getSales(); // Récupère toutes les ventes
    }
}