import { useEffect, useState } from 'react'
import axios from 'axios'
import type { SaleModel, CreateSaleModel } from '../SaleModel'
import {
  Button,
  Table,
  Modal,
  Form,
  Select,
  DatePicker,
  Space,
  Spin,
  Empty,
  Alert,
  Card,
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ClientModel } from '../../clients/ClientModel'
import type { BookModel } from '../../books/BookModel'

/**
 * Composant de liste des ventes
 *
 * Affiche toutes les ventes enregistrées dans le système avec :
 * - Informations du client
 * - Informations du livre
 * - Date d'achat
 * - Actions (suppression)
 *
 * Permet de :
 * - Ajouter une nouvelle vente (client + livre + date)
 * - Supprimer une vente existante
 * - Voir l'historique complet des ventes
 *
 * @returns JSX Element - Le composant de liste des ventes
 */
export function SaleList() {
  const API_BASE_URL = 'http://localhost:3000'

  // État pour les ventes
  const [sales, setSales] = useState<SaleModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // État pour la création de vente
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [clients, setClients] = useState<ClientModel[]>([])
  const [books, setBooks] = useState<BookModel[]>([])
  const [form] = Form.useForm()

  // État pour la suppression
  // (utilisé dans handleDeleteSale via Modal.confirm)

  /**
   * Charge toutes les ventes depuis l'API
   */
  const loadSales = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_BASE_URL}/sales`)
      setSales(response.data || response.data.data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des ventes:', err)
      setError('Impossible de charger les ventes')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Charge les clients disponibles pour la sélection
   */
  const loadClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients`)
      setClients(response.data.data || response.data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des clients:', err)
    }
  }

  /**
   * Charge les livres disponibles pour la sélection
   */
  const loadBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`)
      setBooks(response.data.data || response.data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des livres:', err)
    }
  }

  // Chargement initial au montage du composant
  useEffect(() => {
    loadSales()
    loadClients()
    loadBooks()
  }, [])

  /**
   * Ouvre la modal de création de nouvelle vente
   */
  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true)
  }

  /**
   * Crée une nouvelle vente
   */
  const handleCreateSale = async (values: {
    clientId: string
    bookId: string
    purchaseDate: any
  }) => {
    try {
      const saleData: CreateSaleModel = {
        clientId: values.clientId,
        bookId: values.bookId,
        purchaseDate: values.purchaseDate.format('YYYY-MM-DD'),
      }

      await axios.post(`${API_BASE_URL}/sales`, saleData)
      setIsModalVisible(false)
      form.resetFields()
      await loadSales()
    } catch (err) {
      console.error('Erreur lors de la création de la vente:', err)
      setError('Erreur lors de la création de la vente')
    }
  }

  /**
   * Supprime une vente
   */
  const handleDeleteSale = async (id: string) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer cette vente ?',
      okText: 'Supprimer',
      cancelText: 'Annuler',
      okType: 'danger',
      onOk: async () => {
        try {
          await axios.delete(`${API_BASE_URL}/sales/${id}`)
          await loadSales()
        } catch (err) {
          console.error('Erreur lors de la suppression:', err)
          setError('Erreur lors de la suppression de la vente')
        }
      },
    })
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
    return <Alert message="Erreur" description={error} type="error" showIcon />
  }

  return (
    <div>
      {/* Bouton pour ajouter une nouvelle vente */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Ajouter une vente
        </Button>
      </div>

      {/* Tableau des ventes dans une card */}
      <Card
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {sales.length > 0 ? (
          <Table
            dataSource={sales}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            columns={[
              {
                title: 'Client',
                key: 'client',
                render: (_, record) =>
                  `${record.client.firstName} ${record.client.name}`,
              },
              {
                title: 'Livre',
                key: 'book',
                render: (_, record) => record.book.title,
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
                render: (date: string) =>
                  new Date(date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (_, record) => (
                  <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteSale(record.id)}
                  >
                    Supprimer
                  </Button>
                ),
              },
            ]}
          />
        ) : (
          <Empty description="Aucune vente enregistrée" />
        )}
      </Card>

      {/* Modal de création de vente */}
      <Modal
        title="Ajouter une nouvelle vente"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateSale}
          style={{ marginTop: '1rem' }}
        >
          {/* Sélection du client */}
          <Form.Item
            label="Client"
            name="clientId"
            rules={[
              { required: true, message: 'Veuillez sélectionner un client' },
            ]}
          >
            <Select placeholder="Choisir un client">
              {clients.map(client => (
                <Select.Option key={client.id} value={client.id}>
                  {client.firstName} {client.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Sélection du livre */}
          <Form.Item
            label="Livre"
            name="bookId"
            rules={[
              { required: true, message: 'Veuillez sélectionner un livre' },
            ]}
          >
            <Select placeholder="Choisir un livre">
              {books.map(book => (
                <Select.Option key={book.id} value={book.id}>
                  {book.title} - {book.author.firstName} {book.author.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Sélection de la date */}
          <Form.Item
            label="Date d'achat"
            name="purchaseDate"
            rules={[
              { required: true, message: 'Veuillez sélectionner une date' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Boutons d'action */}
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setIsModalVisible(false)}>Annuler</Button>
            <Button type="primary" htmlType="submit">
              Ajouter la vente
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  )
}
