import { useCartStore } from "../../stores/useCartStore";

const CheckoutBill = () => {
    const items = useCartStore( (state) => state.items);
    const total = useCartStore( (state) => state.total);
    const formattedTotal = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total);

    return(
        <>
        <div className="py-15 w-[608px]">
           <div className="flex justify-between ">
                <p className="poppins-medium text-2xl">Product</p>
                <p className="poppins-medium text-2xl">Subtotal</p>
            </div> 
            {
                Array.from(items.values()).map((item) => {
                    const formattedSub = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(item.subtotal);
                    return (
                    <div key={item.productId} className="flex justify-between pt-4">
                        <p className="poppins-regular text-md">{`${item.name} x ${item.quantity}`}</p>
                        <p className="poppins-regular text-md">{`$${formattedSub}`}</p>
                    </div>
                )})
            }
            

            <div className="flex justify-between pt-4">
                <p className="poppins-regular text-md">Total</p>
                <p className="poppins-bold text-2xl text-dark-gold">{`$${formattedTotal}`}</p>
            </div> 
        </div>
        
        </>
    );
}

export default CheckoutBill