import { createFileRoute } from '@tanstack/react-router'
import Cart from '../../components/cart/Cart'

export const Route = createFileRoute('/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  return < Cart/>
}
