import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
  }
  
  public async getById(id: string) {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(
    id: string, 
    data: UpdateAuthorModel,
  ): Promise<AuthorModel> {
    return this.authorRepository.updateAuthor(id, data);
  }
  
  public async deleteAuthor(id: string) {
    return this.authorRepository.deleteAuthor(id);
  }
}
