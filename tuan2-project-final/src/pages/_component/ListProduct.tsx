import { Button } from '@/components/ui/button';
import { addToCart } from '@/features/shoppingCartSlice';
import type { Product } from '@/hooks/useProduct';
import type { AppDispatch } from '@/stores/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ListProduct({
  listProduct,
}: {
  listProduct: Product[];
}) {
  const router = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleClickProduct = (id: number) => {
    router(`/products/${id}`);
  };
  return (
    <section className="grid grid-cols-5 gap-4">
      {listProduct.map((product) => (
        <div
          key={product.id}
          className="border p-4 m-2"
          onClick={() => handleClickProduct(product.id)}
        >
          <h2 className="line-clamp-2">{product.title}</h2>
          <p>Giá: ${product.price.toLocaleString()}</p>
          <p>Danh mục: {product.category}</p>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '200px' }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = './vite.svg';
            }}
          />
          <Button onClick={(e) => {
            e.stopPropagation();
            alert('Thêm vào giỏ hàng thành công');
            dispatch(addToCart(product));
          }}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      ))}
    </section>
  );
}
