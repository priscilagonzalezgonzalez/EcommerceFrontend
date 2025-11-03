import CheckoutBanner from "./Banner";
import CheckoutBill from "./CheckoutBill";
import Form from "./Form";

const Checkout = () => {

    return (
        <>
        <CheckoutBanner />
        <div className="flex gap-30 px-25">
            <Form/>
            <CheckoutBill />
        </div>
        </>
    );
}

export default Checkout;