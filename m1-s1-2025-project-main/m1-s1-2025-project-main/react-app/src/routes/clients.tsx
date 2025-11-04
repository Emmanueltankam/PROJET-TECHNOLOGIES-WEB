// Route principale du module Clients.

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/clients')({
  component: () => <Outlet />,
})
