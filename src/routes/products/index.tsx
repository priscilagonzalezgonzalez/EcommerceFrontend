import { createFileRoute } from '@tanstack/react-router'
import Products from '../../components/products/Products'

export const Route = createFileRoute('/products/')({

  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Products />
    </div>
}
