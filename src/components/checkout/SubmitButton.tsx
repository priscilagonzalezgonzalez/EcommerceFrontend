import { useCartStore } from "../../stores/useCartStore";

const SubmitButton = () => {
    const totalItems = useCartStore((state) => state.totalItems);

    return(
        <div className="flex justify-center">
            <button 
            disabled={totalItems == 0}
            type="submit" 
            className="border rounded-xl w-[318px] h-[64px] poppins-regular text-lg cursor-pointer hover:text-white hover:bg-medium-gold
            disabled:bg-gray-400 disabled:cursor-not-allowed">
                Place order
            </button>
        </div>
    )
}

export default SubmitButton;