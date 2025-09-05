import useProduct from '@/hooks/useProduct';
import ListProduct from './ListProduct';
import React from 'react';
import { cn } from '@/lib/utils';

const MAX_PAGE = 15; // Giới hạn API của người ta ghi thế

export default function ProductPagination() {
  const { dataList, setPagination } = useProduct();
  const [page, setPage] = React.useState(1);
  const listNumber = new Array(MAX_PAGE).fill(0).map((_, i) => i + 1);

  const handleChangePage = (page: number) => {
    setPage(page);
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-5">
      <h2>Sản phẩm</h2>
      <ListProduct listProduct={dataList} />

      <div className="flex gap-2">
        {listNumber.map((number) => (
          <span
            onClick={() => handleChangePage(number)}
            key={number}
            className={cn(
              'cursor-pointer border px-3 py-1 rounded-md hover:bg-purple-400 hover:text-white',
              page === number ? 'bg-purple-400 text-white' : ''
            )}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
}
