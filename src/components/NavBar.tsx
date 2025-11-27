import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const NavBar = () => {
    const totalItems = useCartStore((state) => state.totalItems);
    return(
        <>
        <div className="flex justify-between px-10 items-center">
            <div className="flex items-center h-[100px]">
                <img src={logo} alt="Furniro Logo" className="w-[50px] h-[50px]"/>
                <h1 className="text-3xl montserrat-bold">Furniro</h1>
            </div>
            
            <div className="p-2 flex gap-2 poppins-medium text-base gap-10">
                <Link to="/products" className="[&.active]:font-bold">
                    Home
                </Link>
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                <Link to="/contact" className="[&.active]:font-bold">
                    Contact
                </Link>
            </div>

            <div className="p-2 flex gap-2 poppins-medium text-base gap-10">
                <Link to="/about" className="[&.active]:font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                </Link>

                <Link to="/about" className="[&.active]:font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </Link>

                <Link to="/contact" className="[&.active]:font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                </Link>

                <Link to="/cart" className="[&.active]:font-bold relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    
                    {totalItems > 0 && (
                        <motion.div
                            key={totalItems}    
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 500,
                                damping: 15
                            }}
                            className="absolute -right-3 -top-5"
                        >
                            <div className="bg-medium-gold w-6 h-6 flex justify-center rounded-full">
                                <span className=" poppins-medium text-base text-white">{totalItems}</span>
                            </div>
                            
                        </motion.div>
                    )}
                    
                </Link>

                <Link to="/contact" className="[&.active]:font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                </Link>
            </div>

        </div>
        
        </>
    );
}

export default NavBar;