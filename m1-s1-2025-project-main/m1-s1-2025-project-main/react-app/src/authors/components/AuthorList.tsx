import { useEffect } from 'react'
import { useAuthorProvider } from '../providers/useAuthorProvider.tsx'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'

export function AuthorList() {
  const { authors, loadAuthors, deleteAuthor, updateAuthor, createAuthor } =
    useAuthorProvider()

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  return (
    <>
      <CreateAuthorModal onCreate={createAuthor} />
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {authors.map(author => (
          <AuthorListItem
            key={author.id}
            author={author}
            onDelete={deleteAuthor}
            onUpdate={updateAuthor}
          />
        ))}
      </div>
    </>
  )
}
