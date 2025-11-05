import { Link } from "@tanstack/react-router";

const CheckoutButton = () => {
    return (
        <>
        <Link to="/checkout">
            <button className="border w-[222px] h-[56px] rounded-2xl poppins-regular text-xl cursor-pointer hover:bg-medium-gold hover:text-white">
                Check Out
            </button>
        </Link>
        
        </>
    )
}

export default CheckoutButton;