import { Button } from "@/components/ui/button";
import { clearCart, removeFromCart } from "@/features/shoppingCartSlice";
import type { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingCart() {
  const items = useSelector((state: RootState) => state.shoppingCart.items);
  const total = useSelector((state: RootState) => state.shoppingCart.total);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Giỏ hàng</h2>
      <ul>
        {items.map((item) => (
          <li key={item.product.id} className='border grid grid-cols-4 gap-4 m-2 p-2'>
            <p>Tên sản phẩm: {item.product.title}</p>
            <p>Giá: {item.product.price}</p>
            <p>Số lượng: {item.quantity}</p>
            <Button onClick={() => dispatch(removeFromCart(item.product.id))}>
              Xóa
            </Button>
          </li>
        ))}
      </ul>
      <h3>Tổng tiền: {total}</h3>
      <div className="flex gap-4">
        <Button onClick={() => dispatch(clearCart())}>Xóa giỏ hàng</Button>
        <Button onClick={() => {
          if(items.length === 0) {
            alert('Giỏ hàng trống, không thể thanh toán');
            return;
          }
          alert('Thanh toán thành công');
          dispatch(clearCart());
        }}>Thanh toán</Button>
      </div>
    </div>
  );
}
