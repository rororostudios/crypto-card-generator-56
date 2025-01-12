import { useState, useEffect } from "react";
import { CryptoCard } from "./CryptoCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const CRYPTOCURRENCIES = [
  { name: "Bitcoin", code: "BTC", color: "#F7931A" },
  { name: "Ethereum", code: "ETH", color: "#627EEA" },
  { name: "Avalanche", code: "AVAX", color: "#E84142" },
  { name: "Binance Coin", code: "BNB", color: "#F3BA2F" },
  { name: "Cardano", code: "ADA", color: "#0033AD" },
  { name: "Solana", code: "SOL", color: "#14F195" },
  { name: "Polkadot", code: "DOT", color: "#E6007A" },
  { name: "Ripple", code: "XRP", color: "#23292F" },
  { name: "Dogecoin", code: "DOGE", color: "#C2A633" },
  { name: "Polygon", code: "MATIC", color: "#8247E5" },
  { name: "Chainlink", code: "LINK", color: "#2A5ADA" },
];

// Cache object to store pre-fetched logo URLs
const logoCache: { [key: string]: string } = {};

export const CryptoCardGenerator = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTOCURRENCIES[0]);
  const [address, setAddress] = useState("");
  const [isVertical, setIsVertical] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [mnemonicLength, setMnemonicLength] = useState<12 | 24>(24);
  const { toast } = useToast();

  // Pre-fetch all logos when component mounts
  useEffect(() => {
    const preFetchLogos = async () => {
      const fetchPromises = CRYPTOCURRENCIES.map(async (crypto) => {
        const logoUrl = `https://cryptologos.cc/logos/${crypto.name.toLowerCase().replace(' ', '-')}-${crypto.code.toLowerCase()}-logo.svg`;
        
        try {
          // First try with regular fetch
          const response = await fetch(logoUrl);
          if (response.ok) {
            const blob = await response.blob();
            logoCache[crypto.code] = URL.createObjectURL(blob);
          } else {
            // If regular fetch fails, try with no-cors mode
            const noCorsResponse = await fetch(logoUrl, { mode: 'no-cors' });
            // Since we can't access the blob directly in no-cors mode,
            // we'll just store the URL directly
            logoCache[crypto.code] = logoUrl;
          }
        } catch (error) {
          console.warn(`Error fetching logo for ${crypto.name}:`, error);
          // Store the URL directly as fallback
          logoCache[crypto.code] = logoUrl;
        }
      });

      try {
        await Promise.all(fetchPromises);
      } catch (error) {
        toast({
          title: "Warning",
          description: "Some cryptocurrency logos couldn't be loaded",
          variant: "destructive",
        });
      }
    };

    preFetchLogos();

    // Cleanup function to revoke object URLs
    return () => {
      Object.values(logoCache).forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Crypto Backup Card Generator
          </h1>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="crypto" className="text-sm font-medium">Cryptocurrency</Label>
              <Select
                value={selectedCrypto.code}
                onValueChange={(value) => {
                  const crypto = CRYPTOCURRENCIES.find((c) => c.code === value);
                  if (crypto) setSelectedCrypto(crypto);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {CRYPTOCURRENCIES.map((crypto) => (
                    <SelectItem key={crypto.code} value={crypto.code}>
                      {crypto.name} ({crypto.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">Wallet Address</Label>
              <Input
                id="address"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 justify-end">
            <div className="flex items-center space-x-2">
              <Label htmlFor="mnemonic-length" className="text-sm font-medium">24-word Phrase</Label>
              <Switch
                id="mnemonic-length"
                checked={mnemonicLength === 24}
                onCheckedChange={(checked) => setMnemonicLength(checked ? 24 : 12)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="vertical-mode" className="text-sm font-medium">Vertical Card</Label>
              <Switch
                id="vertical-mode"
                checked={isVertical}
                onCheckedChange={setIsVertical}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="show-back" className="text-sm font-medium">Show Back</Label>
              <Switch
                id="show-back"
                checked={showBack}
                onCheckedChange={setShowBack}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner">
          <CryptoCard
            name={selectedCrypto.name}
            code={selectedCrypto.code}
            address={address || "Enter your wallet address above"}
            color={selectedCrypto.color}
            isVertical={isVertical}
            showBack={showBack}
            mnemonicLength={mnemonicLength}
            logoUrl={logoCache[selectedCrypto.code]}
          />
        </div>
      </div>
    </div>
  );
};