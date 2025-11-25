import Alert from "@mui/material/Alert"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import OrderService from "../../services/OrderService"
import { type Order, formSchema, type FormSchema  } from "../../schemas/order.schema"
import { useCartStore } from "../../stores/useCartStore"


const Form = () => {
    const items = useCartStore((state) => state.items);
    const total = useCartStore((state) => state.total);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });
    
    const onSubmit: SubmitHandler<FormSchema> = async (data) => {

        const order: Order = {
            status: "pending",
            total: total,
            shippingDetails: data,
            orderProducts: Array.from(items.values())
        }
        console.log(order);
        const orderService = new OrderService();
        orderService.createOrder(order);
    };
    
    // Debug: Log validation errors
    console.log("Form errors:", errors);

    return(
        <>
        <div className="py-15 w-[608px]">
            <h1 className="poppins-semibold text-4xl">Billing details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="py-8">
                <div>
                    <p className="pb-4 poppins-medium">Full Name
                        <span className="text-red-500 ml-1">*</span>
                    </p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2"
                        {...register("customerName")}/>
                        {errors.customerName && <div className="pt-1"> <Alert severity="error" >{errors.customerName.message}</Alert> </div>}
                    
                </div>

                <div>
                    <p className="py-5 poppins-medium">Country
                        <span className="text-red-500 ml-1">*</span>
                    </p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2" 
                    {...register("country" )}/>
                    {errors.country && <div className="pt-1"> <Alert severity="error" >{errors.country.message}</Alert> </div>}
                </div>

                <div>
                    <p className="py-5 poppins-medium">Town / City
                        <span className="text-red-500 ml-1">*</span>
                    </p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2" 
                    {...register("city")} />
                    {errors.city && <div className="pt-1"> <Alert severity="error" >{errors.city.message}</Alert> </div>}
                </div>

                <div>
                    <p className="py-5 poppins-medium">Street address
                        <span className="text-red-500 ml-1">*</span>    
                    </p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2"
                    {...register("street")}/>
                    {errors.street && <div className="pt-1"> <Alert severity="error" >{errors.street.message}</Alert> </div>}
                </div>

                <div>
                    <p className="py-5 poppins-medium">ZIP code
                        <span className="text-red-500 ml-1">*</span>
                    </p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2"
                    {...register("zipCode")}/>
                    {errors.zipCode && <div className="pt-1"> <Alert severity="error" >{errors.zipCode.message}</Alert> </div>}
                </div>

                <div>
                    <p className="py-5 poppins-medium">Phone</p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2"
                    {...register("phone")} />
                    {errors.phone && <div className="pt-1"> <Alert severity="error" >{errors.phone.message}</Alert> </div>}
                </div>

                <div className="pb-15">
                    <p className="py-5 poppins-medium">Email address</p>
                    <input type="text" id="" className="border border-light-gray rounded-md h-[55px] w-full p-2" 
                    { ...register("email") } />
                    {errors.email && <div className="pt-1"> <Alert severity="error" >{errors.email.message}</Alert> </div>}
                </div>

                <div className="flex justify-center">
                    <button disabled={isSubmitting} type="submit" className="border rounded-xl w-[318px] h-[64px] poppins-regular text-lg cursor-pointer hover:text-white hover:bg-medium-gold">
                        {isSubmitting ? "Loading" : "Place order"}
                    </button>
                </div>
                
            </form>
        </div>
        </>
    )
}

export default Form;