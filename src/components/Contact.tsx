import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, MapPin, Clock, ExternalLink, Facebook, Instagram } from "lucide-react";
import data from "@/data.json";

const iconMap = {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Facebook,
  Instagram
};

export const Contact = () => {
  const { contact } = data;

  const handleContactClick = (method: any) => {
    switch (method.type) {
      case "Phone":
        window.open(`tel:${method.value}`);
        break;
      case "Email":
        window.open(`mailto:${method.value}`);
        break;
      case "WhatsApp":
        window.open(`https://wa.me/${method.value.replace(/\s+/g, '').replace('+', '')}`);
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contact.methods.map((method, index) => {
            const IconComponent = iconMap[method.icon as keyof typeof iconMap];
            const isClickable = ["Phone", "Email", "WhatsApp"].includes(method.type);
            
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{method.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  {isClickable ? (
                    <Button
                      variant="outline"
                      onClick={() => handleContactClick(method)}
                      className="w-full"
                    >
                      {method.value}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <p className="font-medium text-foreground">{method.value}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {contact.socialMedia && contact.socialMedia.length > 0 && (
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Follow Us</h3>
            <div className="flex justify-center gap-4">
              {contact.socialMedia.map((social, index) => {
                const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(social.url, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-5 w-5" />
                    {social.platform}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{contact.visitInfo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-base">
              {contact.visitInfo.description}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};