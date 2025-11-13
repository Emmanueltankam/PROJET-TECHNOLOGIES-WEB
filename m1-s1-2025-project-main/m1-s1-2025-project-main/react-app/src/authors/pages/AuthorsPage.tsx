import { AuthorList } from '../components/AuthorList'

export function AuthorsPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#395E66' }}>
        Gestion des Auteurs
      </h1>
      <AuthorList />
    </div>
  )
}
