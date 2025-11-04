// Liste des clients + formulaire d'ajout simple.

import { useState } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { Button, Input, Space, List, Avatar } from 'antd'

export function ClientList() {
  const { clients, createClient, deleteClient } = useClientProvider()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  const handleCreate = () => {
    if (!nom || !prenom) {
      alert('Nom et prénom requis')
      return
    }
    createClient({ nom, prenom, email: email || undefined, photoUrl: photoUrl || undefined })
    setNom(''); setPrenom(''); setEmail(''); setPhotoUrl('')
  }

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
          <Input placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
          <Button type="primary" onClick={handleCreate}>OK</Button>
        </Space>
        <Input placeholder="Email (facultatif)" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Photo URL (facultatif)" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
        <List
          itemLayout="horizontal"
          dataSource={clients}
          renderItem={item => (
            <List.Item actions={[<Button danger onClick={() => deleteClient(item.id)}>Supprimer</Button>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.photoUrl} />}
                title={`${item.prenom} ${item.nom}`}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </Space>
    </div>
  )
}
