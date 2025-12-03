import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

import { useCartStore } from '../../stores/useCartStore';
import { type CartItem } from '../../schemas/order-product.schema';
import toast, { Toaster } from 'react-hot-toast';

//const showToast = () => toast.success('Added to cart!');

function QuantityInput({ item }: { item: CartItem }) {
  const [inputValue, setInputValue] = useState(item.quantity.toString());
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const handleBlur = () => {
    const newQuantity = parseInt(inputValue);
    if (newQuantity > 0 && item.stock >= newQuantity) {
      updateItemQuantity({ ...item, quantity: newQuantity });
    } else {
        if (item.quantity < newQuantity) {
          toast.error(`We're sorry. There are no more than ${item.stock} product in stock.`);
        }
      setInputValue(item.quantity.toString());
    }
  };

  return (
    <input 
      type="number" 
      className='text-center border w-[32px] h-[32px] rounded-lg border-light-gray poppins-regular' 
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
    />
  );
}

export default function CartItems() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  
  const rows: CartItem[] = Array.from(items.values());

  return (
    <>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#F9F1E7', '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
            <TableRow>
                <TableCell></TableCell>
                <TableCell><p className='poppins-medium text-left'>Product</p></TableCell>
                <TableCell><p className='poppins-medium text-center'>Price</p></TableCell>
                <TableCell><p className='poppins-medium text-center'>Quantity</p></TableCell>
                <TableCell><p className='poppins-medium text-center'>Subtotal</p></TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => { 
            const formattedPrice = new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.price);

            const formattedSub = new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.subtotal);
            return (
            <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <img src={row.image} alt="" className='h-[90px] w-[111px] bg-light-brown rounded-lg'/>
                </TableCell>
                <TableCell component="th" scope="row">
                <p className='poppins-regular '>{row.name}</p>
                </TableCell>
                <TableCell align="center">
                <p className='poppins-regular text-center'>{formattedPrice}</p>
                </TableCell>
                <TableCell align="center">
                    <QuantityInput item={row} />
                </TableCell>
                <TableCell align="center">{formattedSub}</TableCell>
                <TableCell align="right" className='cursor-pointer'>
                <svg 
                  onClick={() => removeItem(row)}
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="size-4 text-dark-gold hover:text-red-500"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </TableCell>
            </TableRow>
            )})}
        </TableBody>
        </Table>
    </TableContainer>
    <Toaster
      position="bottom-center"
    />
    </>
  );
}
