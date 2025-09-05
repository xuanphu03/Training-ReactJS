import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './_component/ProductPagination';

export default function HelloWorld() {
  const router = useNavigate();


  return (
    <section className="min-h-[90vh] flex items-center justify-center flex-col gap-5">
      <h1 className="font-bold text-5xl">
        Demo <span className="text-purple-400"> Product</span>
      </h1>
      <Button className="cursor-pointer" onClick={() => router('/products')}>
        Sản phẩm
      </Button>
      <div>
        <ProductPagination />
      </div>
    </section>
  );
}
