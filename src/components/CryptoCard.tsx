import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  name: string;
  code: string;
  address: string;
  color: string;
  isVertical?: boolean;
  showBack?: boolean;
  mnemonicLength?: 12 | 24;
}

export const CryptoCard = ({ 
  name, 
  code, 
  address, 
  color, 
  isVertical = false,
  showBack = false,
  mnemonicLength = 24
}: CryptoCardProps) => {
  const logoUrl = `https://cryptologos.cc/logos/${name.toLowerCase().replace(' ', '-')}-${code.toLowerCase()}-logo.svg`;
  
  const mnemonicSpaces = Array.from({ length: mnemonicLength }, (_, i) => i + 1);

  return (
    <div className={cn(
      "rounded-xl p-6 relative overflow-hidden transition-all duration-300",
      "bg-gradient-to-br from-gray-900 to-gray-800",
      "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
      "backdrop-blur-xl backdrop-saturate-150",
      "hover:scale-105",
      isVertical ? "w-[53.98mm] h-[85.60mm]" : "w-[85.60mm] h-[53.98mm]"
    )}>
      {!showBack ? (
        <>
          {/* Front of card */}
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
            {/* Left side content */}
            <div className={cn(
              "flex flex-col relative z-20", // Added z-20 to ensure content stays above QR code
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
            
            {/* QR Code */}
            <div className={cn(
              "relative z-10", // Reduced z-index to be below the text
              isVertical ? "mx-auto" : ""
            )}>
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
        </>
      ) : (
        <div className="relative h-full">
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col px-1">
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="text-white/90 text-xs font-medium">Recovery Phrase</h3>
              <span className="text-gray-400 text-[10px]">{mnemonicLength} words</span>
            </div>
            
            <div className={cn(
              "grid gap-y-1.5 gap-x-3 flex-1 mt-0.5",
              isVertical 
                ? mnemonicLength === 24 
                  ? "grid-cols-2 text-[10px]" 
                  : "grid-cols-2 text-xs"
                : mnemonicLength === 24 
                  ? "grid-cols-4 text-[10px]" 
                  : "grid-cols-3 text-xs",
              "font-mono"
            )}>
              {mnemonicSpaces.map((num) => (
                <div key={num} className="relative">
                  <div className="absolute -left-2.5 text-gray-500 text-[9px]">{num}</div>
                  <div className="w-full border-b border-gray-700/30">
                    <span className="text-transparent select-none">________________</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-0.5 text-center">
              <p className="text-gray-400 text-[8px]">Write your recovery phrase here and keep it safe</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
