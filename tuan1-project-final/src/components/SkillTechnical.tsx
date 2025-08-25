import { Code, Palette, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function SkillTechnical() {
  return (
    <section className="min-h-screen flex flex-col gap-8 items-center justify-center py-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="font-bold text-3xl">Kỹ năng và công nghệ</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Tôi làm việc với nhiều công nghệ khác nhau để hiện thực hóa ý tưởng.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <Code className="h-12 w-12 mx-auto text-accent mb-4" />
            <CardTitle>Frontend Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Palette className="h-12 w-12 mx-auto text-accent mb-4" />
            <CardTitle>Backend Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">Node.js</Badge>
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">PostgreSQL</Badge>
              <Badge variant="outline">MongoDB</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Smartphone className="h-12 w-12 mx-auto text-accent mb-4" />
            <CardTitle>Tools & Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">Git</Badge>
              <Badge variant="outline">Vercel</Badge>
              <Badge variant="outline">Figma</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
