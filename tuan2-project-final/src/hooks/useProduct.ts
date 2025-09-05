import React from 'react';

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  discount: number;
  description: string;
  image: string;
};

const useProduct = (id?: string) => {
  const [dataList, setDataList] = React.useState<Product[]>([]);
  const [dataDetail, setDataDetail] = React.useState<Product>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const [pagination, setPagination] = React.useState({ page: 1, limit: 10 });

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://fakestoreapi.in/api/products${id ? `/${id}` : ''}?limit=${
            pagination.limit
          }&page=${pagination.page}`
        );
        const result = await response.json();
        if (id) {
          setDataDetail(() => result.product);
        }
        setDataList(() => result.products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination, id]);

  return { dataList, dataDetail, loading, error, pagination, setPagination };
};

export default useProduct;
