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
                The Straight Training Center is a vital educational institution in Zanzibar, 
                dedicated to providing quality training and education opportunities for local students. 
                Our mission is to empower young minds with practical skills and knowledge that will 
                help them build successful futures.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Located in the heart of Zanzibar, our center focuses on technology education, 
                vocational training, and personal development. We believe that every student 
                deserves access to modern educational resources and opportunities.
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
                <h3 className="text-xl font-semibold text-primary mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide accessible, high-quality education and training that empowers 
                  students with the skills needed for the digital age.
                </p>
              </Card>
              
              <Card className="p-6 border-secondary/20 bg-secondary/5">
                <h3 className="text-xl font-semibold text-secondary mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become Zanzibar's leading training center, bridging the gap between 
                  traditional education and modern technological demands.
                </p>
              </Card>
              
              <Card className="p-6 border-accent/20 bg-accent/5">
                <h3 className="text-xl font-semibold text-accent-foreground mb-3">Our Impact</h3>
                <p className="text-muted-foreground">
                  Creating opportunities for local youth to develop technical skills, 
                  fostering innovation, and building a stronger community.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}