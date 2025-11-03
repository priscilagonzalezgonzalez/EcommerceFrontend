import CartBanner from "./Banner";
import CartItems from "./CartItems";
import CartBill from "./CartBill";

const Cart = () => {

    return(
        <>
        <CartBanner />
        <div className="flex pt-15 px-10 gap-10">
            <CartItems />
            <CartBill />
        </div>
        
        </>
    )
}

export default Cart;