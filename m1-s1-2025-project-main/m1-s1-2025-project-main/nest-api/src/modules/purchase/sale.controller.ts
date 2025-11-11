import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreatePurchaseDto } from './create-purchase.dto';

@Controller('sales')
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Post()
    async create(@Body() createPurchaseDto: CreatePurchaseDto) {
        return this.saleService.createPurchase(createPurchaseDto);
    }

    @Get()
    async getAll() {
        return this.saleService.getPurchases();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.saleService.getPurchaseById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.saleService.deletePurchase(id);
    }
}