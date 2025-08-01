import logos from "@/assets/logos.svg"; // Adjust the import path as necessary
import zanzalu from "@/assets/zanzalu.png"; // Adjust the import path as necessary

export function SupportedBy() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            Supported by
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            {/* Logos placeholder */}
            <div className="flex flex-col items-center group">
              <div className="w-32 h-16 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
                <img src={logos} alt="Logos.co" className="max-w-full max-h-full object-contain" />
              </div>
              <a 
                href="https://logos.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                logos.co
              </a>
            </div>

            {/* Zanzalu placeholder */}
            <div className="flex flex-col items-center group">
              <div className="w-32 h-16 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
                <img src={zanzalu} alt="Zanzalu" className="max-w-full max-h-full object-contain" />
              </div>
              <a 
                href="https://zanzalu.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                zanzalu.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}