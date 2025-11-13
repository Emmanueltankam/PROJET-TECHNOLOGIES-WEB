import { Button, Skeleton, Space } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import { validateImageUrl } from '../utils/validateImageUrl'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const [isCoverValid, setIsCoverValid] = useState<boolean>(false)

  useEffect(() => {
    loadBook()
  }, [id])

  useEffect(() => {
    if (book?.coverImage) {
      validateImageUrl(book.coverImage).then(valid => setIsCoverValid(valid))
    } else {
      setIsCoverValid(false)
    }
  }, [book?.coverImage])

  if (isLoading) {
    return <Skeleton active />
  }

  if (!book) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Livre non trouvé</p>
        <Link to={booksRoute.to}>
          <Button icon={<ArrowLeftOutlined />}>Retour aux livres</Button>
        </Link>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f5f7f8',
        minHeight: '100vh',
      }}
    >
      {/* Bouton Retour */}
      <div
        style={{
          marginBottom: '2rem',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          paddingLeft: '1rem',
        }}
      >
        <Link to={booksRoute.to}>
          <Button icon={<ArrowLeftOutlined />} type="primary">
            Retour aux livres
          </Button>
        </Link>
      </div>

      {/* Container principal */}
      <div
        style={{
          width: '100%',
          padding: '2rem',
          display: 'flex',
          gap: '2rem',
        }}
      >
        {/* Section Image à gauche */}
        <div
          style={{
            width: '280px',
            height: '380px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            flexShrink: 0,
            border: '1px solid #e9ecef',
            overflow: 'hidden',
          }}
        >
          {book.coverImage && isCoverValid ? (
            <img
              src={book.coverImage}
              alt={book.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          ) : (
            <div
              style={{
                width: '150px',
                height: '200px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e6eef0 0%, #cdd9dc 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: '#395E66',
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(57, 94, 102, 0.15)',
              }}
            >
              {book.title ? book.title.charAt(0) : '📚'}
            </div>
          )}
        </div>

        {/* Section Détails à droite */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '2.5rem 2.5rem',
            border: '1px solid #e9ecef',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Titre du livre */}
            <div>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#000000',
                  margin: 0,
                  lineHeight: '1.3',
                  letterSpacing: '0.5px',
                }}
              >
                {book.title}
              </h1>
            </div>

            {/* Auteur */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                Auteur
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: '#333',
                }}
              >
                {book.author?.firstName} {book.author?.lastName}
              </div>
            </div>

            {/* Année de publication */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                Année de publication
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: '#333',
                }}
              >
                {book.yearPublished}
              </div>
            </div>

            {/* Genre */}
            {book.genre && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: '#888',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                  }}
                >
                  Genre
                </div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#333',
                    display: 'inline-block',
                    backgroundColor: '#f8f9fa',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '6px',
                    border: '1px solid #dee2e6',
                  }}
                >
                  {book.genre}
                </div>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: '#888',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                  }}
                >
                  Description
                </div>
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1.2rem',
                    borderRadius: '6px',
                    border: '1px solid #dee2e6',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#555',
                  }}
                >
                  {book.description}
                </div>
              </div>
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}
