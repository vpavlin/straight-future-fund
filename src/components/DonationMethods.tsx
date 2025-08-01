import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, CheckCircle, ArrowRightLeft } from "lucide-react";
import { SquidWidget } from "@0xsquid/widget";


const currencyOptions = [
  { value: "eth", label: "Ethereum (ETH)", icon: "⟠" },
  { value: "usdc", label: "USD Coin (USDC)", icon: "💵" },
  { value: "btc", label: "Bitcoin (BTC)", icon: "₿" },
  { value: "fiat", label: "Traditional Banking", icon: "🏦" },
  { value: "other", label: "Other Currencies", icon: "🔄" }
];

const donationMethods = {
  eth: [
    {
      type: "Ethereum (ETH)",
      address: "0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
      explorer: "https://etherscan.io/address/0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
      explorerName: "Etherscan",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      description: "Send ETH on Ethereum Mainnet or Base Network (same address)",
      networks: ["Ethereum Mainnet", "Base Network"]
    }
  ],
  usdc: [
    {
      type: "USDC Stablecoin",
      address: "0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
      explorer: "https://etherscan.io/token/0xa0b86a33e6e0e5cf1f5872e1b4e6ac1f5d5c2ea6?a=0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
      explorerName: "Etherscan",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      description: "Send USDC on Ethereum Mainnet or Base Network (same address)",
      networks: ["Ethereum Mainnet", "Base Network"]
    }
  ],
  btc: [
    {
      type: "Bitcoin Network",
      address: "bc1qduj9sks7d7vct2y8tk4d6ve5frvx33vvftdscw",
      explorer: "https://blockstream.info/address/bc1qduj9sks7d7vct2y8tk4d6ve5frvx33vvftdscw",
      explorerName: "Blockstream",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      description: "Send Bitcoin to our wallet"
    },
    {
      type: "Lightning Network",
      address: "lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qwkrce5ypja4pts2s5stp908e49mr4666r7ecxaszw83jx50yp9puqsr9sdhgk9r2ah4t675f9npga0fcqknkcavykwjh4t5undppjj5ps0sqvuvt2ghzf8dlmsnlugy8ysjyttanyz2kcn0r2mp9tusw7evujfavz6hr4vdqevk7qzzmtx3ac07wt8lqpzjqgfwqe8mzw57pkz8mawfgj0u9ljq7xcllwq2r9qv4nq26qg7uxamqqqse0q0eagq400rm5gx4unkz5w7qv",
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      description: "Instant Bitcoin payments via Lightning Network"
    }
  ],
  fiat: [
    {
      type: "Euro Bank Transfer",
      address: "3014211910745",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      description: "International bank transfer (⚠️ 7€ fee per transfer)",
      bankDetails: {
        currency: "EUR",
        accountNumber: "3014211910745",
        swiftCode: "EQBLTZTZ",
        bankCode: "047",
        bankName: "EQUITY BANK TANZANIA LTD",
        bankAddress: "ZANZIBAR",
        postalAddress: "P.O BOX 110183, DAR ES SALAAM, TANZANIA"
      }
    },
    {
      type: "Mobile Money (Tigopesa)",
      address: "+255678585256",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      description: "Mobile money transfer in Tanzania (Modest's phone)"
    }
  ]
};

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
    <section id="donation-methods" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Make a{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Donation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred cryptocurrency to support the Straight Training Center. 
              All donations go directly to improving education for our students.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-8">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-full h-14 text-lg">
                <SelectValue placeholder="Select a currency to donate" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((option) => (
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
            <div className={`grid gap-6 max-w-4xl mx-auto ${(selectedCurrency === 'btc' || selectedCurrency === 'fiat') ? 'md:grid-cols-2' : 'max-w-md'}`}>
              {donationMethods[selectedCurrency as keyof typeof donationMethods]?.map((method, index) => (
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
                        {donationMethods.usdc[0].address}
                    </div>
                    <Button
                        variant="copy"
                        size="sm"
                        onClick={() => copyToClipboardNoToast(donationMethods.usdc[0].address)}
                        className="flex-1"
                      >
                        {copiedAddress === donationMethods.usdc[0].address ? (
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