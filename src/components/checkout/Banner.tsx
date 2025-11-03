import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo.png";
import background from "../../assets/banner.jpg"

const CheckoutBanner = () => {

    return (
        <>
        <div className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat h-[316px] opacity-50" style={{backgroundImage: `url(${background})`}}>
            <img src={logo} alt="" className="h-[77px] block blur-none"/>
            <h1 className="block poppins-medium text-5xl pb-5">Checkout</h1>
            <div className="flex gap-2 items-center blur-none">
                <Link to="/products" className="poppins-medium text-base">
                    Home
                </Link>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

                <div className="">
                    <Link to="/checkout" className="poppins-medium text-base">
                        Checkout
                    </Link>
                </div>

            </div>
            
        </div>
        </>
    )
}

export default CheckoutBanner;