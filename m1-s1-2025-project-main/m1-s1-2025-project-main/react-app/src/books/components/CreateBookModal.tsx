// =====================
// 📘 CreateBookModal.tsx
// =====================

import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  // Fonction passée par le parent (BooksPage) pour créer le livre
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState<number | undefined>(undefined)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const { authors, loadAuthors } = useBookAuthorsProviders()

  // Charger les auteurs au montage
  useEffect(() => {
    loadAuthors()
  }, [])

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setTitle('')
    setYearPublished(undefined)
    setAuthorId(undefined)
  }

  const handleOk = () => {
    if (!title) {
      message.error('Le titre est requis')
      return
    }
    if (!authorId) {
      message.error('Sélectionnez un auteur')
      return
    }

    // Envoie au parent
    onCreate({
      title,
      authorId,
      yearPublished: yearPublished ?? new Date().getFullYear(),
    })
    close()
  }

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={open} style={{ margin: '1rem' }}>
        Create Book
      </Button>
      <Modal title="Create a book" open={isOpen} onOk={handleOk} onCancel={close}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <Select
            placeholder="Select an author"
            value={authorId}
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            onChange={value => setAuthorId(value)}
            style={{ width: '100%' }}
          />
          <Input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
          />
        </Space>
      </Modal>
    </>
  )
}
