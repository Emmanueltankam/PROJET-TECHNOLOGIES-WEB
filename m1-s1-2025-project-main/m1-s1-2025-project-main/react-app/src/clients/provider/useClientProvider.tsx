// Gère la liste des clients dans le localStorage.

import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

export type ClientModel = {
  id: string
  nom: string
  prenom: string
  email?: string
  photoUrl?: string
}

const STORAGE_KEY = 'clients_v1'

export function useClientProvider() {
  const [clients, setClients] = useState<ClientModel[]>([])

  // Charger les clients au montage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setClients(JSON.parse(raw))
      } catch {
        setClients([])
      }
    }
  }, [])

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
  }, [clients])

  const createClient = (input: Omit<ClientModel, 'id'>) => {
    const newClient = { ...input, id: uuid() }
    setClients(prev => [newClient, ...prev])
  }

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id))
  }

  return { clients, createClient, deleteClient }
}
