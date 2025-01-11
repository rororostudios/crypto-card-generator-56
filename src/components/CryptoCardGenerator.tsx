import { useState } from "react";
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

export const CryptoCardGenerator = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTOCURRENCIES[0]);
  const [address, setAddress] = useState("");
  const [isVertical, setIsVertical] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Crypto Backup Card Generator
          </h1>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="crypto">Cryptocurrency</Label>
              <Select
                value={selectedCrypto.code}
                onValueChange={(value) => {
                  const crypto = CRYPTOCURRENCIES.find((c) => c.code === value);
                  if (crypto) setSelectedCrypto(crypto);
                }}
              >
                <SelectTrigger>
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
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                id="address"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 justify-end">
            <Label htmlFor="vertical-mode">Vertical Card</Label>
            <Switch
              id="vertical-mode"
              checked={isVertical}
              onCheckedChange={setIsVertical}
            />
          </div>
        </div>

        <div className="flex justify-center p-8 bg-gray-100 rounded-xl">
          <CryptoCard
            name={selectedCrypto.name}
            code={selectedCrypto.code}
            address={address || "Enter your wallet address above"}
            color={selectedCrypto.color}
            isVertical={isVertical}
          />
        </div>
      </div>
    </div>
  );
};