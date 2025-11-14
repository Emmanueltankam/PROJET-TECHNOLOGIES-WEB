import { useNavigate } from '@tanstack/react-router'
import './App.css'
import { Card, Row, Col } from 'antd'
import {
  BookOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

/**
 * App - Composant principal de la page d'accueil
 *
 * Affiche 4 cartes de navigation permettant à l'utilisateur d'accéder aux sections principales :
 * - Auteurs : Gestion des auteurs
 * - Livres : Gestion des livres
 * - Clients : Gestion des clients
 * - Ventes : Gestion des ventes/achats
 */
function App() {
  const navigate = useNavigate()

  // Données des cartes de navigation
  const navigationCards = [
    {
      key: 'authors',
      title: 'Auteurs',
      icon: UserOutlined,
      description: 'Gérer les auteurs',
      path: '/authors',
      color: '#395E66',
    },
    {
      key: 'books',
      title: 'Livres',
      icon: BookOutlined,
      description: 'Gérer les livres',
      path: '/books',
      color: '#395E66',
    },
    {
      key: 'clients',
      title: 'Clients',
      icon: ShoppingCartOutlined,
      description: 'Gérer les clients',
      path: '/clients',
      color: '#395E66',
    },
    {
      key: 'sales',
      title: 'Ventes',
      icon: FileTextOutlined,
      description: 'Gérer les ventes',
      path: '/sales',
      color: '#395E66',
    },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      {/* Titre de la page d'accueil */}
      <h1
        style={{ color: '#395E66', marginBottom: '2rem', textAlign: 'center' }}
      >
        Bienvenue dans la Gestion de Bibliothèque
      </h1>

      {/* Grille des cartes de navigation */}
      <Row gutter={[24, 24]}>
        {navigationCards.map(card => {
          const IconComponent = card.icon
          return (
            <Col xs={24} sm={12} lg={6} key={card.key}>
              {/* Carte cliquable pour accéder à chaque section */}
              <Card
                hoverable
                onClick={() => navigate({ to: card.path })}
                style={{
                  textAlign: 'center',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow =
                    '0 6px 16px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Icône */}
                <IconComponent
                  style={{
                    fontSize: '48px',
                    color: card.color,
                    marginBottom: '1rem',
                  }}
                />
                {/* Titre */}
                <h2 style={{ color: card.color, marginBottom: '0.5rem' }}>
                  {card.title}
                </h2>
                {/* Description */}
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {card.description}
                </p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default App
