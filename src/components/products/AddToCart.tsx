import { useState } from "react";

const AddToCart = () => {
    const [quantity, setQuantity] = useState(1);

    return(
        <>
        <div className="flex gap-4 poppins-regular py-8">
            <div className="grid grid-cols-3 gap-2 border rounded-lg p-2 border-light-gray w-[120px]">
                <button className="cursor-pointer hover:text-dark-gold hover:font-bold"> - </button>
                <p className="text-center"> {quantity} </p>
                <button className="cursor-pointer hover:text-dark-gold hover:font-bold"> + </button>
            </div>
            <button className="text-dark-gold border rounded-lg px-12 cursor-pointer hover:bg-dark-gold hover:text-white">
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