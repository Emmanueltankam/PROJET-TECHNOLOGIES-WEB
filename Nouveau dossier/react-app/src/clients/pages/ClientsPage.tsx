import { ClientList } from '../components/ClientList'

export function ClientsPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#395E66' }}>
        Gestion des Clients
      </h1>
      <ClientList />
    </div>
  )
}
