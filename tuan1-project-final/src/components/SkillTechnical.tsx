import { Code, Palette, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function SkillTechnical() {
  const SKILLS = [
    {
      category: 'Frontend Development',
      icon: Code,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend Development',
      icon: Palette,
      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools & Platforms',
      icon: Smartphone,
      skills: ['Git', 'Vercel', 'Figma'],
    },
  ];

  return (
    <section className="min-h-screen flex flex-col gap-8 items-center justify-center py-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="font-bold text-3xl">Kỹ năng và công nghệ</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Tôi làm việc với nhiều công nghệ khác nhau để hiện thực hóa ý tưởng.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {SKILLS.map((skill) => (
          <Card key={skill.category}>
            <CardHeader className="text-center">
              <skill.icon className="h-12 w-12 mx-auto text-accent mb-4" />
              <CardTitle>{skill.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {skill.skills.map((skillName) => (
                  <Badge key={skillName} variant="outline">
                    {skillName}
                  </Badge>
                ))}
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
