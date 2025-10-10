
const ProductColor = () => {
    return(
        <>
        
        <p className="py-5 poppins-regular text-base text-light-gray">Color</p>
        <div className="flex gap-3 ">
            <div className="w-[30px] h-[30px] rounded-full bg-medium-purple hover:bg-light-purple"></div>
            <div className="w-[30px] h-[30px] rounded-full bg-black hover:bg-transparent-gray"></div>
            <div className="w-[30px] h-[30px] rounded-full bg-medium-gold hover:bg-light-gold"></div>
        </div>
        
        </>
    )
}

export default ProductColor;