import { useEffect, useState } from 'react';
import { RootState } from '@/lib/store/store';
import { selectProducts, setClearFilteredProducts } from '@/lib/store/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';


const useSearchProducts = (searchTerm: string) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [filteredProducts, setFilteredProducts] = useState<any>(products);
  
 console.log(products);
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(null);

    dispatch(setClearFilteredProducts());
    } else {
      setFilteredProducts(
        products.filter((product : any) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  return filteredProducts;
};

export default useSearchProducts;
