
export default function Header() {
  const NAVIGATION = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Giới thiệu', path: '/#about' },
    { title: 'Liên hệ', path: '/#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex gap-4 p-4 mx-auto items-center justify-center">
        {NAVIGATION.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="hover:underline font-medium transition hover:duration-500 hover:ease-in-out"
          >
            {item.title}
          </a>
        ))}
      </div>
    </header>
  );
}
