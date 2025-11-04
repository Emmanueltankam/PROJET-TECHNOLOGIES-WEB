import { Layout as AntLayout, type MenuProps, Menu, Space } from 'antd'
import { Link } from '@tanstack/react-router'
import { BookOutlined, UserOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons'

import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books'
import { Route as clientsRoute } from './routes/clients'

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
      label: <Link to={clientsRoute.to}> Clients</Link>,
      key: 'clients',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          width: '100%',
          backgroundColor: '#395E66',
          color: 'white',
        }}
      >
        <h2 style={{ marginTop: '0' }}>📚Babel&apos;s Library</h2>
        <Menu mode="horizontal" items={items} />
      </div>
      <div style={{ width: '100%', overflowY: 'scroll' }}>{children}</div>
    </Space>
  )
}
