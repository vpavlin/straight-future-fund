import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "@/data.json";

export function FAQ() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.faq.title.split(' ').slice(0, 2).join(' ')}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {data.faq.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {data.faq.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {data.faq.questions.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-background shadow-sm"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Have a question that's not answered here?
            </p>
            <p className="text-sm text-muted-foreground">
              We'd love to hear from you! Reach out through any of our communication channels 
              or leave a comment with your donation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}