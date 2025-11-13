import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'
import { validateImageUrl } from '../utils/validateImageUrl'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState(0)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const [coverImage, setCoverImage] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [isValidImage, setIsValidImage] = useState(true)
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const handleValidateImage = (url: string) => {
    if (!url) {
      setIsValidImage(true)
      return
    }

    validateImageUrl(url).then(valid => setIsValidImage(valid))
  }

  const onClose = () => {
    setTitle('')
    setYearPublished(0)
    setCoverImage('')
    setDescription('')
    setGenre('')
    setIsValidImage(true)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Creéer un livre
      </Button>
      <Modal
        title="Creéer un livre"
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (!authorId) return
          onCreate({
            title,
            yearPublished,
            authorId,
            description,
            ...(coverImage && { coverImage }),
            ...(genre && { genre }),
          })
          onClose()
        }}
        okButtonProps={{
          disabled:
            !authorId ||
            !title?.length ||
            !yearPublished ||
            Boolean(coverImage && !isValidImage),
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Selectionner un auteur"
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            onChange={value => setAuthorId(value)}
          />
          <Input
            type="number"
            placeholder="Année de publication"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
          />
          <div
            style={{ marginBottom: coverImage && !isValidImage ? '4px' : '0' }}
          >
            <Input
              type="text"
              placeholder="URL de l'image (optionnel)"
              value={coverImage}
              status={coverImage && !isValidImage ? 'error' : ''}
              onChange={e => {
                const url = e.target.value
                setCoverImage(url)
                handleValidateImage(url)
              }}
            />
            {coverImage && !isValidImage && (
              <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
                L&apos;URL doit pointer vers une image valide
              </div>
            )}
          </div>
          {coverImage && isValidImage && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={coverImage}
                alt="Aperçu"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
          <Input
            type="text"
            placeholder="Genre (optionnel)"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
