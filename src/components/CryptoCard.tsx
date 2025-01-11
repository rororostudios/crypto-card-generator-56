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
  const logoUrl = `https://cryptologos.cc/logos/${name.toLowerCase().replace(' ', '-')}-${code.toLowerCase()}-logo.svg`;

  return (
    <div className={cn(
      "rounded-xl p-6 relative overflow-hidden transition-all duration-300",
      "bg-gradient-to-br from-gray-900 to-gray-800",
      "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
      "backdrop-blur-xl backdrop-saturate-150",
      "hover:scale-105",
      isVertical ? "w-[53.98mm] h-[85.60mm]" : "w-[85.60mm] h-[53.98mm]"
    )}>
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)]" 
           style={{ "--color": color } as any} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12" />
      
      <div className={cn(
        "relative flex h-full z-10",
        isVertical ? "flex-col space-y-4" : "justify-between items-start"
      )}>
        <div className={cn(
          "flex flex-col",
          isVertical ? "items-center" : "justify-between h-full"
        )}>
          <div className={cn(
            "relative",
            isVertical ? "text-center" : ""
          )}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={logoUrl}
                alt={`${name} logo`}
                className="w-6 h-6"
                onError={(e) => {
                  // Fallback to colored dot if logo fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-2 h-2 rounded-full hidden" style={{ backgroundColor: color }} />
              <h2 className="text-white font-bold text-2xl tracking-tight">{name}</h2>
            </div>
            <p className="text-gray-400 text-sm font-mono tracking-wider">{code}</p>
          </div>
          
          <div className={cn(
            "break-all mt-2",
            isVertical ? "w-full text-center mt-auto" : "w-full max-w-[180px]"
          )}>
            <p className="text-gray-400 text-[8px] font-mono leading-tight">{address}</p>
          </div>
        </div>
        
        <div className={cn(
          "relative group",
          isVertical ? "mx-auto" : ""
        )}>
          {/* QR Code container with glass effect */}
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl 
                         shadow-[0_0_15px_rgba(0,0,0,0.1)]
                         transition-transform duration-300
                         group-hover:scale-[1.02]">
            <QRCodeSVG
              value={address}
              size={isVertical ? 140 : 120}
              level="L"
              className={cn(
                "transition-all duration-300",
                isVertical ? "w-[140px] h-[140px]" : "w-[120px] h-[120px]"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};