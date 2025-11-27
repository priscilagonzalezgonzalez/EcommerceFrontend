import { useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import type { Product } from "../../schemas/product.schema";
import {Toaster, toast} from 'react-hot-toast'
import ProductService from "../../services/Product.Service";

const AddToCart = ({ product, showToast }: { product: Product; showToast: () => void }) => {
    const [quantity, setQuantity] = useState(1);

    const reduceQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const incrementQuantity = () => {
        // Check the product stock
        if(product.stock < quantity+1) {
            toast.error(`We're sorry. There are no more than ${quantity} product in stock.`);
            return;
        }
        setQuantity(quantity + 1);
    }

    const addItemToCart = useCartStore((state) => state.addItemToCart);

    const OnAddCartItem = () => {
        // We can add the SSE here
        if (product.stock == 0) {
            toast.error("We're sorry. This product is out of stock");
            return;
        }

        const cartItem = {
            productId: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            quantity: quantity,
            subtotal: product.price * quantity,
            stock: product.stock
        };
        addItemToCart(cartItem);

        // Change Stock
        ProductService.modifyStock(product.id.toString(), product.stock - quantity);

        showToast();
    }

    return(
        <>
        <div className="flex gap-4 poppins-regular py-8">
            <div className="grid grid-cols-3 gap-2 border rounded-lg p-2 border-light-gray w-[120px]">
                <button 
                onClick={reduceQuantity}
                className="cursor-pointer hover:text-dark-gold hover:font-bold"> - </button>
                <p className="text-center"> {quantity} </p>
                <button 
                onClick={incrementQuantity}
                className="cursor-pointer hover:text-dark-gold hover:font-bold"> + </button>
            </div>
            <button 
            onClick={OnAddCartItem}
            className="text-dark-gold border rounded-lg px-12 cursor-pointer hover:bg-dark-gold hover:text-white">
                Add To Cart
            </button>
            <button className="text-dark-gold border rounded-lg px-12 cursor-pointer hover:bg-dark-gold hover:text-white">
                + Compare
            </button>

            <Toaster
            position="bottom-center"
            />
        </div>
        </>
    )
}

export default AddToCart;