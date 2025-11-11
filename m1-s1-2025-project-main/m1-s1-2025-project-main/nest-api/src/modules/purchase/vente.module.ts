import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PurchaseEntity])],
    providers: [SaleService],
    controllers: [SaleController],
})
export class VenteModule {}