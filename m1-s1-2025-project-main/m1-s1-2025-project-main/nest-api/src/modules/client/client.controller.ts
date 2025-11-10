<<<<<<< HEAD
import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

import 
=======
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
>>>>>>> b97923143bef2fd57fd5881cf0812b6579dee792

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    findAll(): Promise<Client[]> {
        return this.clientService.findAll();
    }

    @Post()
    create(@Body() client: Partial<Client>): Promise<Client> {
        return this.clientService.create(client);
    }

    @Patch(':id')
    updateClient(@Param('id') id : string, @Body() updateClientDTo: UpdateClientDto) {
        return this.ClientService.updatedBook(id,updateClientDTo)
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.clientService.delete(id);
    }
}