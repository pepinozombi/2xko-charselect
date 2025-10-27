import { Avatar } from "@/components/atoms/Avatar";
import type { Champion } from "@/utils/data";

interface PlayerSlotProps {
  playerId: 'P1' | 'P2' | 'P3' | 'P4';
  champion: Champion | null;
  onClick: () => void;
  isActive?: boolean; // Para indicar si esta posición está seleccionada para elegir campeón
}

export function PlayerSlot({ playerId, champion, onClick, isActive = false }: PlayerSlotProps) {
  const getPlayerColor = (id: string) => {
    switch (id) {
      case 'P1': return 'border-blue-500 bg-blue-50';
      case 'P2': return 'border-cyan-500 bg-cyan-50';
      case 'P3': return 'border-red-500 bg-red-50';
      case 'P4': return 'border-orange-500 bg-orange-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getActivePlayerColor = (id: string) => {
    switch (id) {
      case 'P1': return 'border-blue-400 bg-blue-100 shadow-lg shadow-blue-400/50';
      case 'P2': return 'border-cyan-400 bg-cyan-100 shadow-lg shadow-cyan-400/50';
      case 'P3': return 'border-red-400 bg-red-100 shadow-lg shadow-red-400/50';
      case 'P4': return 'border-orange-400 bg-orange-100 shadow-lg shadow-orange-400/50';
      default: return 'border-gray-400 bg-gray-100 shadow-lg shadow-gray-400/50';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-200 p-4 rounded-lg border-4
        ${isActive 
          ? `${getActivePlayerColor(playerId)} transform scale-105` 
          : `${getPlayerColor(playerId)} `
        }
      `}
    >
      {/* Player ID badge */}
    <div className={`
      absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white z-10
      ${playerId === 'P1' ? 'bg-blue-600' : ''}
      ${playerId === 'P2' ? 'bg-cyan-600' : ''}
      ${playerId === 'P3' ? 'bg-red-600' : ''}
      ${playerId === 'P4' ? 'bg-orange-600' : ''}
    `}>
      {playerId}
    </div>

      {/* Active selection indicator */}
      {isActive && (
        <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 animate-pulse pointer-events-none"></div>
      )}

      <div className="flex flex-col items-center gap-2">
        {champion ? (
          <>
            <Avatar 
              src={champion.thumbnail} 
              alt={champion.name} 
              size={64}
            />
            <div className="text-center">
              <div className="font-bold text-sm text-gray-800">{champion.name}</div>
              <div className="text-xs text-gray-600">{champion.archetype}</div>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center bg-gray-100">
              <span className="text-gray-500 text-xs font-medium">SELECT</span>
            </div>
            <div className="text-center">
              <div className="font-bold text-sm text-gray-600">Sin seleccionar</div>
              <div className="text-xs text-gray-500">Click para elegir</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}