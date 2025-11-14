import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'

export function BookList() {
  const { books, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <>
      <CreateBookModal onCreate={createBook} />
      <div
        style={{
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {books.map(book => (
          <BookListItem
            key={book.id}
            book={book}
            onDelete={deleteBook}
            onUpdate={updateBook}
          />
        ))}
      </div>
    </>
  )
}
