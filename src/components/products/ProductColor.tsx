
const ProductColor = () => {
    return(
        <>
        
        <p className="py-5 poppins-regular text-base text-light-gray">Color</p>
        <div className="flex gap-3 ">
            <div className="w-[30px] h-[30px] rounded-full bg-medium-purple hover:bg-light-purple cursor-pointer"></div>
            <div className="w-[30px] h-[30px] rounded-full bg-black hover:bg-transparent-gray cursor-pointer"></div>
            <div className="w-[30px] h-[30px] rounded-full bg-medium-gold hover:bg-light-gold cursor-pointer"></div>
        </div>
        
        </>
    )
}

export default ProductColor;