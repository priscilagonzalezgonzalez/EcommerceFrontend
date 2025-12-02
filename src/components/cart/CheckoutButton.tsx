import { Link } from "@tanstack/react-router";
import { useCartStore } from "../../stores/useCartStore";

const CheckoutButton = () => {
    const totalItems = useCartStore((state) => state.totalItems);

    return (
        <>
        <Link to="/checkout">
            <button 
            disabled={totalItems === 0} 
            className="border w-[222px] h-[56px] rounded-2xl poppins-regular text-xl cursor-pointer hover:bg-medium-gold hover:text-white
            disabled:bg-gray-400 disabled:cursor-not-allowed">
                Check Out
            </button>
        </Link>
        
        </>
    )
}

export default CheckoutButton;