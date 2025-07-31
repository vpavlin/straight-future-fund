import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Home, Plane, Mountain, Building2 } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "Computer Equipment",
    description: "10 Raspberry Pi computers with accessories for hands-on learning",
    target: 2000,
    raised: 1650,
    icon: Monitor,
    priority: 1,
    status: "active" // active, completed, pending
  },
  {
    id: 2,
    title: "Yearly Rent",
    description: "Secure the school location for another year of education",
    target: 5000,
    raised: 300,
    icon: Home,
    priority: 2,
    status: "pending"
  },
  {
    id: 3,
    title: "Student Trip",
    description: "Educational trip for all students to broaden their horizons",
    target: 3000,
    raised: 0,
    icon: Plane,
    priority: 3,
    status: "pending"
  },
  {
    id: 4,
    title: "Teenage Camp",
    description: "Special summer camp for teenage students with advanced training",
    target: 4000,
    raised: 0,
    icon: Mountain,
    priority: 4,
    status: "pending"
  },
  {
    id: 5,
    title: "Own Building",
    description: "Purchase our own building for long-term stability and growth",
    target: 50000,
    raised: 0,
    icon: Building2,
    priority: 5,
    status: "pending"
  }
];

export function DonationGoals() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Goals
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              These are the initiatives we're working towards to better serve our community in Fuoni Mambosasa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {goals.map((goal) => {
              const Icon = goal.icon;
              
              return (
                <Card key={goal.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}