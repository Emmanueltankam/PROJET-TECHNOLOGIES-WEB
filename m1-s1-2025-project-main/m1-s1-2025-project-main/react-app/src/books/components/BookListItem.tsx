import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Input, Modal, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { validateImageUrl } from '../utils/validateImageUrl'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [tempTitle, setTempTitle] = useState(book.title)
  const [tempCoverImage, setTempCoverImage] = useState(book.coverImage || '')
  const [tempDescription, setTempDescription] = useState(book.description || '')
  const [tempGenre, setTempGenre] = useState(book.genre || '')
  const [isValidImage, setIsValidImage] = useState(true)
  const [isCoverValid, setIsCoverValid] = useState(true)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const showEditModal = () => {
    setTempTitle(book.title)
    setTempCoverImage(book.coverImage || '')
    setTempDescription(book.description || '')
    setTempGenre(book.genre || '')
    setIsValidImage(true)
    setIsEditModalVisible(true)
  }

  useEffect(() => {
    if (book.coverImage) {
      validateImageUrl(book.coverImage).then(valid => setIsCoverValid(valid))
    } else {
      setIsCoverValid(false)
    }
  }, [book.coverImage])

  const handleEditConfirm = () => {
    onUpdate(book.id, {
      title: tempTitle,
      ...(tempCoverImage && { coverImage: tempCoverImage }),
      ...(tempDescription && { description: tempDescription }),
      ...(tempGenre && { genre: tempGenre }),
    })
    setIsEditModalVisible(false)
    setTitle(tempTitle)
  }

  const handleEditCancel = () => {
    setTempTitle(book.title)
    setIsEditModalVisible(false)
  }

  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(book.id)
    setIsDeleteModalVisible(false)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {book.coverImage && isCoverValid ? (
          <img
            src={book.coverImage}
            alt={book.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f7f8',
            }}
          >
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                background: '#e6eef0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: '#395E66',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {book.title ? book.title.charAt(0) : '📚'}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Link
            to={`/books/$bookId`}
            params={{ bookId: book.id }}
            style={{
              display: 'block',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#000000ff',
              marginBottom: '0.5rem',
            }}
          >
            {title}
          </Link>
          <div style={{ color: '#666' }}>
            Par{' '}
            <span style={{ fontWeight: 'bold' }}>
              {book.author.firstName} {book.author.lastName}
            </span>
          </div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>
            Année : {book.yearPublished}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
          }}
        >
          <Button type="primary" onClick={showEditModal}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={showDeleteConfirm}>
            <DeleteOutlined />
          </Button>
        </div>
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
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            placeholder="Titre du livre"
          />
          <div
            style={{
              marginBottom: tempCoverImage && !isValidImage ? '4px' : '0',
            }}
          >
            <Input
              value={tempCoverImage}
              onChange={e => {
                const url = e.target.value
                setTempCoverImage(url)
                if (!url) {
                  setIsValidImage(true)
                  return
                }
                validateImageUrl(url).then(valid => setIsValidImage(valid))
              }}
              placeholder="URL de l'image (optionnel)"
              status={tempCoverImage && !isValidImage ? 'error' : ''}
            />
            {tempCoverImage && !isValidImage && (
              <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
                L&apos;URL doit pointer vers une image valide
              </div>
            )}
          </div>

          {tempCoverImage && isValidImage && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={tempCoverImage}
                alt="Aperçu"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  setTempCoverImage('')
                }}
              />
            </div>
          )}
          <Input.TextArea
            placeholder="Description"
            value={tempDescription}
            onChange={e => setTempDescription(e.target.value)}
            rows={3}
          />
          <Input
            type="text"
            placeholder="Genre (optionnel)"
            value={tempGenre}
            onChange={e => setTempGenre(e.target.value)}
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
      >
        <p>Êtes-vous sûr de vouloir supprimer le livre &quot;{title}&quot; ?</p>
      </Modal>
    </div>
  )
}
