import { useEffect, useState } from 'react'
import axios from 'axios'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import {
  Button,
  Table,
  Input,
  Card,
  Space,
  Modal,
  Spin,
  Empty,
  Alert,
  Avatar,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'

interface ClientDetailProps {
  id: string
}

/**
 * Composant de détails d'un client
 *
 * Affiche les informations complètes d'un client :
 * - Prénom et nom
 * - Email
 * - Photo profil
 * - Liste des livres achetés avec dates
 * - Boutons de modification et suppression
 *
 * Fonctionnalités :
 * - Récupération des données depuis l'API
 * - Edition en ligne des informations du client
 * - Suppression du client avec confirmation
 * - Navigation retour vers la liste des clients
 * - Gestion des erreurs de chargement
 *
 * @param id - L'identifiant unique du client à afficher
 * @returns JSX Element - La page de détails du client
 */
export function ClientDetail({ id }: ClientDetailProps) {
  const navigate = useNavigate()
  const API_BASE_URL = 'http://localhost:3000'

  // État pour les données du client
  const [client, setClient] = useState<
    (ClientModel & { sales?: any[] }) | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // État pour la modification
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [tempFirstName, setTempFirstName] = useState('')
  const [tempName, setTempName] = useState('')
  const [tempEmail, setTempEmail] = useState('')
  const [tempPhotoUrl, setTempPhotoUrl] = useState('')

  // État pour la suppression
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  /**
   * Charge les détails du client depuis l'API au montage du composant
   */
  useEffect(() => {
    const loadClientDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`${API_BASE_URL}/clients/${id}`)
        setClient(response.data.data || response.data)
      } catch (err) {
        console.error('Erreur lors du chargement du client:', err)
        setError('Impossible de charger les détails du client')
      } finally {
        setLoading(false)
      }
    }

    loadClientDetails()
  }, [id])

  /**
   * Ouvre la modal de modification et initialise les valeurs temporaires
   */
  const showEditModal = () => {
    if (client) {
      setTempFirstName(client.firstName)
      setTempName(client.name)
      setTempEmail(client.email || '')
      setTempPhotoUrl(client.photoUrl || '')
      setIsEditModalVisible(true)
    }
  }

  /**
   * Valide et envoie la modification du client à l'API
   */
  const handleEditConfirm = async () => {
    if (!client) return

    try {
      const updateData: UpdateClientModel = {
        firstName: tempFirstName,
        name: tempName,
        email: tempEmail || undefined,
        photoUrl: tempPhotoUrl || undefined,
      }

      await axios.patch(`${API_BASE_URL}/clients/${client.id}`, updateData)

      // Recharge les données du client
      const response = await axios.get(`${API_BASE_URL}/clients/${id}`)
      setClient(response.data.data || response.data)
      setIsEditModalVisible(false)
    } catch (err) {
      console.error('Erreur lors de la modification:', err)
      setError('Erreur lors de la modification du client')
    }
  }

  /**
   * Annule la modification et ferme la modal
   */
  const handleEditCancel = () => {
    setIsEditModalVisible(false)
  }

  /**
   * Ouvre la modal de confirmation de suppression
   */
  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true)
  }

  /**
   * Valide la suppression du client et supprime via l'API
   */
  const handleDeleteConfirm = async () => {
    if (!client) return

    try {
      await axios.delete(`${API_BASE_URL}/clients/${client.id}`)
      setIsDeleteModalVisible(false)
      // Retour à la liste des clients après suppression
      await navigate({ to: '/clients' })
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      setError('Erreur lors de la suppression du client')
      setIsDeleteModalVisible(false)
    }
  }

  /**
   * Annule la suppression et ferme la modal
   */
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  /**
   * Retour à la liste des clients
   */
  const handleBackToList = () => {
    navigate({ to: '/clients' })
  }

  // Affichage du spinner pendant le chargement
  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <Spin size="large" />
      </div>
    )
  }

  // Affichage du message d'erreur
  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackToList}
          style={{ marginBottom: '1rem' }}
        >
          Retour à la liste
        </Button>
        <Alert message="Erreur" description={error} type="error" showIcon />
      </div>
    )
  }

  // Affichage du message vide si le client n'existe pas
  if (!client) {
    return (
      <div style={{ padding: '2rem' }}>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackToList}
          style={{ marginBottom: '1rem' }}
        >
          Retour à la liste
        </Button>
        <Empty
          description="Le client n'a pas été trouvé"
          style={{ marginTop: '2rem' }}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Bouton de retour à la liste */}
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={handleBackToList}
        style={{ marginBottom: '2rem' }}
      >
        Retour à la liste
      </Button>

      {/* Carte principale de détails du client */}
      <Card
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem',
          }}
        >
          {/* Section gauche : Informations du client */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
              }}
            >
              <Avatar size={80} icon={<UserOutlined />} src={client.photoUrl} />
              <div style={{ flex: 1 }}>
                {/* Prénom et nom du client */}
                <h1
                  style={{
                    margin: '0 0 0.5rem 0',
                    color: '#395E66',
                    fontSize: '2rem',
                  }}
                >
                  {client.firstName} {client.name}
                </h1>

                {/* Email du client */}
                {client.email && (
                  <div style={{ color: '#666', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Email :</span>
                    <span style={{ marginLeft: '0.5rem' }}>{client.email}</span>
                  </div>
                )}

                {/* Nombre de livres achetés */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 'bold', color: '#395E66' }}>
                    Livres achetés :
                  </span>
                  <span style={{ marginLeft: '0.5rem' }}>
                    {client.sales?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons d'action : Modifier et Supprimer */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
                paddingTop: '1rem',
                borderTop: '1px solid #eee',
              }}
            >
              <Button
                type="primary"
                size="large"
                icon={<EditOutlined />}
                onClick={showEditModal}
              >
                Modifier
              </Button>
              <Button
                type="primary"
                danger
                size="large"
                icon={<DeleteOutlined />}
                onClick={showDeleteConfirm}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Section des livres achetés */}
      <Card
        title="Livres achetés"
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {client.sales && client.sales.length > 0 ? (
          <Table
            dataSource={client.sales}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            columns={[
              {
                title: 'Titre',
                dataIndex: ['book', 'title'],
                key: 'title',
                render: (_, record) => (
                  <a href={`/books/${record.book.id}`}>{record.book.title}</a>
                ),
              },
              {
                title: 'Auteur',
                key: 'author',
                render: (_, record) =>
                  `${record.book.author.firstName} ${record.book.author.lastName}`,
              },
              {
                title: "Date d'achat",
                dataIndex: 'purchaseDate',
                key: 'purchaseDate',
                render: date =>
                  new Date(date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
              },
            ]}
          />
        ) : (
          <Empty description="Aucun livre acheté" />
        )}
      </Card>

      {/* Modal de modification du client */}
      <Modal
        title="Modifier le client"
        open={isEditModalVisible}
        onOk={handleEditConfirm}
        onCancel={handleEditCancel}
        okText="Enregistrer"
        cancelText="Annuler"
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Champ du prénom */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Prénom
            </label>
            <Input
              value={tempFirstName}
              onChange={e => setTempFirstName(e.target.value)}
              placeholder="Prénom"
            />
          </div>

          {/* Champ du nom */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Nom
            </label>
            <Input
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              placeholder="Nom"
            />
          </div>

          {/* Champ de l'email */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </label>
            <Input
              type="email"
              value={tempEmail}
              onChange={e => setTempEmail(e.target.value)}
              placeholder="email@exemple.com"
            />
          </div>

          {/* Champ de la photo profil */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Photo profil (URL)
            </label>
            <Input
              value={tempPhotoUrl}
              onChange={e => setTempPhotoUrl(e.target.value)}
              placeholder="https://..."
            />
            {tempPhotoUrl && (
              <div style={{ marginTop: '0.5rem' }}>
                <img
                  src={tempPhotoUrl}
                  alt="Aperçu"
                  style={{
                    maxWidth: '100px',
                    maxHeight: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
        </Space>
      </Modal>

      {/* Modal de confirmation de suppression */}
      <Modal
        title="Confirmer la suppression"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Supprimer"
        okType="danger"
        cancelText="Annuler"
      >
        <p>
          Êtes-vous sûr de vouloir supprimer le client{' '}
          <strong>
            {client.firstName} {client.name}
          </strong>
          ?
        </p>
        <p style={{ color: '#ff4d4f', marginTop: '1rem' }}>
          Cette action est irréversible.
        </p>
      </Modal>
    </div>
  )
}
