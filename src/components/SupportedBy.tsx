export function SupportedBy() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Supported by</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <a 
              href="https://zanzalu.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl font-bold text-primary mb-2">Zanzalu</div>
              <div className="text-muted-foreground text-sm">zanzalu.org</div>
            </a>
            
            <a 
              href="https://logos.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl font-bold text-primary mb-2">Logos</div>
              <div className="text-muted-foreground text-sm">logos.co</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}