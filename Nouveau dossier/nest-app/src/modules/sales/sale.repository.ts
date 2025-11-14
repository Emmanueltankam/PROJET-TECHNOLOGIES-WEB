import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel, SaleModel } from './sale.model';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllSales(): Promise<SaleModel[]> {
    const sales = await this.saleRepository.find({
      relations: ['client', 'book', 'book.author'],
    });

    return sales.map((sale) => ({
      id: sale.id,
      purchaseDate: sale.purchaseDate,
      clientId: sale.clientId,
      bookId: sale.bookId,
      client: {
        id: sale.client.id,
        firstName: sale.client.firstName,
        name: sale.client.name,
      },
      book: {
        id: sale.book.id,
        title: sale.book.title,
        author: {
          firstName: sale.book.author.firstName,
          lastName: sale.book.author.lastName,
        },
      },
    }));
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    const createdSale = await this.saleRepository.save(
      this.saleRepository.create(sale),
    );

    // Recharge la vente avec les relations
    const fullSale = await this.saleRepository.findOne({
      where: { id: createdSale.id },
      relations: ['client', 'book', 'book.author'],
    });

    if (!fullSale) {
      throw new Error('Sale not found after creation');
    }

    return {
      id: fullSale.id,
      purchaseDate: fullSale.purchaseDate,
      clientId: fullSale.clientId,
      bookId: fullSale.bookId,
      client: {
        id: fullSale.client.id,
        firstName: fullSale.client.firstName,
        name: fullSale.client.name,
      },
      book: {
        id: fullSale.book.id,
        title: fullSale.book.title,
        author: {
          firstName: fullSale.book.author.firstName,
          lastName: fullSale.book.author.lastName,
        },
      },
    };
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
