import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Monitor, Home, Plane, Mountain, Building2, Heart, Loader2 } from "lucide-react";
import { useDonationBalances } from "@/hooks/useDonationBalances";
import data from "@/data.json";

const iconMap = {
  Monitor,
  Home,
  Plane,
  Mountain,
  Building2
};

export function DonationGoals() {
  const { totalUSD, isLoading, error, eth, usdc, btc } = useDonationBalances();
  
  // Use real donation amount for the first goal (Computer Equipment)
  const realRaised = Math.round(totalUSD);
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              <Heart className="h-4 w-4" />
              Make a Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {data.donationGoals.title.split(' ')[1]}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              {data.donationGoals.subtitle}
            </p>
            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading live donation amounts...
              </div>
            )}
            {error && (
              <div className="text-sm text-amber-600 dark:text-amber-400 mb-4">
                ⚠️ Using cached donation amounts (live data temporarily unavailable)
              </div>
            )}
          </div>
          <div className="space-y-6">
            {data.donationGoals.goals.map((goal, index) => {
              const Icon = iconMap[goal.icon as keyof typeof iconMap];
              const isFirstGoal = index === 0;
              const isActive = goal.status === "active";
              const currentRaised = isFirstGoal ? realRaised : goal.raised;
              const progress = isFirstGoal ? (currentRaised / goal.target) * 100 : 0;
              
              return (
                <Card key={goal.id} className={`transition-all duration-300 ${
                  isActive 
                    ? "hover:shadow-lg border-primary/20" 
                    : "opacity-50 grayscale hover:opacity-75"
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isActive ? "bg-primary/10" : "bg-muted/50"
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            isActive ? "" : "text-muted-foreground"
                          }`}>
                            {goal.title}
                          </h3>
                          {!isActive && (
                            <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {goal.description}
                        </p>
                        
                        {isFirstGoal && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-primary font-medium">
                                ${currentRaised.toLocaleString()} raised
                              </span>
                              <span className="font-medium">${goal.target.toLocaleString()}</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{progress.toFixed(1)}% funded</span>
                              <span>${(goal.target - currentRaised).toLocaleString()} remaining</span>
                            </div>
                            {isFirstGoal && !isLoading && (
                              <div className="mt-3 p-3 bg-muted/30 rounded-lg text-xs space-y-1">
                                <div className="font-medium text-muted-foreground mb-2">Live balances:</div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <span className="text-muted-foreground">ETH (Mainnet):</span>
                                    <div className="font-mono">{eth.mainnet.balance} ETH</div>
                                    <div className="text-muted-foreground">${eth.mainnet.balanceUSD.toFixed(2)}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">ETH (Base):</span>
                                    <div className="font-mono">{eth.base.balance} ETH</div>
                                    <div className="text-muted-foreground">${eth.base.balanceUSD.toFixed(2)}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">USDC (Mainnet):</span>
                                    <div className="font-mono">{usdc.mainnet.balance} USDC</div>
                                    <div className="text-muted-foreground">${usdc.mainnet.balanceUSD.toFixed(2)}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">USDC (Base):</span>
                              <div className="font-mono">{usdc.base.balance} USDC</div>
                                <div className="text-muted-foreground">${usdc.base.balanceUSD.toFixed(2)}</div>
                              </div>
                              <div className="col-span-2">
                                <span className="text-muted-foreground">BTC:</span>
                                <div className="font-mono">{btc.balance} BTC</div>
                                <div className="text-muted-foreground">${btc.balanceUSD.toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                            )}
                          </div>
                        )}
                        
                        {isFirstGoal && (
                          <div className="mt-6 pt-4 border-t border-border">
                            <Button 
                              variant="default" 
                              size="lg"
                              className="w-full"
                              onClick={() => document.getElementById('donation-methods')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                              <Heart className="mr-2 h-5 w-5" />
                              Donate
                            </Button>
                          </div>
                        )}
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