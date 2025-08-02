import { Card } from "@/components/ui/card";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import data from "@/data.json";

const imageAssets = {
  "gallery-1.jpg": gallery1,
  "gallery-2.jpg": gallery2,
  "gallery-3.jpg": gallery3,
  "gallery-4.jpg": gallery4
};

export function PhotoGallery() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.gallery.title.split(' ')[0]}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {data.gallery.title.split(' ')[1]}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.gallery.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.gallery.images.map((image, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={imageAssets[image.src as keyof typeof imageAssets]}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm text-white/90">{image.alt}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {data.gallery.visitMessage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.gallery.visitMessage.description}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}