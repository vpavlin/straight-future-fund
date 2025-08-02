import { Card, CardContent } from "@/components/ui/card";
import data from "@/data.json";

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            About the
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
              Straight Training Center
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {data.about.description1}
                </p>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {data.about.description2}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{data.about.stats.studentsServed}</div>
                    <div className="text-sm text-muted-foreground">Students Served</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">{data.about.stats.yearsOperating}</div>
                    <div className="text-sm text-muted-foreground">Years Operating</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h3 className="text-xl font-semibold text-primary mb-3">{data.about.activities.title}</h3>
                <p className="text-muted-foreground">
                  {data.about.activities.description}
                </p>
              </Card>
              
              <Card className="p-6 border-secondary/20 bg-secondary/5">
                <h3 className="text-xl font-semibold text-secondary mb-3">{data.about.safeSpace.title}</h3>
                <p className="text-muted-foreground">
                  {data.about.safeSpace.description}
                </p>
              </Card>
              
              <Card className="p-6 border-accent/20 bg-accent/5">
                <h3 className="text-xl font-semibold text-accent-foreground mb-3">{data.about.impact.title}</h3>
                <p className="text-muted-foreground">
                  {data.about.impact.description}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}