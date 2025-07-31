import { VideoSection } from "@/components/VideoSection";
import { AboutSection } from "@/components/AboutSection";
import { DonationGoals } from "@/components/DonationGoals";
import { DonationMethods } from "@/components/DonationMethods";
import { FAQ } from "@/components/FAQ";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <VideoSection />
      <AboutSection />
      <DonationGoals />
      <DonationMethods />
      <FAQ />
      <PhotoGallery />
      <Footer />
    </div>
  );
};

export default Index;
