import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, CheckCircle } from "lucide-react";

const donationMethods = [
  {
    type: "ETH (Ethereum Mainnet)",
    address: "0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorer: "https://etherscan.io/address/0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorerName: "Etherscan",
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    description: "Send ETH directly to our wallet"
  },
  {
    type: "USDC (Ethereum Mainnet)",
    address: "0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorer: "https://etherscan.io/token/0xa0b86a33e6e0e5cf1f5872e1b4e6ac1f5d5c2ea6?a=0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorerName: "Etherscan",
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    description: "Send USDC stablecoin to our wallet"
  },
  {
    type: "ETH (Base Network)",
    address: "0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorer: "https://basescan.org/address/0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorerName: "BaseScan",
    color: "bg-gradient-to-r from-blue-400 to-blue-500",
    description: "Lower fees on Base network"
  },
  {
    type: "USDC (Base Network)",
    address: "0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorer: "https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913?a=0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8",
    explorerName: "BaseScan",
    color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
    description: "USDC on Base for lower transaction fees"
  },
  {
    type: "Bitcoin (BTC)",
    address: "bc1qduj9sks7d7vct2y8tk4d6ve5frvx33vvftdscw",
    explorer: "https://blockstream.info/address/bc1qduj9sks7d7vct2y8tk4d6ve5frvx33vvftdscw",
    explorerName: "Blockstream",
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    description: "Send Bitcoin to our wallet"
  },
  {
    type: "Bitcoin Lightning",
    address: "lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qwkrce5ypja4pts2s5stp908e49mr4666r7ecxaszw83jx50yp9puqsr9sdhgk9r2ah4t675f9npga0fcqknkcavykwjh4t5undppjj5ps0sqvuvt2ghzf8dlmsnlugy8ysjyttanyz2kcn0r2mp9tusw7evujfavz6hr4vdqevk7qzzmtx3ac07wt8lqpzjqgfwqe8mzw57pkz8mawfgj0u9ljq7xcllwq2r9qv4nq26qg7uxamqqqse0q0eagq400rm5gx4unkz5w7qv",
    color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    description: "Instant Bitcoin payments via Lightning Network"
  }
];

export function DonationMethods() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      toast({
        title: "Address Copied!",
        description: `${type} address copied to clipboard`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationMethods.map((method, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className={`h-2 w-full ${method.color} rounded-t-lg -mx-6 -mt-6 mb-4`} />
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
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Address:</div>
                    <div className="font-mono text-xs break-all leading-relaxed">
                      {method.address}
                    </div>
                  </div>

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