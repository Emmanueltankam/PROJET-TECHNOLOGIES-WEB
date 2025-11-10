import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    photo?: string; // Lien vers la photo

   
}