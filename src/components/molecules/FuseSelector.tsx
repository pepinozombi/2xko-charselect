import type { Fuse } from "@/utils/data";
import { FUSES } from "@/utils/data";

interface FuseSelectorProps {
  selectedFuse: Fuse | null;
  onFuseSelect: (fuse: Fuse) => void;
  teamName: string;
}

export function FuseSelector({ selectedFuse, onFuseSelect, teamName }: FuseSelectorProps) {
  return (
    <div className="p-4 border-4 border-gray-600 rounded-lg bg-gray-800 shadow-2xl">
      <h3 className="text-lg font-black text-yellow-400 mb-3 flex items-center gap-2 tracking-wide">
        <FuseIcon />
        FUSE - {teamName}
      </h3>
      
      <div className="grid grid-cols-1 gap-2">
        {FUSES.map(fuse => (
          <button
            key={fuse.id}
            onClick={() => onFuseSelect(fuse)}
            className={`
              group relative p-3 text-left font-bold transition-all duration-200 border-2
              ${selectedFuse?.id === fuse.id 
                ? 'border-yellow-400 shadow-lg shadow-yellow-400/30 bg-gray-700' 
                : 'border-gray-600 hover:border-gray-500 bg-gray-800 hover:bg-gray-700'
              }
            `}
            style={{ 
              backgroundColor: selectedFuse?.id === fuse.id 
                ? undefined
                : undefined
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 border border-gray-400"
                  style={{ backgroundColor: fuse.color }}
                />
                <span className="text-white text-sm tracking-wide">
                  {fuse.name}
                </span>
              </div>
              
              {selectedFuse?.id === fuse.id && (
                <div 
                  className="w-4 h-4 border border-yellow-400 flex items-center justify-center"
                  style={{ backgroundColor: fuse.color }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {selectedFuse && (
        <div className="mt-3 p-2 border-2 border-gray-600 bg-gray-700 text-center">
          <span className="text-xs text-gray-300 tracking-wide">SELECTED: </span>
          <span 
            className="font-bold text-xs tracking-wide"
            style={{ color: selectedFuse.color }}
          >
            {selectedFuse.name}
          </span>
        </div>
      )}
    </div>
  );
}

// Icono decorativo para el título
function FuseIcon() {
  return (
    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  );
}