import type { Product as ProductType } from "../../schemas/product.schema";
import AddToCart from "./AddToCart";
import ProductColor from "./ProductColor";
import ProductSize from "./ProductSize";
import Navigation from '../../components/Navigation'
import toast from 'react-hot-toast'

const Product = ( {product}: {product: ProductType}  ) => {

    const onAddToCart = () => toast.success('Added to cart!');

    return (
        <>
        
        <Navigation productName = {product.name} productId = {product.id}/>
        <div className="grid grid-cols-2 gap-10 p-10">
            <img src={product.image} alt="" className="h-[500px] rounded-xl w-[500px]" />
            <div>
                <h1 className="text-4xl poppins-regular">{product.name}</h1>
                
                <p className="text-2xl poppins-medium text-light-gray pt-4">{`$${product.price}`}</p>
                
                <p className="poppins-regular text-lg pt-4">{product.description}</p>

                <ProductSize />

                <ProductColor />

                <AddToCart product={product} showToast={onAddToCart}/>

            </div>
        </div>
        
        </>
    )
}

export default Product;