import type { Team } from "@/hooks/useSelection";

export function TeamPreview({ team }: { team: Team }) {
  return (
    <div className="p-3 bg-white rounded-2xl shadow flex flex-col gap-2">
      <div className="text-sm font-bold">{team.name} ({team.players.length}/2)</div>
      <div className="flex gap-3">
        {team.players.length === 0 ? <small className="text-gray-400">Empty</small> :
          team.players.map(p => (
            <div key={p.id} className="flex flex-col items-center">
              <img src={p.thumbnail} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
              <span className="text-xs">{p.name.split(' ')[0]}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}