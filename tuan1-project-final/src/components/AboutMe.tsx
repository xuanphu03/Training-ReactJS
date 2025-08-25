import { useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export default function AboutMe() {
  const SKILL = [
    'Hiểu rõ quy trình phát triển phần mềm (Software Development Life Cycle).',
    'Có kinh nghiệm làm việc với RESTful API.',
    'Yêu thích clean code, reusable components và áp dụng best practices.',
    'Khả năng học hỏi nhanh, cập nhật công nghệ mới.',
  ];

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 justify-center text-center">
      <div className="min-h-[90vh] flex items-center justify-center flex-col gap-5">
        <h1 className="font-bold text-5xl">
          Xin chào, tôi là <span className="text-purple-400"> Xuân Phú</span>
        </h1>
        <p className="text-xl">Tôi là một lập trình viên ở XinKGroup.</p>

        <Button onClick={handleClick}>Khám phá thêm</Button>
      </div>

      <div
        ref={ref}
        id="about"
        className="min-h-screen w-full flex flex-col gap-5 items-center justify-center relative"
      >
        <div className='z-10'>
          <h2 className="font-bold text-3xl">Giới thiệu</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Mình là một Web Developer với niềm đam mê xây dựng các ứng dụng web
            hiện đại, tối ưu trải nghiệm người dùng và dễ dàng mở rộng.
          </p>
        </div>

        <div className="flex w-full z-10">
          {SKILL.map((item) => (
            <Card
              key={item}
              className="m-4 flex-1 flex items-center justify-center"
            >
              <CardContent>
                <p className="text-lg font-semibold">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="absolute -indent-0 bg-amber-50 w-screen h-screen opacity-40" />
      </div>
    </section>
  );
}
