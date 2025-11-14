import { useState } from 'react'
import { Button, Modal, Form, DatePicker, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSaleProvider } from '../providers/useSaleProvider'
import { useClientProvider } from '../../clients/providers/useClientProvider'
import { useBookProvider } from '../../books/providers/useBookProvider'
import type { CreateSaleModel } from '../models/SaleModel'

/**
 * Composant modal pour créer une nouvelle vente
 *
 * Permet de :
 * - Sélectionner un client
 * - Sélectionner un livre
 * - Définir la date de l'achat
 * - Créer l'enregistrement de vente
 *
 * @param onCreate Callback appelée après création d'une vente
 */
interface CreateSaleModalProps {
  onCreate?: () => void
}

export function CreateSaleModal({ onCreate }: CreateSaleModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { createSale } = useSaleProvider()
  const { clients, loadClients } = useClientProvider()
  const { books, loadBooks } = useBookProvider()

  /**
   * Charge les clients et livres au premier affichage de la modal
   */
  const handleShowModal = async () => {
    setIsModalVisible(true)
    await Promise.all([loadClients(), loadBooks()])
  }

  /**
   * Traite la soumission du formulaire
   */
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()

      setLoading(true)

      const saleData: CreateSaleModel = {
        clientId: values.clientId,
        bookId: values.bookId,
        purchaseDate: values.purchaseDate.toDate(),
      }

      await createSale(saleData)
      form.resetFields()
      setIsModalVisible(false)

      if (onCreate) {
        onCreate()
      }
    } catch (error) {
      console.error('Erreur lors de la création de la vente:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Ferme la modal
   */
  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleShowModal}
        style={{ marginBottom: '1rem' }}
      >
        Nouvelle Vente
      </Button>

      <Modal
        title="Créer une nouvelle vente"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Créer"
        cancelText="Annuler"
        loading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Client"
            name="clientId"
            rules={[
              { required: true, message: 'Veuillez sélectionner un client' },
            ]}
          >
            <Select
              placeholder="Sélectionner un client"
              optionLabelProp="label"
            >
              {clients.map(client => (
                <Select.Option key={client.id} value={client.id}>
                  {client.firstName} {client.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Livre"
            name="bookId"
            rules={[
              { required: true, message: 'Veuillez sélectionner un livre' },
            ]}
          >
            <Select placeholder="Sélectionner un livre">
              {books.map(book => (
                <Select.Option key={book.id} value={book.id}>
                  {book.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date d'achat"
            name="purchaseDate"
            rules={[
              {
                required: true,
                message: 'Veuillez sélectionner une date',
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
