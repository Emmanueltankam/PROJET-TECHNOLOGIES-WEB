import type { ClientId } from '../clients/client.entity';
import type { BookId } from '../books/entities/book.entity';

export type ClientInfo = {
  id: string;
  firstName: string;
  name: string;
};

export type BookInfo = {
  id: string;
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
};

export type SaleModel = {
  id: string;
  purchaseDate: Date;
  clientId: ClientId;
  bookId: BookId;
  client: ClientInfo;
  book: BookInfo;
};

export type CreateSaleModel = {
  purchaseDate: Date;
  clientId: ClientId;
  bookId: BookId;
};
