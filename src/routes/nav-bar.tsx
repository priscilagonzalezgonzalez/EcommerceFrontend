import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nav-bar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nav-bar"!</div>
}
