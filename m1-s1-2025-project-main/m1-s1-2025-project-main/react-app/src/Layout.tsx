import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as booksRoute } from './routes/books'
import { Route as authorsRoute } from './routes/authors'
import { Route as clientsRoute } from './routes/clients'
import { Route as salesRoute } from './routes/sales'
import type { MenuProps } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={salesRoute.to}>Ventes</Link>,
      key: 'sales',
      icon: <ShoppingCartOutlined />,
    },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: '250px',
          backgroundColor: '#395E66',
          color: 'white',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0', fontSize: '1.5rem' }}>
            Babel&apos;s Library
          </h2>
        </div>
        <Menu
          mode="vertical"
          items={items}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
          theme="dark"
        />
      </div>
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
