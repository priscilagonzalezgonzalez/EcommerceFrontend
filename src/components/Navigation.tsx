import { Link } from "@tanstack/react-router";

const Navigation = () => {

    return(
        <>
        <div className="flex justify-between px-10 bg-light-brown h-[100px]">
            
            <div className="flex items-center text-light-gray text-base poppins-regular p-2 gap-10">
                <Link to="/products" className="">
                    Home
                </Link>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

                <div>
                    <Link to="/products" className="[&.active]:font-bold">
                        Shop
                    </Link>
                    
                </div>

                <div className="border-l border-l-2">
                    <Link to="/about" className="[&.active]:font-bold pl-10">
                        {"product"}
                    </Link>
                </div>
                
            </div>

        </div>
        
        </>
    );
}

export default Navigation;