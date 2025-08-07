import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, CheckCircle, ArrowRightLeft } from "lucide-react";
import { SquidWidget } from "@0xsquid/widget";

import data from "@/data.json";

export function DonationMethods() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      //setCopiedAddress(address);
      toast({
        title: "Address Copied!",
        description: `${type} address copied to clipboard`,
      });
      //setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  const copyToClipboardNoToast = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      //setCopiedAddress(address);
      //setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="donation-methods" className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-secondary/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/15 border border-primary/30 rounded-full text-primary font-semibold text-sm mb-6 shadow-lg">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Support Our Mission
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {data.donationMethods.title.split(' ').slice(0, 2).join(' ')}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {data.donationMethods.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {data.donationMethods.subtitle}
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-8">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-full h-14 text-lg">
                <SelectValue placeholder="Select a currency to donate" />
              </SelectTrigger>
              <SelectContent>
                {data.donationMethods.currencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCurrency && selectedCurrency !== "other" && (
            <div className={`grid gap-6 max-w-4xl mx-auto max-w-md`}>
              {data.donationMethods.methods[selectedCurrency as keyof typeof data.donationMethods.methods]?.map((method, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
                  <CardHeader className="pb-4 relative">
                    <div className={`absolute top-0 left-0 right-0 h-2 ${method.color}`} />
                    <CardTitle className="text-lg flex items-center justify-between">
                      {method.type}
                      {method.explorer && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-muted-foreground hover:text-primary"
                        >
                          <a
                            href={method.explorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View on ${method.explorerName}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                    {method.networks && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {method.networks.map((network) => (
                          <span key={network} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {network}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        {method.bankDetails ? 'Account Number:' : 'Address:'}
                      </div>
                      <div className="font-mono text-xs break-all leading-relaxed">
                        {method.address}
                      </div>
                    </div>

                    {method.bankDetails && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-muted-foreground">Currency:</span>
                            <div className="font-medium">{method.bankDetails.currency}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">SWIFT:</span>
                            <div className="font-mono">{method.bankDetails.swiftCode}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Bank Code:</span>
                            <div className="font-mono">{method.bankDetails.bankCode}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Bank:</span>
                            <div className="font-medium text-xs">{method.bankDetails.bankName}</div>
                          </div>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Address:</span>
                          <div className="font-medium">{method.bankDetails.bankAddress}</div>
                          <div className="font-medium">{method.bankDetails.postalAddress}</div>
                        </div>
                        <div className="p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <p className="text-xs text-amber-800 dark:text-amber-200">
                            ⚠️ <strong>Note:</strong> We pay 7€ for each incoming transfer. Please consider this for small donations to ensure your contribution is maximized.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="copy"
                        size="sm"
                        onClick={() => copyToClipboard(method.address, method.type)}
                        className="flex-1"
                      >
                        {copiedAddress === method.address ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Address
                          </>
                        )}
                      </Button>
                      
                      {method.explorer && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={method.explorer}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedCurrency === "other" && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRightLeft className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Swap Any Token</CardTitle>
                  <p className="text-muted-foreground mb-4">
                    Use Squid Router to swap any cryptocurrency to our supported tokens.
                  </p>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-3 text-sm text-center">How to use Squid Router:</h4>
                    <div className="space-y-2 max-w-sm mx-auto">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</span>
                        <span className="text-muted-foreground">Wait for the Squid Router to load</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</span>
                        <span className="text-muted-foreground">Connect your wallet</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</span>
                        <span className="text-muted-foreground">Copy donation address below</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">4</span>
                        <span className="text-muted-foreground">Set Recipient to the donation address</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">5</span>
                        <span className="text-muted-foreground">Set amount and swap</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-2">
                    <strong>Donation Address:</strong>
                  </p>
                  <p>
                     <div className="font-mono text-xs break-all leading-relaxed">
                        {data.walletAddresses.ethereum}
                     </div>
                     <Button
                         variant="copy"
                         size="sm"
                         onClick={() => copyToClipboardNoToast(data.walletAddresses.ethereum)}
                         className="flex-1"
                      >
                        {copiedAddress === data.walletAddresses.ethereum ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Address
                          </>
                        )}
                      </Button>
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <SquidWidget
                      config={{
                        integratorId: "donate-to-straight-training-center-283ed0f2-05ae-4b0e-bed9-a69593f1ce6f",
                        apiUrl: "https://apiplus.squidrouter.com",
                        defaultTokensPerChain: [
                          {
                            address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                            chainId: "8453",
                          },
                          {
                            address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                            chainId: "1",
                          },
                          {
                            address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                            chainId: "8453",
                          },
                        ],
                        initialAssets: {
                          from:                           {
                            address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                            chainId: "1",
                          },
                          to: {
                            address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                            chainId: "8453",
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Important Notice</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Please double-check the wallet address before sending any cryptocurrency. 
                  Transactions are irreversible. For any questions about donations, 
                  please contact us through our FAQ section below.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}