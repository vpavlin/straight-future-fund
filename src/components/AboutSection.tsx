import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            About the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Straight Training Center
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our aim is to support the community in Fuoni Mambosasa in educational matters, 
                especially learning English. We help people who live challenging lives by teaching 
                them to read and write, and learn different languages to create employment 
                opportunities for themselves, including becoming tour guides in the tourism industry.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We also support children who need help with school subjects so they can excel 
                in their education. Our focus is on providing quality educational opportunities 
                that empower young minds with practical skills for successful futures.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">200+</div>
                    <div className="text-sm text-muted-foreground">Students Served</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Years Operating</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h3 className="text-xl font-semibold text-primary mb-3">Our Activities</h3>
                <p className="text-muted-foreground">
                  We teach English to children and teenagers from Fuoni Mambosasa every evening 
                  from 7pm to 9pm, especially those from disadvantaged backgrounds or orphans, 
                  providing opportunities to practice through debates, role plays, theatres, and games.
                </p>
              </Card>
              
              <Card className="p-6 border-secondary/20 bg-secondary/5">
                <h3 className="text-xl font-semibold text-secondary mb-3">Safe Learning Space</h3>
                <p className="text-muted-foreground">
                  We provide students with a safe space to express themselves, feel at home, 
                  belong to a family-like community, have role models and peers, and most 
                  importantly, have fun while learning.
                </p>
              </Card>
              
              <Card className="p-6 border-accent/20 bg-accent/5">
                <h3 className="text-xl font-semibold text-accent-foreground mb-3">Our Impact</h3>
                <p className="text-muted-foreground">
                  Creating employment opportunities through language skills, supporting academic 
                  success, and building a stronger, more educated community in Fuoni Mambosasa.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}