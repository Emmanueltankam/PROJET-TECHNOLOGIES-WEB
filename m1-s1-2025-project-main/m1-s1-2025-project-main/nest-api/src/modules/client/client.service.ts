import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  //  Récupérer tous les clients (avec filtre optionnel)
  async findAll(filter?: { name?: string; email?: string }): Promise<Client[]> {
    const where: any = {};
    if (filter?.name) where.name = Like(`%${filter.name}%`);
    if (filter?.email) where.email = Like(`%${filter.email}%`);

    return this.clientRepository.find({ where });
  }

  // Récupérer un client par ID
  async findOneById(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} introuvable`);
    }
    return client;
  }

  //  Créer un nouveau client
  async create(clientData: Partial<Client>): Promise<Client> {
    const newClient = this.clientRepository.create(clientData);
    return this.clientRepository.save(newClient);
  }

  // 🔹 Mettre à jour un client existant
  async update(id: number, updatedData: Partial<Client>): Promise<Client> {
    const existingClient = await this.findOneById(id);

    const updatedClient = {
      ...existingClient,
      ...updatedData,
    };

    return this.clientRepository.save(updatedClient);
  }

  // 🔹 Supprimer un client
  async delete(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client avec l'ID ${id} introuvable`);
    }
  }
}
