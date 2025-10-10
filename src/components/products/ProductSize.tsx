
const ProductSize = () => {
    return(
        <>
        <p className="py-5 poppins-regular text-base text-light-gray">Size</p>
        <div className="flex gap-3">
            <div className="text-sm w-[30px] h-[30px] rounded-md bg-light-gold flex items-center justify-center hover:bg-medium-gold">L</div>
            <div className="text-sm w-[30px] h-[30px] rounded-md bg-light-gold flex items-center justify-center hover:bg-medium-gold">XL</div>
            <div className="text-sm w-[30px] h-[30px] rounded-md bg-light-gold flex items-center justify-center hover:bg-medium-gold">XS</div>
        </div>
        </>
    )
}

export default ProductSize;