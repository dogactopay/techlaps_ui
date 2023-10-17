import { useCallback } from 'react';

import { useProductsContext } from './ProductsContextProvider';
import { IProduct } from 'models';
import { getProducts } from 'services/products';

const useProducts = () => {
  const {
    isFetching,
    setIsFetching,
    products,
    setProducts,
    filters,
    setFilters,
  } = useProductsContext();

  const fetchProducts = useCallback(() => {
    setIsFetching(true);
    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      setProducts(products);
    });
  }, [setIsFetching, setProducts]);

  const filterProducts = (filters: string[]) => {
    setIsFetching(true);

    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      let filteredProducts;

      if (filters && filters.length > 0) {
        filteredProducts = products.filter((p: IProduct) =>
          filters.find((filter: string) => p.stock_qty > 0)
        );
      } else {
        filteredProducts = products;
      }

      setFilters(filters);
      setProducts(filteredProducts);
    });
  };
  const filterProductsWord = (filters: string) => {
    setIsFetching(true);

    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      let filteredProducts;

   console.log(filters)
        filteredProducts = products.filter(
          (p: IProduct) => p.title.toLowerCase().includes(filters)
        );
    

      setProducts(filteredProducts);
    });
  };

  return {
    isFetching,
    fetchProducts,
    products,
    filterProducts,
    filterProductsWord,
    filters,
  };
};

export default useProducts;
