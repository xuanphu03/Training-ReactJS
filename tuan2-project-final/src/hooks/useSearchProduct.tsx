import React from 'react';
import type { Product } from './useProduct';


const useSearchProduct = (search: string) => {
  const [dataList, setDataList] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.in/api/products`
        );
        const result = await response.json();
        setDataList(() => result.products.filter((product: Product) => 
          product.title.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
        ));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return { dataList, setDataList, loading, error };
};

export default useSearchProduct;
