import { EntityRepository, Repository } from 'typeorm';
import { PurchaseEntity } from './purchase.entity';

@EntityRepository(PurchaseEntity)
export class PurchaseRepository extends Repository<PurchaseEntity> {

    // Méthode pour trouver tous les achats
    async findAll(): Promise<PurchaseEntity[]> {
        return this.find(); // Récupère tous les enregistrements
    }

    // Méthode pour trouver un achat par ID
    async findById(id: string): Promise<PurchaseEntity | null> {
        return this.findOne({ where: { id } }); // Récupère un achat par ID (corrigé)
    }

    // Méthode pour trouver tous les achats d'un client
    async findByCustomerId(customerId: string): Promise<PurchaseEntity[]> {
        return this.find({ where: { customerId } }); // Récupère les achats d'un client donné
    }

    // Méthode pour trouver tous les achats d'un livre
    async findByBookId(bookId: string): Promise<PurchaseEntity[]> {
        return this.find({ where: { bookId } }); // Récupère les achats pour un livre donné
    }

    // Méthode pour créer un nouvel achat
    async createPurchase(purchaseData: Partial<PurchaseEntity>): Promise<PurchaseEntity> {
        const purchase = this.create(purchaseData); // Crée une nouvelle entité PurchaseEntity
        return this.save(purchase); // Enregistre l'entité dans la base de données
    }

    // Méthode pour mettre à jour un achat
    async updatePurchase(id: string, updateData: Partial<PurchaseEntity>): Promise<PurchaseEntity | null> {
        await this.update(id, updateData); // Met à jour l'achat
        return this.findOne({ where: { id } }); // Retourne l'achat mis à jour (corrigé)
    }

    // Méthode pour supprimer un achat
    async deletePurchase(id: string): Promise<void> {
        await this.delete(id); // Supprime un achat par ID
    }
}