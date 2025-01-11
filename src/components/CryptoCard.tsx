import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  name: string;
  code: string;
  address: string;
  color: string;
}

export const CryptoCard = ({ name, code, address, color }: CryptoCardProps) => {
  return (
    <div className={cn(
      "w-[85.60mm] h-[53.98mm] rounded-xl p-4 relative overflow-hidden",
      "bg-gradient-to-br from-gray-900 to-gray-800",
      "shadow-xl transition-transform hover:scale-105"
    )}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)]" 
           style={{ "--color": color } as any} />
      
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-white font-bold text-xl mb-1">{name}</h2>
            <p className="text-gray-400 text-sm font-mono">{code}</p>
          </div>
          
          <div className="w-full max-w-[180px] break-all">
            <p className="text-gray-400 text-[8px] font-mono">{address}</p>
          </div>
        </div>
        
        <div className="bg-white p-1 rounded-lg">
          <QRCodeSVG
            value={address}
            size={120}
            level="L"
            className="w-[120px] h-[120px]"
          />
        </div>
      </div>
    </div>
  );
};