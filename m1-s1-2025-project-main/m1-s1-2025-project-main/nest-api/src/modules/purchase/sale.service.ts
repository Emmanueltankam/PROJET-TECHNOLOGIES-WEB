import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePurchaseDto } from './create-purchase.dto';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(PurchaseEntity)
        private readonly purchaseRepository: PurchaseRepository,
    ) {}

    async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseEntity> {
        const purchase = this.purchaseRepository.create(createPurchaseDto);
        return this.purchaseRepository.save(purchase);
    }

    async getPurchases(): Promise<PurchaseEntity[]> {
        return this.purchaseRepository.find();
    }

    async getPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return this.purchaseRepository.findOne({ where: { id } });
    }

    async deletePurchase(id: string): Promise<void> {
        await this.purchaseRepository.delete(id);
    }
}