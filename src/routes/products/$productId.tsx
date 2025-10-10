import { createFileRoute } from '@tanstack/react-router'
import Product from '../../components/products/Product'
import ProductService from '../../services/Product.Service';

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({params}) => {
    const id = params.productId;
    const productService = new ProductService();
    const product = await productService.getById(id);
    return {
      product,
    };
  },
});

function RouteComponent() {
  const { product } = Route.useLoaderData()
  return <div>
    <Product product={product} />
  </div>
}
