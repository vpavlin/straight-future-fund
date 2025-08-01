import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Thank you for supporting education in Zanzibar
          </h3>
          <p className="text-background/80 mb-8 max-w-2xl mx-auto">
            Every donation, no matter the size, makes a real difference in the lives of our students. 
            Together, we're building a brighter future through education and technology.
          </p>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent border-background text-background hover:bg-background hover:text-foreground"
            onClick={() => document.getElementById('donation-methods')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
          
          <div className="mt-8 pt-8 border-t border-background/20 text-background/60 text-sm">
            <p>© 2025 Straight Training Center. Building futures through education.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}