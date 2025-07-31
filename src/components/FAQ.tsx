import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is the Straight Training Center?",
    answer: "The Straight Training Center is an educational institution in Zanzibar focused on providing technology training and vocational education to local students. We aim to bridge the gap between traditional education and modern digital skills."
  },
  {
    question: "How will my donation be used?",
    answer: "Your donations go directly toward our five main goals: computer equipment (Raspberry Pi systems), yearly rent, educational trips for students, summer camps for teenagers, and eventually purchasing our own building. All funds are used transparently for educational purposes."
  },
  {
    question: "Are donations tax-deductible?",
    answer: "Tax deductibility depends on your local tax laws and regulations. We recommend consulting with a tax professional in your jurisdiction. We can provide donation receipts upon request."
  },
  {
    question: "Why do you accept cryptocurrency donations?",
    answer: "Cryptocurrency donations allow us to receive funds quickly and with lower fees compared to traditional international transfers. This is especially important for our location in Zanzibar, where international banking can be challenging."
  },
  {
    question: "How can I verify that my donation was received?",
    answer: "All cryptocurrency transactions are public and can be verified on the blockchain. We provide explorer links for each wallet address where you can check the current balance and transaction history."
  },
  {
    question: "Can I visit the Straight Training Center?",
    answer: "Yes! We welcome visitors who want to see our work firsthand. Please contact us in advance to arrange a visit. We're located in Zanzibar and would be happy to show you our facilities and introduce you to our students."
  },
  {
    question: "What programming languages and technologies do you teach?",
    answer: "We focus on practical technologies including Python, web development (HTML, CSS, JavaScript), basic networking, and computer literacy. With your help purchasing Raspberry Pi computers, we'll expand into IoT and embedded programming."
  },
  {
    question: "How many students benefit from the training center?",
    answer: "We currently serve over 200 students of various ages, from young children learning basic computer skills to teenagers receiving advanced technical training. Your donations help us reach even more students in the community."
  },
  {
    question: "What happens if you exceed your funding goals?",
    answer: "Any additional funds will go toward expanding our programs, purchasing more educational materials, hiring additional instructors, or improving our facilities. We believe in continuous improvement and growth."
  },
  {
    question: "Can I donate items instead of money?",
    answer: "While we primarily accept cryptocurrency donations, we're always open to discussing donations of educational equipment or materials. Please contact us to discuss what items might be most helpful."
  }
];

export function FAQ() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our project and donation process
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
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