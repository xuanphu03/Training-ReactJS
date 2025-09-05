import React from 'react';
import useProduct, { type Product } from '@/hooks/useProduct';
import { Button } from '@/components/ui/button';
import ListProduct from './_component/ListProduct';
import { Input } from '@/components/ui/input';
import useSearchProduct from '@/hooks/useSearchProduct';

export default function ProductsPage() {
  const [isSearch, setIsSearch] = React.useState('');
  const { dataList, loading, pagination, setPagination } = useProduct();
  const { dataList: searchResults } = useSearchProduct(isSearch);
  const [listProduct, setListProduct] = React.useState<Product[]>(dataList);

  React.useEffect(() => {
    setListProduct((prev) => {
      const newProducts = dataList.filter(
        (item) => !prev.some((p) => p.id === item.id)
      );
      return [...prev, ...newProducts];
    });
  }, [dataList]);

  const handleLoadMore = () => {
    setPagination({ ...pagination, page: pagination.page + 1 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListProduct(searchResults);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Danh sách sản phẩm</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="mb-4 flex gap-2">
        <Input
          onChange={(e) => setIsSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
        />
        <Button type="submit">Tìm kiếm</Button>
      </form>
      {loading && <p>Đang tải...</p>}
      <ListProduct listProduct={listProduct} />
      <Button onClick={handleLoadMore}>Xem thêm</Button>
    </div>
  );
}
