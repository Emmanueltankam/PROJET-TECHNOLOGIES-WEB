import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PurchaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerId: string;

    @Column()
    bookId: string;

    @Column()
    purchaseDate: Date;
}