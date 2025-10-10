import { useEffect, useState } from "react";
import ProductService from "../../services/Product.Service";
import type { Product } from "../../schemas/product.schema";
import LoadMoreButton from "./LoadMoreButton";
import { Link } from "@tanstack/react-router";

const Products = () => {
    const baseUrl = "/posts"
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const limitItemsPerPage = 8;
    const [itemsLimit, setItemsLimit] = useState(limitItemsPerPage);
    const [totalItems, setTotalItems] = useState(0);
    const productService = new ProductService();

    useEffect(() => {
        productService.getAll(page, itemsLimit).then( response => { 
            setProducts(response.Products);
            setTotalItems(response.Pagination.totalItems);
        });
    }, []);

    const handleShowMore = () => {
        // Check if we already grabbed all product items
        if(itemsLimit >= totalItems) {
            return;
        }
        
        const newPage = page + 1;
        const newLimit = limitItemsPerPage * newPage;
        
        productService.getAll(newPage, newLimit).then( response => { 
            setPage(newPage);
            setItemsLimit(newLimit);
            setProducts(response.Products);
        });
    }

    return(
        <>
        <h1 className="poppins-bold text-center text-4xl p-10 text-bold-gray">Our Products</h1>
        <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-8 w-[1236px] auto-rows-[446px]">
            { products.map( (product) => (
                
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
        {itemsLimit < totalItems && <LoadMoreButton onShowMore={handleShowMore}/>}
        </>
        
        
    )
}

export default Products;