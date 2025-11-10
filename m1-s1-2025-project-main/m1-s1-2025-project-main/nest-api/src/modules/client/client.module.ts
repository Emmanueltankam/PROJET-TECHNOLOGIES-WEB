import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Client } from './entities/client.entity';
=======
import { Client } from './client.entity';
>>>>>>> b97923143bef2fd57fd5881cf0812b6579dee792
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientService],
    controllers: [ClientController],
})
export class ClientModule {}