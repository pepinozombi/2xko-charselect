import type { Team } from "@/hooks/useSelection";
import { FuseBadge } from "@/components/molecules/FuseBadge";

type LoadingProps = {
  teamA: Team;
  teamB: Team;
  fuseA?: { name: string; icon: string; color: string } | null;
  fuseB?: { name: string; icon: string; color: string } | null;
  size?: { width: number; height: number };
};

export function LoadingScreen({ teamA, teamB, fuseA, fuseB, size = { width: 1280, height: 720 } }: LoadingProps) {
  return (
    <div id="loading-screen-root" style={{ width: size.width, height: size.height }} className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Fondo simple — puedes sustituir por artwork */}
      <div className="absolute inset-0 opacity-30 bg-[url('/assets/bg.jpg')] bg-cover" />
      <div className="relative z-10 h-full flex items-center justify-between p-12">
        {/* Team A */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            {fuseA && <img src={fuseA.icon} alt={fuseA.name} className="w-12 h-12" />}
            <div>
              <div className="text-2xl font-bold">{teamA.name}</div>
              <div className="text-sm text-gray-200">
                {teamA.players.filter(p => p.champion).map(p => p.champion!.name).join(' / ')}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {teamA.players.filter(p => p.champion).map(p => (
              <img key={p.id} src={p.champion!.image} alt={p.champion!.name} className="w-48 h-48 object-cover rounded-lg shadow-lg" />
            ))}
          </div>
        </div>

        {/* Centro - VS */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl font-extrabold">VS</div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-end gap-6 text-right">
          <div className="flex items-center gap-3 justify-end">
            <div>
              <div className="text-2xl font-bold">{teamB.name}</div>
              <div className="text-sm text-gray-200">{teamB.players.filter(p => p.champion).map(p => p.champion!.name).join(' / ')}</div>
            </div>
            {fuseB && <img src={fuseB.icon} alt={fuseB.name} className="w-12 h-12" />}
          </div>
          <div className="flex gap-3">
            {teamB.players.filter(p => p.champion).map(p => (
              <img key={p.id} src={p.champion!.image} alt={p.champion!.name} className="w-48 h-48 object-cover rounded-lg shadow-lg" />
            ))}
          </div>
        </div>
      </div>
      {/* Footer: fuse badges */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-6">
        {fuseA && <div className="flex items-center gap-2"><FuseBadge fuse={fuseA} /></div>}
        {fuseB && <div className="flex items-center gap-2"><FuseBadge fuse={fuseB} /></div>}
      </div>
    </div>
  );
}