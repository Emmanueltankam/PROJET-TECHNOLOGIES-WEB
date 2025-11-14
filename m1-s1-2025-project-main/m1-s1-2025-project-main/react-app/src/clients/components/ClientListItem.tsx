import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space, Avatar } from 'antd'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({
  client,
  onDelete,
  onUpdate,
}: ClientListItemProps) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [tempFirstName, setTempFirstName] = useState(client.firstName)
  const [tempName, setTempName] = useState(client.name)

  const showEditModal = () => {
    setTempFirstName(client.firstName)
    setTempName(client.name)
    setIsEditModalVisible(true)
  }

  const handleEditConfirm = () => {
    onUpdate(client.id, { firstName: tempFirstName, name: tempName })
    setIsEditModalVisible(false)
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
  }

  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(client.id)
    setIsDeleteModalVisible(false)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s',
        }}
        onMouseEnter={e =>
          (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)')
        }
        onMouseLeave={e =>
          (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')
        }
      >
        <Avatar
          size={48}
          icon={<UserOutlined />}
          src={client.photoUrl}
          style={{ marginRight: '1rem', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link
            to={`/clients/$clientId`}
            params={{ clientId: client.id }}
            style={{
              fontWeight: 'bold',
              color: '#395E66',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            {client.firstName} {client.name}
          </Link>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>
            {client.email || "Pas d'email"}
          </div>
        </div>
        <div style={{ color: '#555', marginRight: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            {client.bookCount ?? 0}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>Livres</div>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={showEditModal}
          >
            Modifier
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
          >
            Supprimer
          </Button>
        </Space>
      </div>

      <Modal
        title="Modifier le client"
        open={isEditModalVisible}
        onOk={handleEditConfirm}
        onCancel={handleEditCancel}
        okText="Enregistrer"
        cancelText="Annuler"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            value={tempFirstName}
            onChange={e => setTempFirstName(e.target.value)}
            placeholder="Prénom"
          />
          <Input
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            placeholder="Nom"
          />
        </Space>
      </Modal>

      <Modal
        title="Confirmer la suppression"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Supprimer"
        cancelText="Annuler"
        okType="danger"
      >
        <p>
          Êtes-vous sûr de vouloir supprimer le client{' '}
          <strong>
            {client.firstName} {client.name}
          </strong>
          ?
        </p>
      </Modal>
    </>
  )
}
