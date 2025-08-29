import { Card, CardContent } from '../components/ui/card';

export default function AboutMe() {
  const SKILL = [
    'Hiểu rõ quy trình phát triển phần mềm (Software Development Life Cycle).',
    'Có kinh nghiệm làm việc với RESTful API.',
    'Yêu thích clean code, reusable components và áp dụng best practices.',
    'Khả năng học hỏi nhanh, cập nhật công nghệ mới.',
  ];
  return (
    <section className="min-h-[90vh] w-full flex flex-col gap-5 items-center justify-center relative text-center">
      <div className="z-10">
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
    </section>
  );
}
