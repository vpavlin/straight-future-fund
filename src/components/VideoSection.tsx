import { Button } from "@/components/ui/button";

export function VideoSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Support the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">Straight Training Center</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help us provide quality education and training to students in Zanzibar. 
            Together, we can build a brighter future through education.
          </p>
          
          <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8 bg-black">
            <div className="aspect-video">
              <iframe
                src="https://player.vimeo.com/video/661729589?h=a5b8a1f8c8&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Straight Training Center Project"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="donate" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('donation-methods')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Donate Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}