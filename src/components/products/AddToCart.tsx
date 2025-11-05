import { useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import type { Product } from "../../schemas/product.schema";

const AddToCart = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);

    const reduceQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const incrementQuantity = () => {
        // Check the product stock 
        setQuantity(quantity + 1);
    }

    const addItemToCart = useCartStore((state) => state.addItemToCart);

    const OnAddCartItem = () => {
        const cartItem = {
            productId: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            quantity: quantity,
            subtotal: product.price * quantity
        };
        addItemToCart(cartItem);
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
        </div>
        </>
    )
}

export default AddToCart;