import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  name: string;
  code: string;
  address: string;
  color: string;
  isVertical?: boolean;
}

export const CryptoCard = ({ name, code, address, color, isVertical = false }: CryptoCardProps) => {
  return (
    <div className={cn(
      "rounded-xl p-4 relative overflow-hidden transition-transform hover:scale-105",
      "bg-gradient-to-br from-gray-900 to-gray-800",
      "shadow-xl",
      isVertical ? "w-[53.98mm] h-[85.60mm]" : "w-[85.60mm] h-[53.98mm]"
    )}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)]" 
           style={{ "--color": color } as any} />
      
      <div className={cn(
        "flex h-full",
        isVertical ? "flex-col space-y-4" : "justify-between items-start"
      )}>
        <div className={cn(
          "flex flex-col",
          isVertical ? "items-center" : "justify-between h-full"
        )}>
          <div className={cn(
            isVertical ? "text-center" : ""
          )}>
            <h2 className="text-white font-bold text-xl mb-1">{name}</h2>
            <p className="text-gray-400 text-sm font-mono">{code}</p>
          </div>
          
          <div className={cn(
            "break-all",
            isVertical ? "w-full text-center mt-auto" : "w-full max-w-[180px]"
          )}>
            <p className="text-gray-400 text-[8px] font-mono">{address}</p>
          </div>
        </div>
        
        <div className={cn(
          "bg-white p-1 rounded-lg",
          isVertical ? "mx-auto" : ""
        )}>
          <QRCodeSVG
            value={address}
            size={isVertical ? 140 : 120}
            level="L"
            className={cn(
              isVertical ? "w-[140px] h-[140px]" : "w-[120px] h-[120px]"
            )}
          />
        </div>
      </div>
    </div>
  );
};