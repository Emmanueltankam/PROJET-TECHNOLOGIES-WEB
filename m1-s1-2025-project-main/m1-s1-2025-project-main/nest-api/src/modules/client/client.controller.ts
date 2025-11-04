import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

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

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.clientService.delete(id);
    }
}