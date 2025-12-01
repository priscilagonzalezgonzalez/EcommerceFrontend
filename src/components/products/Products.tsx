import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navigation from '../../components/Navigation'
import ProductService from "../../services/Product.Service";
import type { Product, ProductsResponse } from "../../schemas/product.schema";
import LoadMoreButton from "./LoadMoreButton";
import { Link } from "@tanstack/react-router";

const Products = () => {

    useEffect(() => {
        // Use environment variable for API URL, fallback to localhost if not set
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
        // SSE endpoint is at /api/v1/currentTime
        const sseUrl = `${apiUrl}/products-stream`;
        const timeEventSource = new EventSource(sseUrl);

        // Handle connection open
        timeEventSource.onopen = () => {
            console.log("✅ SSE Connection opened");
        };

        // Handle incoming messages
        timeEventSource.onmessage = (event) => {
            console.log("📨 SSE Message received:", event.data);

            // refetch query to get fresh items
            queryClient.invalidateQueries({ queryKey: ["allProductsResponse"] });
        };

        // Handle errors
        timeEventSource.onerror = (error) => {
            console.error("❌ SSE Error:", error);
            console.error("EventSource readyState:", timeEventSource.readyState);
            console.error("EventSource URL:", timeEventSource.url);
            // readyState: 0 = CONNECTING, 1 = OPEN, 2 = CLOSED
            if (timeEventSource.readyState === EventSource.CLOSED) {
                console.log("🔴 SSE Connection closed - Check if server is running and endpoint exists");
                console.log("💡 Try opening this URL in your browser:", timeEventSource.url);
            } 
        };

        // Cleanup: close the connection when component unmounts
        return () => {
            console.log("🧹 Cleaning up SSE connection");
            timeEventSource.close();
        };
    }, []); // Empty dependency array - only run once on mount

    const queryClient = useQueryClient();
    // Pagination States
    const [page, setPage] = useState(1);
    const limitItemsPerPage = 8;
    const [itemsLimit, setItemsLimit] = useState(limitItemsPerPage);
    const [totalItems, setTotalItems] = useState(0);

    // Functions
    const getAllProducts = async (): Promise<ProductsResponse> => {
        const response = await ProductService.getAll(page, itemsLimit);
        //setProducts(response.Products);
        setTotalItems(response.Pagination.totalItems);
        return response;
    }

    const handleShowMore = async  () => {
        // Check if we already grabbed all product items
        if(itemsLimit >= totalItems) {
            return;
        }
        
        const newPage = page + 1;
        const newLimit = limitItemsPerPage * newPage;

        setPage(newPage);
        setItemsLimit(newLimit);
    }

    // Tanstack Queries
    const { data: response, isLoading } = useQuery({
        queryFn: () => getAllProducts(),
        queryKey:["allProductsResponse"]
    });

    //Tanstack Mutations
    const { mutateAsync: showMoreMutation } = useMutation({
        mutationFn: handleShowMore,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProductsResponse"] });
        }
    });

    if(isLoading) {
        return(
            <div>
                <b>Loading...</b>
            </div>
        )
    }

    return(
        <>
        
        <Navigation productName = {undefined} productId = {undefined}/>
        
        <h1 className="poppins-bold text-center text-4xl p-10 text-bold-gray">Our Products</h1>
        <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-8 w-[1236px] auto-rows-[446px]">
            { response?.Products.map( (product: Product) => (
                
                <div key={product.id} className="h-full bg-light-BG">
                   <Link 
                    to="/products/$productId" 
                    params={{ productId: (product.id).toString() }}> 
                    <img src={product.image} alt="" className="h-[301px] w-full"/>
                    <div className="p-3">
                        <h2 className="poppins-semibold text-dark-gray text-xl pt-2">{product.name}</h2>
                        <p className="poppins-medium text-medium-gray text-justify text-base pt-2">{product.description}</p>
                        <p className="poppins-semibold text-dark-gray pt-2"> ${product.price}</p>
                    </div>
                   </Link> 
                </div>
               
            )) }
            </div>
        </div>
        {itemsLimit < totalItems && <LoadMoreButton onShowMore={
            async () => {
                try {
                    await showMoreMutation();
                } catch (error) {
                    console.log(error);
                }  
            }
        }/>}
        </>
        
        
    )
}

export default Products;