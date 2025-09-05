import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import type { AppDispatch, RootState } from '@/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/authSlice';

export default function Header() {
  const NAVIGATION = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Giới thiệu', path: '/login' },
    { title: 'Sản phẩm', path: '/products' },
    { title: 'Liên hệ', path: '/contact' },
  ];

  const user = useSelector((state: RootState) => state.auth);
  const { total } = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch<AppDispatch>();

  const router = useNavigate();

  return (
    <header className="grid grid-cols-3 px-4 items-center sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="col-start-2 justify-self-end container flex gap-4 p-4 mx-auto items-center justify-center">
        {NAVIGATION.map((item, index) => (
          <div
            key={index}
            onClick={() => router(item.path)}
            className="hover:underline font-medium transition cursor-pointer hover:duration-500 hover:ease-in-out"
          >
            {item.title}
          </div>
        ))}
      </div>
      {!user.userToken ? (
        <Button className="justify-self-end" onClick={() => router('/login')}>
          Đăng nhập
        </Button>
      ) : (
        <div className="justify-self-end flex items-center justify-center gap-5">
          <Button onClick={() => router('/shopping-cart')}>
            Giỏ hàng: {total}
          </Button>
          <p>{user.userInfo?.username}</p>
          <Button onClick={() => dispatch(logout())}>Đăng xuất</Button>
        </div>
      )}
    </header>
  );
}
