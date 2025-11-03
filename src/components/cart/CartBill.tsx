import CheckoutButton from "./CheckoutButton";

const CartBill = () => {
    const subtotal = 100;
    const total = 100;

    return(
        <>
        <div className="w-[393px] h-[390px] bg-light-brown flex flex-col justify-center items-center px-25 rounded-md">
            <h1 className="poppins-semibold text-3xl">Cart Totals</h1>
            <div className="flex justify-between w-full py-10">
                <p className="poppins-medium text-base">Subtotal</p>
                <p>{subtotal}</p>
            </div>
            <div className="flex justify-between w-full pb-10">
                <p className="poppins-medium text-base">Total</p>
                <p className="poppins-medium text-dark-gold text-xl">{`$ ${total}`}</p>
            </div>
            <CheckoutButton />
        </div>
        </>
    );
}


export default CartBill;