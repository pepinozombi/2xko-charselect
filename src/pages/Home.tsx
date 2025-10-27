import { useState } from "react";
import { PL_CHARACTERS } from "@/utils/data";
import type { Champion } from "@/utils/data";
import { useSelection } from "@/hooks/useSelection";
import { ChampionGrid } from "@/components/organisms/ChampionGrid";
import { Button } from "@/components/atoms/Button";
import { LoadingScreen } from "@/components/organisms/LoadingScreen";
import { FuseSelector } from "@/components/molecules/FuseSelector";
import { PlayerSlot } from "@/components/molecules/PlayerSlot";
import { captureToBlobUrl } from "@/utils/exportToImage";

export default function Home() {
  const { players, teamA, teamB, selectChampionForPlayer, toggleFuse, reset, selectedChampionIds, getPlayerUsingChampion } = useSelection();
  const [activePlayerId, setActivePlayerId] = useState<'P1' | 'P2' | 'P3' | 'P4' | null>(null);

  // Helper function para obtener fuse de forma segura
  const getTeamFuse = (team: typeof teamA) => {
    return team.selectedFuse;
  };

  // Función para manejar la selección de campeón
  const handleChampionSelect = (champion: Champion) => {
    if (activePlayerId) {
      selectChampionForPlayer(activePlayerId, champion);
      setActivePlayerId(null); // Deseleccionar después de elegir
    }
  };

  // Función para manejar el click en un slot de jugador
  const handlePlayerSlotClick = (playerId: 'P1' | 'P2' | 'P3' | 'P4') => {
    if (activePlayerId === playerId) {
      // Si ya está activo y tiene campeón, lo quitamos
      if (players[playerId]) {
        selectChampionForPlayer(playerId, null);
      }
      setActivePlayerId(null);
    } else {
      // Activar este jugador para selección
      setActivePlayerId(playerId);
    }
  };

  async function handleGenerate() {
    // TODO: Aquí se podría usar getTeamFuse(teamA) y getTeamFuse(teamB) cuando se implemente la funcionalidad de fuses
    
    // mostrar preview en DOM: ya debe estar renderizado el componente LoadingScreen en la página o en un offscreen div.
    // Aquí asumimos que ya existe un nodo con id "loading-screen-root"
    try {
      const { url } = await captureToBlobUrl('loading-screen-root', 1920, 1080);
      // abre la url en nueva pestaña (temporaria) para usar en OBS como fuente de navegador o descargarla
      window.open(url, '_blank');
      // también podrías descargar automáticamente:
      // const a = document.createElement('a'); a.href = url; a.download = 'loading.png'; a.click();
    } catch (err) {
      console.error(err);
      alert('Error generando imagen. Revisa la consola.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-700 to-slate-900">
      <div className="p-4 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-black mb-2 tracking-wide bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            2XKO
          </h1>
          <p className="text-xl font-bold tracking-wider text-gray-300">
            CHARACTER SELECT
          </p>
          <div className="w-24 h-1 mx-auto mt-2 bg-gradient-to-r from-yellow-400 to-red-500"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Player Selection Area */}
          <div className="xl:col-span-1">
            <div className="p-4 rounded-lg shadow-2xl bg-gray-700 border-4 border-gray-600">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 tracking-wide text-yellow-400">
                <ChampionIcon />
                PLAYER POSITIONS
              </h2>
              
              {/* Team A */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-blue-400">TEAM A</h3>
                <div className="grid grid-cols-2 gap-3">
                  <PlayerSlot 
                    playerId="P1"
                    champion={players.P1}
                    onClick={() => handlePlayerSlotClick('P1')}
                    isActive={activePlayerId === 'P1'}
                  />
                  <PlayerSlot 
                    playerId="P2"
                    champion={players.P2}
                    onClick={() => handlePlayerSlotClick('P2')}
                    isActive={activePlayerId === 'P2'}
                  />
                </div>
              </div>

              {/* Team B */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-3 text-red-400">TEAM B</h3>
                <div className="grid grid-cols-2 gap-3">
                  <PlayerSlot 
                    playerId="P3"
                    champion={players.P3}
                    onClick={() => handlePlayerSlotClick('P3')}
                    isActive={activePlayerId === 'P3'}
                  />
                  <PlayerSlot 
                    playerId="P4"
                    champion={players.P4}
                    onClick={() => handlePlayerSlotClick('P4')}
                    isActive={activePlayerId === 'P4'}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Button 
                  onClick={reset}
                  className="w-full px-4 py-2 font-bold tracking-wide transition-all bg-gray-600 text-white border-2 border-gray-500 hover:bg-gray-500"
                >
                  RESET ALL
                </Button>
              </div>
            </div>
          </div>

          {/* Champion Selection Grid */}
          <div className="xl:col-span-2">
            <div className="p-4 rounded-lg shadow-2xl bg-gray-700 border-4 border-gray-600">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 tracking-wide text-yellow-400">
                <ChampionIcon />
                {activePlayerId ? `SELECT FOR ${activePlayerId}` : 'SELECT PLAYER FIRST'}
              </h2>
              {activePlayerId && (
                <div className="mb-4 p-3 bg-blue-900/50 rounded-lg border border-blue-600">
                  <p className="text-blue-200 text-sm">
                    🎯 Selecting champion for <span className="font-bold text-yellow-300">{activePlayerId}</span>
                  </p>
                </div>
              )}
              <ChampionGrid 
                champions={PL_CHARACTERS} 
                onSelect={handleChampionSelect} 
                selectedIds={selectedChampionIds} 
                getPlayerUsingChampion={getPlayerUsingChampion}
              />
            </div>
          </div>
        </div>

        {/* Fuse Selectors */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FuseSelector 
            selectedFuse={teamA.selectedFuse} 
            onFuseSelect={(fuse) => toggleFuse('A', fuse)}
            teamName={teamA.name || 'TEAM A'} 
          />
          
          <FuseSelector 
            selectedFuse={teamB.selectedFuse} 
            onFuseSelect={(fuse) => toggleFuse('B', fuse)}
            teamName={teamB.name || 'TEAM B'} 
          />
        </div>

        {/* Generate Button */}
        <div className="mt-6">
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white py-3 text-lg font-black tracking-wide border-2 border-green-500 transition-all transform hover:scale-105"
          >
            GENERATE SCREEN
          </Button>
        </div>

        {/* Preview sections - hidden for high-res capture */}
        <div className="mt-12 space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview (exportable)</h2>
            <div style={{ width: 960, height: 540 }} className="border border-gray-200 rounded-lg overflow-hidden">
              <LoadingScreen 
                teamA={teamA} 
                teamB={teamB} 
                fuseA={getTeamFuse(teamA)} 
                fuseB={getTeamFuse(teamB)} 
                size={{width:960,height:540}} 
              />
            </div>
          </div>

          {/* Render a full-size hidden node for high-res capture */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <LoadingScreen 
              teamA={teamA} 
              teamB={teamB} 
              fuseA={getTeamFuse(teamA)} 
              fuseB={getTeamFuse(teamB)} 
              size={{width:1280,height:720}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Icono decorativo para el título de campeones
function ChampionIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
  );
}
