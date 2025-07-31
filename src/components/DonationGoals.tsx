import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Monitor, Home, Plane, Mountain, Building2 } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "Computer Equipment",
    description: "10 Raspberry Pi computers with accessories for hands-on learning",
    target: 2000,
    raised: 450,
    icon: Monitor,
    color: "primary",
    priority: "High Priority"
  },
  {
    id: 2,
    title: "Yearly Rent",
    description: "Secure the school location for another year of education",
    target: 5000,
    raised: 1200,
    icon: Home,
    color: "secondary",
    priority: "Urgent"
  },
  {
    id: 3,
    title: "Student Trip",
    description: "Educational trip for all students to broaden their horizons",
    target: 3000,
    raised: 800,
    icon: Plane,
    color: "accent",
    priority: "Medium Priority"
  },
  {
    id: 4,
    title: "Teenage Camp",
    description: "Special summer camp for teenage students with advanced training",
    target: 4000,
    raised: 600,
    icon: Mountain,
    color: "success",
    priority: "Medium Priority"
  },
  {
    id: 5,
    title: "Own Building",
    description: "Purchase our own building for long-term stability and growth",
    target: 50000,
    raised: 2500,
    icon: Building2,
    color: "info",
    priority: "Long-term Goal"
  }
];

export function DonationGoals() {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalRaised = goals.reduce((sum, goal) => sum + goal.raised, 0);
  const overallProgress = (totalRaised / totalTarget) * 100;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Donation Goals
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Help us reach these important milestones to improve education at the Straight Training Center
            </p>
            
            <Card className="max-w-md mx-auto mb-8 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">${totalRaised.toLocaleString()}</div>
                  <div className="text-muted-foreground">raised of ${totalTarget.toLocaleString()} goal</div>
                </div>
                <Progress value={overallProgress} className="h-3 mb-2" />
                <div className="text-sm text-muted-foreground">{overallProgress.toFixed(1)}% Complete</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progress = (goal.raised / goal.target) * 100;
              const Icon = goal.icon;
              
              return (
                <Card key={goal.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-${goal.color}/10`}>
                        <Icon className={`h-6 w-6 text-${goal.color}`} />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {goal.priority}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {goal.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${goal.raised.toLocaleString()} raised</span>
                        <span className="font-medium">${goal.target.toLocaleString()}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-xs text-muted-foreground text-center">
                        {progress.toFixed(1)}% funded
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => document.getElementById('donation-methods')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Support This Goal
                    </Button>
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