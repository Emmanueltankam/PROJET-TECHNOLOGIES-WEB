import { useState } from 'react'
import type { CreateAuthorModel } from '../AuthorModel'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { validateImageUrl } from '../../books/utils/validateImageUrl'

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photo, setPhoto] = useState('')
  const [isValidImage, setIsValidImage] = useState(true)

  const handleValidateImage = (url: string) => {
    if (!url) {
      setIsValidImage(true)
      return
    }

    validateImageUrl(url).then(valid => setIsValidImage(valid))
  }

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setPhoto('')
    setIsValidImage(true)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Créer un auteur
      </Button>
      <Modal
        title="Créer un auteur"
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            ...(photo && { photo }),
          })
          onClose()
        }}
        okButtonProps={{
          disabled:
            !firstName?.length ||
            !lastName?.length ||
            Boolean(photo && !isValidImage),
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <div style={{ marginBottom: photo && !isValidImage ? '4px' : '0' }}>
            <Input
              type="text"
              placeholder="URL de la photo (optionnel)"
              value={photo}
              status={photo && !isValidImage ? 'error' : ''}
              onChange={e => {
                const url = e.target.value
                setPhoto(url)
                handleValidateImage(url)
              }}
            />
            {photo && !isValidImage && (
              <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
                L&apos;URL doit pointer vers une image valide
              </div>
            )}
          </div>
          {photo && isValidImage && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={photo}
                alt="Aperçu"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  setPhoto('')
                }}
              />
            </div>
          )}
        </Space>
      </Modal>
    </>
  )
}
