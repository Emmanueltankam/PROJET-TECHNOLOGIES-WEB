import { useState, useEffect } from 'react'
import type { AuthorModel, UpdateAuthorModel } from '../AuthorModel'
import { Button, Input, Modal, Space, Spin } from 'antd'
import { DeleteOutlined, EditOutlined, BookOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { validateImageUrl } from '../../books/utils/validateImageUrl'
import { useAuthorBooks } from '../providers/useAuthorBooks'

interface AuthorListItemProps {
  author: AuthorModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export function AuthorListItem({
  author,
  onDelete,
  onUpdate,
}: AuthorListItemProps) {
  const [firstName, setFirstName] = useState(author.firstName)
  const [lastName, setLastName] = useState(author.lastName)
  const [tempFirstName, setTempFirstName] = useState(author.firstName)
  const [tempLastName, setTempLastName] = useState(author.lastName)
  const [tempPhoto, setTempPhoto] = useState(author.photo || '')
  const [isValidImage, setIsValidImage] = useState(true)
  const [isPhotoValid, setIsPhotoValid] = useState(true)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // Hook pour récupérer les livres de l'auteur
  const { books, loading } = useAuthorBooks(author.id)

  const showEditModal = () => {
    setTempFirstName(author.firstName)
    setTempLastName(author.lastName)
    setTempPhoto(author.photo || '')
    setIsValidImage(true)
    setIsEditModalVisible(true)
  }

  useEffect(() => {
    if (author.photo) {
      validateImageUrl(author.photo).then(valid => setIsPhotoValid(valid))
    } else {
      setIsPhotoValid(false)
    }
  }, [author.photo])

  const handleEditConfirm = () => {
    onUpdate(author.id, {
      firstName: tempFirstName,
      lastName: tempLastName,
      ...(tempPhoto && { photo: tempPhoto }),
    })
    setIsEditModalVisible(false)
    setFirstName(tempFirstName)
    setLastName(tempLastName)
  }

  const handleEditCancel = () => {
    setTempFirstName(author.firstName)
    setTempLastName(author.lastName)
    setTempPhoto(author.photo || '')
    setIsEditModalVisible(false)
  }

  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(author.id)
    setIsDeleteModalVisible(false)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '160px',
        border: '1px solid #e9ecef',
        marginBottom: '1rem',
      }}
    >
      {/* Section de l'image à gauche */}
      <div
        style={{
          width: '140px',
          height: '140px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          margin: '1rem',
          borderRadius: '8px',
          border: '2px solid #e9ecef',
        }}
      >
        {author.photo && isPhotoValid ? (
          <img
            src={author.photo}
            alt={`${author.firstName} ${author.lastName}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '6px',
            }}
          />
        ) : (
          <div
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e6eef0 0%, #cdd9dc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              color: '#395E66',
              fontWeight: 700,
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(57, 94, 102, 0.15)',
            }}
          >
            {author.firstName ? author.firstName.charAt(0) : '👤'}
          </div>
        )}
      </div>

      {/* Section des détails au centre */}
      <div style={{ flex: 1, padding: '2rem 1.5rem' }}>
        {/* Nom principal en grand */}
        <div
          style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '1rem',
            letterSpacing: '0.5px',
          }}
        >
          {firstName} {lastName}
        </div>

        {/* Détails organisés horizontalement */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            color: '#666',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            <span
              style={{
                fontSize: '0.9rem',
                color: '#888',
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              Prénom:
            </span>
            <span style={{ fontWeight: '500', color: '#333' }}>
              {firstName}
            </span>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            <span
              style={{
                fontSize: '0.9rem',
                color: '#888',
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              Nom:
            </span>
            <span style={{ fontWeight: '500', color: '#333' }}>{lastName}</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'flex-start',
          }}
        >
          <Button
            type="primary"
            onClick={showEditModal}
            style={{
              borderRadius: '6px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <EditOutlined /> Modifier
          </Button>
          <Button
            type="primary"
            danger
            onClick={showDeleteConfirm}
            style={{
              borderRadius: '6px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <DeleteOutlined /> Supprimer
          </Button>
        </div>
      </div>

      {/* Section des livres à droite */}
      <div
        style={{
          width: '300px',
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderLeft: '1px solid #e9ecef',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            color: '#495057',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <BookOutlined />
          Livres de l'auteur ({books.length})
        </div>

        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <Spin />
          </div>
        ) : books.length > 0 ? (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {books.map((book, index) => (
              <Link
                key={book.id || index}
                to="/books/$bookId"
                params={{ bookId: book.id }}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #dee2e6',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa'
                    e.currentTarget.style.borderColor = '#adb5bd'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.borderColor = '#dee2e6'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#212529' }}>
                    {book.title}
                  </div>
                  {book.yearPublished && (
                    <div style={{ color: '#6c757d', fontSize: '0.75rem' }}>
                      {book.yearPublished}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              color: '#6c757d',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '2rem 0',
            }}
          >
            Aucun livre trouvé pour cet auteur
          </div>
        )}
      </div>
      <Modal
        title="Modification"
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
            placeholder="Prénom de l'auteur"
          />
          <Input
            value={tempLastName}
            onChange={e => setTempLastName(e.target.value)}
            placeholder="Nom de l'auteur"
          />
          <div
            style={{
              marginBottom: tempPhoto && !isValidImage ? '4px' : '0',
            }}
          >
            <Input
              value={tempPhoto}
              onChange={e => {
                const url = e.target.value
                setTempPhoto(url)
                if (!url) {
                  setIsValidImage(true)
                  return
                }
                validateImageUrl(url).then(valid => setIsValidImage(valid))
              }}
              placeholder="URL de la photo (optionnel)"
              status={tempPhoto && !isValidImage ? 'error' : ''}
            />
            {tempPhoto && !isValidImage && (
              <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
                L&apos;URL doit pointer vers une image valide
              </div>
            )}
          </div>

          {tempPhoto && isValidImage && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={tempPhoto}
                alt="Aperçu"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  setTempPhoto('')
                }}
              />
            </div>
          )}
        </Space>
      </Modal>
      <Modal
        title="Confirmer la suppression"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Supprimer"
        cancelText="Annuler"
      >
        <p>
          Êtes-vous sûr de vouloir supprimer l'auteur &quot;{firstName}{' '}
          {lastName}&quot; ?
        </p>
      </Modal>
    </div>
  )
}
