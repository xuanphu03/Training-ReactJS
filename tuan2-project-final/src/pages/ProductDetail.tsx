import { Button } from '@/components/ui/button';
import { addToCart } from '@/features/shoppingCartSlice';
import useProduct from '@/hooks/useProduct';
import type { AppDispatch } from '@/stores/store';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { dataDetail, loading } = useProduct(id);

  const router = useNavigate();

  const handleClick = () => {
    router('/shopping-cart');
    dispatch(addToCart({ ...dataDetail! }));
  };
  return (
    <div>
      <h1>ProductDetail {id}</h1>
      {loading && <p>Loading...</p>}
      {dataDetail && (
        <div>
          <h2>Tên sản phẩm: {dataDetail.title}</h2>
          <p>Danh mục: {dataDetail.category}</p>
          <p>Mô tả: {dataDetail.description}</p>
          <p>Giá: ${dataDetail.price}</p>
          <img
            className="w-52 h-52"
            src={dataDetail.image}
            alt={dataDetail.title}
          />
          <Button onClick={handleClick}>Thêm vào giỏ hàng</Button>
        </div>
      )}
    </div>
  );
}
