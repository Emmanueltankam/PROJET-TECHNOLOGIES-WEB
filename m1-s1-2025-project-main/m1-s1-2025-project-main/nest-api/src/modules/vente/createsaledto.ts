import { Controller, Post, Body } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './create-sale.dto';
import { SaleModel } from './sale.model';

@Controller('sales')
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Post()
    create(@Body() createSaleDto: CreateSaleDto): SaleModel {
        return this.saleService.createSale(createSaleDto);
    }
}