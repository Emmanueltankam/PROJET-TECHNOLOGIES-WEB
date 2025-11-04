import { Injectable } from '@nestjs/common';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getAllBooks(
      input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    return this.bookRepository.getAllBooks(input);
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    return this.bookRepository.getBookById(id);
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    // Ajout de la gestion des nouveaux champs
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
      id: string,
      book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.getBookById(id);
    if (!oldBook) {
      return undefined;
    }

    // Fusionner les anciennes données avec les nouvelles données pour la mise à jour
    const updatedBook = {
      ...oldBook,
      ...book,
    };

    return this.bookRepository.updateBook(id, updatedBook);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}