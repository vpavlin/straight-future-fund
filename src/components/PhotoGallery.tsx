import { Card } from "@/components/ui/card";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const galleryImages = [
  {
    src: gallery1,
    alt: "Students learning at computers in the training center",
    title: "Computer Training Sessions"
  },
  {
    src: gallery2,
    alt: "Students working on Raspberry Pi computers",
    title: "Hands-on Technology Learning"
  },
  {
    src: gallery3,
    alt: "Teacher instructing students in the classroom",
    title: "Collaborative Learning Environment"
  },
  {
    src: gallery4,
    alt: "Group photo of students and teachers",
    title: "Our Amazing Community"
  }
];

export function PhotoGallery() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Photo{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a look at life at the Straight Training Center and see the impact 
              your donations can make in our students' lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={image.src}
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
                  Visit Us in Person
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  These photos capture just a glimpse of the amazing work happening at our center. 
                  We welcome visitors who want to see our impact firsthand and meet our incredible 
                  students and teachers in Zanzibar.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}