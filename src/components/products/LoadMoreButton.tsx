const LoadMoreButton = ({ onShowMore }: { onShowMore: () => void }) => {


    return(
        <>
        <div className="flex justify-center ">
            <button className="cursor-pointer text-center text-medium-gold poppins-semibold my-8 text-base border-medium-gold border py-3 px-18 hover:bg-dark-gold hover:text-white rounded-lg"
                onClick={onShowMore}>Show More</button>
        </div>
            
        </>
    )
}

export default LoadMoreButton