
const CheckoutBill = () => {

    return(
        <>
        <div className="py-15 w-[608px]">
           <div className="flex justify-between ">
                <p className="poppins-medium text-2xl">Product</p>
                <p className="poppins-medium text-2xl">Subtotal</p>
            </div> 

            <div className="flex justify-between pt-4">
                <p className="poppins-regular text-md">{`Asgaard sofa    x 1000`}</p>
                <p className="poppins-regular text-md">Subtotal</p>
            </div> 

            <div className="flex justify-between pt-4">
                <p className="poppins-regular text-md">Total</p>
                <p className="poppins-bold text-2xl text-dark-gold">$250,000.00</p>
            </div> 
        </div>
        
        </>
    );
}

export default CheckoutBill