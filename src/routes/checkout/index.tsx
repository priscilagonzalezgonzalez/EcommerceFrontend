import { createFileRoute } from '@tanstack/react-router'

import Checkout from '../../components/checkout/Checkout'

export const Route = createFileRoute('/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Checkout />
  </div>
}
