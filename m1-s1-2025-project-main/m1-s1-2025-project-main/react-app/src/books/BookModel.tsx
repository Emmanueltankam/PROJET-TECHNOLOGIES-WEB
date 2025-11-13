export type BookModel = {
  id: string
  title: string
  yearPublished: number
  coverImage: string
  description?: string
  genre?: string
  author: {
    id: string
    firstName: string
    lastName: string
  }
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  coverImage?: string
  description?: string
  genre?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
