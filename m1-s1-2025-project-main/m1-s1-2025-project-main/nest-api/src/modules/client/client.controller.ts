import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { UpdateClientDto } from './client.dto';

// Déclaration du contrôleur pour gérer les requêtes liées aux clients
@Controller('clients')
export class ClientController {
    // Injection du service ClientService via le constructeur
    constructor(private readonly clientService: ClientService) {}

    // Méthode pour récupérer tous les clients
    @Get()
    findAll(): Promise<Client[]> {
        // Appel au service pour obtenir la liste des clients
        return this.clientService.findAll();
    }
    
  
    // Méthode pour créer un nouveau client
    @Post()
    create(@Body() client: Partial<Client>): Promise<Client> {
        // Appel au service pour créer un client avec les données fournies
        return this.clientService.create(client);
    }

    // Méthode pour mettre à jour un client existant
    @Patch(':id')
    public async updateClient(
        @Param('id') id: number, // Récupération de l'identifiant du client à mettre à jour
        @Body() updateClientDto: UpdateClientDto // Données de mise à jour du client
    ) {
        // Appel au service pour mettre à jour le client avec l'identifiant et les nouvelles données
        return this.clientService.update(id, updateClientDto);
    }

    // 🔹 Récupérer les détails d’un client
  @Get(':id')
  async getDetails(@Param('id') id: number): Promise<Client> {
    return this.clientService.findOneById(id);
  }
}

    // Méthode pour supprimer un client par son identifiant
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
    // Appel au service pour supprimer le client correspondant à l'identifiant
        return this.clientService.delete(id);
    }
}