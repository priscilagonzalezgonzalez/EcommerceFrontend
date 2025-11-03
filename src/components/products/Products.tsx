import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navigation from '../../components/Navigation'
import ProductService from "../../services/Product.Service";
import type { Product, ProductsResponse } from "../../schemas/product.schema";
import LoadMoreButton from "./LoadMoreButton";
import { Link } from "@tanstack/react-router";

const Products = () => {
    const queryClient = useQueryClient();
    // States
    const [page, setPage] = useState(1);
    const limitItemsPerPage = 8;
    const [itemsLimit, setItemsLimit] = useState(limitItemsPerPage);
    const [totalItems, setTotalItems] = useState(0);
    
    // Services
    const productService = new ProductService();

    // Functions
    const getAllProducts = async (): Promise<ProductsResponse> => {
        const response = await productService.getAll(page, itemsLimit);
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

    //const [products, setProducts] = useState<Product[]>([]);
    

    if(isLoading) {
        return(
            <div>
                <b>Loading...</b>
            </div>
        )
    }

    return(
        <>
        
        <Navigation/>
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
                    await showMoreMutation()
                    handleShowMore;
                } catch (error) {
                    console.log(error);
                }  
            }
        }/>}
        </>
        
        
    )
}

export default Products;