import { useEffect, useState } from 'react'
import axios from 'axios'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Card, Input, Modal, Space, Spin, Empty, Alert } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { validateImageUrl } from '../utils/validateImageUrl'

interface BookDetailsProps {
  id: string
}

/**
 * Composant de détails d'un livre
 *
 * Affiche les informations complètes d'un livre :
 * - Image de couverture
 * - Titre et nom de l'auteur
 * - Année de publication
 * - Genre
 * - Description complète
 * - Boutons de modification et suppression
 *
 * @param id - L'identifiant unique du livre à afficher
 * @returns JSX Element - La page de détails du livre
 */
export function BookDetails({ id }: BookDetailsProps) {
  const navigate = useNavigate()
  const API_BASE_URL = 'http://localhost:3000'

  // État pour les données du livre
  const [book, setBook] = useState<BookModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // État pour la modification
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [tempTitle, setTempTitle] = useState('')
  const [tempDescription, setTempDescription] = useState('')
  const [tempGenre, setTempGenre] = useState('')
  const [tempCoverImage, setTempCoverImage] = useState('')
  const [isValidImage, setIsValidImage] = useState(true)

  // État pour la suppression
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  /**
   * Charge les détails du livre depuis l'API au montage du composant
   */
  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`${API_BASE_URL}/books/${id}`)
        setBook(response.data.data || response.data)
      } catch (err) {
        console.error('Erreur lors du chargement du livre:', err)
        setError('Impossible de charger les détails du livre')
      } finally {
        setLoading(false)
      }
    }

    loadBookDetails()
  }, [id])

  /**
   * Ouvre la modal de modification et initialise les valeurs temporaires
   */
  const showEditModal = () => {
    if (book) {
      setTempTitle(book.title)
      setTempDescription(book.description || '')
      setTempGenre(book.genre || '')
      setTempCoverImage(book.coverImage || '')
      setIsValidImage(true)
      setIsEditModalVisible(true)
    }
  }

  /**
   * Valide et envoie la modification du livre à l'API
   */
  const handleEditConfirm = async () => {
    if (!book) return

    try {
      const updateData: UpdateBookModel = {
        title: tempTitle,
        // Envoyer undefined si le champ est vide, et non une chaîne vide
        ...(tempDescription ? { description: tempDescription } : {}),
        ...(tempGenre ? { genre: tempGenre } : {}),
        ...(tempCoverImage ? { coverImage: tempCoverImage } : {}),
      }

      await axios.patch(`${API_BASE_URL}/books/${book.id}`, updateData)

      // Recharge les données du livre
      const response = await axios.get(`${API_BASE_URL}/books/${id}`)
      setBook(response.data.data || response.data)
      setIsEditModalVisible(false)
    } catch (err) {
      console.error('Erreur lors de la modification:', err)
      setError('Erreur lors de la modification du livre')
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
   * Valide la suppression du livre et supprime via l'API
   */
  const handleDeleteConfirm = async () => {
    if (!book) return

    try {
      await axios.delete(`${API_BASE_URL}/books/${book.id}`)
      setIsDeleteModalVisible(false)
      // Retour à la liste des livres après suppression
      await navigate({ to: '/books' })
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      setError('Erreur lors de la suppression du livre')
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
   * Valide l'URL de l'image lors de sa modification
   */
  const handleCoverImageChange = async (url: string) => {
    setTempCoverImage(url)
    if (!url) {
      setIsValidImage(true)
      return
    }
    const valid = await validateImageUrl(url)
    setIsValidImage(valid)
  }

  /**
   * Retour à la liste des livres
   */
  const handleBackToList = () => {
    navigate({ to: '/books' })
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

  // Affichage du message vide si le livre n'existe pas
  if (!book) {
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
          description="Le livre n'a pas été trouvé"
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

      {/* Carte principale de détails du livre */}
      <Card
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '2rem',
          }}
        >
          {/* Section gauche : Image de couverture */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '2/3',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                  }}
                >
                  📚
                </div>
              )}
            </div>
          </div>

          {/* Section droite : Informations du livre */}
          <div>
            {/* Titre du livre */}
            <h1
              style={{
                margin: '0 0 0.5rem 0',
                color: '#395E66',
                fontSize: '2rem',
              }}
            >
              {book.title}
            </h1>

            {/* Auteur du livre */}
            <div style={{ color: '#666', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 'bold' }}>Auteur :</span>
              <span style={{ marginLeft: '0.5rem' }}>
                {book.author.firstName} {book.author.lastName}
              </span>
            </div>

            {/* Année de publication */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#395E66' }}>
                Année de publication :
              </span>
              <span style={{ marginLeft: '0.5rem' }}>{book.yearPublished}</span>
            </div>

            {/* Genre du livre */}
            {book.genre && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontWeight: 'bold', color: '#395E66' }}>
                  Genre :
                </span>
                <span style={{ marginLeft: '0.5rem' }}>{book.genre}</span>
              </div>
            )}

            {/* Description du livre */}
            <div
              style={{
                marginTop: '1.5rem',
                marginBottom: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #eee',
              }}
            >
              <h3 style={{ color: '#395E66', marginBottom: '0.5rem' }}>
                Description
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {book.description || 'Pas de description disponible'}
              </p>
            </div>

            {/* Boutons d'action : Modifier et Supprimer */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
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

      {/* Modal de modification du livre */}
      <Modal
        title="Modification du livre"
        open={isEditModalVisible}
        onOk={handleEditConfirm}
        onCancel={handleEditCancel}
        okText="Enregistrer"
        cancelText="Annuler"
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Champ du titre */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Titre du livre
            </label>
            <Input
              value={tempTitle}
              onChange={e => setTempTitle(e.target.value)}
              placeholder="Titre du livre"
            />
          </div>

          {/* Champ de l'image de couverture */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              URL de l&apos;image de couverture
            </label>
            <Input
              value={tempCoverImage}
              onChange={e => handleCoverImageChange(e.target.value)}
              placeholder="https://..."
              status={tempCoverImage && !isValidImage ? 'error' : ''}
            />
            {tempCoverImage && !isValidImage && (
              <div
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}
              >
                L&apos;URL doit pointer vers une image valide
              </div>
            )}
            {tempCoverImage && isValidImage && (
              <div style={{ marginTop: '8px' }}>
                <img
                  src={tempCoverImage}
                  alt="Aperçu"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    objectFit: 'contain',
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Champ du genre */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Genre
            </label>
            <Input
              value={tempGenre}
              onChange={e => setTempGenre(e.target.value)}
              placeholder="Ex: Science-fiction, Thriller, etc."
            />
          </div>

          {/* Champ de la description */}
          <div>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Description
            </label>
            <Input.TextArea
              value={tempDescription}
              onChange={e => setTempDescription(e.target.value)}
              placeholder="Description complète du livre"
              rows={4}
            />
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
          Êtes-vous sûr de vouloir supprimer le livre{' '}
          <strong>&quot;{book.title}&quot;</strong> ?
        </p>
        <p style={{ color: '#ff4d4f', marginTop: '1rem' }}>
          Cette action est irréversible.
        </p>
      </Modal>
    </div>
  )
}
