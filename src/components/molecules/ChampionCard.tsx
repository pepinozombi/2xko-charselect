import { Avatar } from "@/components/atoms/Avatar";
import type { Champion } from "@/utils/data";

interface ChampionCardProps {
  champ: Champion;
  selected?: boolean;
  onSelect: (c: Champion) => void;
  playerUsing?: 'P1' | 'P2' | 'P3' | 'P4' | null;
}

export function ChampionCard({ champ, selected, onSelect, playerUsing }: ChampionCardProps) {
  return (
    <div 
      className={`
        group relative cursor-pointer transition-all duration-200
        ${selected 
          ? 'transform scale-105' 
          : 'hover:transform hover:scale-102'
        }
      `}
      onClick={() => onSelect(champ)}
    >
      {/* Main card container with fighting game aesthetic */}
      <div className={`
        relative p-3 border-4 transition-all duration-200
        ${selected 
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 shadow-2xl shadow-yellow-400/50' 
          : 'border-gray-600 bg-gradient-to-br from-gray-100 via-white to-gray-50 hover:border-gray-500 shadow-lg hover:shadow-xl'
        }
        ${selected ? 'rounded-lg' : 'rounded hover:rounded-lg'}
      `}>
        
        {/* Corner brackets - fighting game style */}
        <div className={`absolute inset-0 pointer-events-none ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'} transition-opacity duration-200`}>
          {/* Top-left bracket */}
          <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-yellow-500"></div>
          {/* Top-right bracket */}
          <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-yellow-500"></div>
          {/* Bottom-left bracket */}
          <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-yellow-500"></div>
          {/* Bottom-right bracket */}
          <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-yellow-500"></div>
        </div>

        {/* Selection glow effect */}
        {selected && (
          <div className="absolute inset-0 rounded bg-yellow-400/20 animate-pulse"></div>
        )}

        {/* Player indicator badge */}
        {playerUsing && (
          <div className={`
            absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white z-20 border-2 border-white shadow-lg
            ${playerUsing === 'P1' ? 'bg-blue-600' : ''}
            ${playerUsing === 'P2' ? 'bg-cyan-600' : ''}
            ${playerUsing === 'P3' ? 'bg-red-600' : ''}
            ${playerUsing === 'P4' ? 'bg-orange-600' : ''}
          `}>
            {playerUsing}
          </div>
        )}
        
        <div className="flex items-center gap-3 relative z-10">
          <Avatar 
            src={champ.thumbnail} 
            alt={champ.name} 
            size={56}
            fallbackInitials={champ.name.substring(0, 2)}
          />
          <div className="flex-1 min-w-0">
            <div className={`font-bold text-base truncate ${selected ? 'text-yellow-800' : 'text-gray-900'}`}>
              {champ.name}
            </div>
            <div className={`
              text-xs font-bold px-2 py-1 rounded inline-block mt-1 border
              ${getArchetypeStyle(champ.archetype, selected)}
            `}>
              {champ.archetype}
            </div>
          </div>
          
          {/* Selection indicator */}
          {selected && (
            <div className="flex-shrink-0 w-5 h-5 bg-yellow-500 border-2 border-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function para estilos de arquetipos
function getArchetypeStyle(archetype: string, selected: boolean = false): string {
  if (selected) {
    const selectedStyles = {
      'Rushdown': 'bg-red-200 text-red-900 border-red-400',
      'All-Rounder': 'bg-green-200 text-green-900 border-green-400', 
      'Striker': 'bg-orange-200 text-orange-900 border-orange-400',
      'Bruiser': 'bg-blue-200 text-blue-900 border-blue-400',
      'Zoner': 'bg-purple-200 text-purple-900 border-purple-400',
      'Grappler': 'bg-yellow-200 text-yellow-900 border-yellow-400',
      'Mixup': 'bg-yellow-200 text-yellow-900 border-yellow-400',
      'Traps': 'bg-pink-200 text-pink-900 border-pink-400'
    };
    return selectedStyles[archetype as keyof typeof selectedStyles] || 'bg-gray-200 text-gray-900 border-gray-400';
  }

  const styles = {
    'Rushdown': 'bg-red-100 text-red-700 border-red-300',
    'All-Rounder': 'bg-green-100 text-green-700 border-green-300', 
    'Striker': 'bg-orange-100 text-orange-700 border-orange-300',
    'Bruiser': 'bg-blue-100 text-blue-700 border-blue-300',
    'Zoner': 'bg-purple-100 text-purple-700 border-purple-300',
    'Grappler': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Mixup': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Traps': 'bg-pink-100 text-pink-700 border-pink-300'
  };
  return styles[archetype as keyof typeof styles] || 'bg-gray-100 text-gray-700 border-gray-300';
}