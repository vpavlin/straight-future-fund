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
  // Calculate current funding priority
  let cumulativeTarget = 0;
  let cumulativeRaised = 0;
  
  const goalsWithStatus = goals.map((goal, index) => {
    const goalStart = cumulativeTarget;
    cumulativeTarget += goal.target;
    
    let goalRaised = 0;
    let status = "pending";
    
    if (cumulativeRaised >= goalStart + goal.target) {
      // Goal fully funded
      goalRaised = goal.target;
      status = "completed";
    } else if (cumulativeRaised > goalStart) {
      // Goal partially funded
      goalRaised = cumulativeRaised - goalStart;
      status = "active";
    }
    
    return {
      ...goal,
      raised: goalRaised,
      status,
      progress: (goalRaised / goal.target) * 100
    };
  });

  // Update cumulative raised based on actual total
  cumulativeRaised = 1950; // Current total donations

  // Recalculate with actual raised amount
  let runningTotal = cumulativeRaised;
  const finalGoals = goals.map((goal) => {
    let goalRaised = 0;
    let status = "pending";
    
    if (runningTotal >= goal.target) {
      goalRaised = goal.target;
      status = "completed";
      runningTotal -= goal.target;
    } else if (runningTotal > 0) {
      goalRaised = runningTotal;
      status = "active";
      runningTotal = 0;
    }
    
    return {
      ...goal,
      raised: goalRaised,
      status,
      progress: (goalRaised / goal.target) * 100
    };
  });

  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (cumulativeRaised / totalTarget) * 100;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Funding Priorities
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We fund these goals in priority order. Once a goal is fully funded, donations automatically go to the next priority.
            </p>
            
            <Card className="max-w-md mx-auto mb-8 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">${cumulativeRaised.toLocaleString()}</div>
                  <div className="text-muted-foreground">raised of ${totalTarget.toLocaleString()} total goal</div>
                </div>
                <Progress value={overallProgress} className="h-3 mb-2" />
                <div className="text-sm text-muted-foreground">{overallProgress.toFixed(1)}% of all goals complete</div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            {finalGoals.map((goal, index) => {
              const Icon = goal.icon;
              const isNext = goal.status === "active";
              const isCompleted = goal.status === "completed";
              const isPending = goal.status === "pending";
              
              return (
                <Card 
                  key={goal.id} 
                  className={`relative overflow-hidden transition-all duration-300 ${
                    isNext ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 
                    isCompleted ? 'bg-primary/5 border-primary/30' : 
                    'opacity-75'
                  }`}
                >
                  <div className="flex items-center p-6">
                    {/* Priority Number & Status */}
                    <div className="flex-shrink-0 mr-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        isCompleted ? 'bg-primary text-primary-foreground' :
                        isNext ? 'bg-primary/20 text-primary ring-2 ring-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? '✓' : goal.priority}
                      </div>
                    </div>

                    {/* Goal Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            isCompleted ? 'bg-primary/20' :
                            isNext ? 'bg-primary/10' :
                            'bg-muted/50'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              isCompleted ? 'text-primary' :
                              isNext ? 'text-primary' :
                              'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`text-lg font-semibold ${
                              isNext ? 'text-primary' : ''
                            }`}>
                              {goal.title}
                              {isNext && <span className="ml-2 text-sm font-normal text-primary">(Current Priority)</span>}
                              {isCompleted && <span className="ml-2 text-sm font-normal text-primary">(Completed)</span>}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {goal.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Section */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={isNext ? 'text-primary font-medium' : ''}>
                            ${goal.raised.toLocaleString()} raised
                          </span>
                          <span className="font-medium">${goal.target.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={goal.progress} 
                          className={`h-2 ${isNext ? 'bg-primary/20' : ''}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{goal.progress.toFixed(1)}% funded</span>
                          {!isCompleted && (
                            <span>${(goal.target - goal.raised).toLocaleString()} remaining</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0 ml-6">
                      <Button 
                        variant={isNext ? "default" : "outline"} 
                        size="sm"
                        disabled={isCompleted}
                        className={isNext ? 'animate-pulse' : ''}
                        onClick={() => document.getElementById('donation-methods')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        {isCompleted ? 'Completed' : isNext ? 'Donate Now' : 'Support Later'}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}