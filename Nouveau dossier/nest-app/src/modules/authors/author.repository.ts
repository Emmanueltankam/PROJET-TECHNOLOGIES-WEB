import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
      @InjectRepository(AuthorEntity)
      private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async getAuthorById(id: string): Promise<AuthorModel | null> {
    return this.authorRepository.findOne({
      where: { id : id as AuthorId},
      relations: ['books'],
    });
  }

  public async updateAuthor(
    id: string,
    data: UpdateAuthorModel,
  ): Promise<AuthorModel> {
    await this.authorRepository.update(id, data);
    return this.getAuthorById(id) as Promise<AuthorModel>;
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
