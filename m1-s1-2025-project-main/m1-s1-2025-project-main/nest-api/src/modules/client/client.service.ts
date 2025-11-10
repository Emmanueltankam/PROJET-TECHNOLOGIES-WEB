import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
    ) {}

    async findAll(): Promise<Client[]> {
        return this.clientRepository.find();
    }

    async create(client: Partial<Client>): Promise<Client> {
        const newClient = this.clientRepository.create(client);
        return this.clientRepository.save(newClient);
    }

    async delete(id: number): Promise<void> {
        await this.clientRepository.delete(id);
    }

     public async updateClient(
          id: string,
          book: UpdateClientModel,
      ): Promise<ClientModel | undefined> {
        const oldClient = await this.getClientById(id);
        if (!oldClient) {
          return undefined;
        }
    
        return this.ClientRepository.updateClient(id, book);
      }
}