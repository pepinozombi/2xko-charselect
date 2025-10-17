import { Avatar } from "@/components/atoms/Avatar";
import { FuseBadge } from "./FuseBadge";
import type { Champion, Fuse } from "@/utils/data";

export function ChampionCard({ champ, selected, onSelect }: { champ: Champion; selected?: boolean; onSelect: (c: Champion)=>void }) {
  return (
    <div className={`p-3 rounded-2xl shadow-sm cursor-pointer transition transform ${selected ? 'ring-4 ring-blue-300 scale-105' : 'hover:scale-102'}`}
         onClick={()=>onSelect(champ)}
    >
      <div className="flex items-center gap-3">
        <Avatar src={champ.thumbnail} alt={champ.name} size={56} />
        <div>
          <div className="font-semibold">{champ.name}</div>
          <div className="flex gap-2 mt-1">
            {champ.fuses?.slice(0,2).map((f: Fuse) => <FuseBadge key={f.id} fuse={f} />)}
          </div>
        </div>
      </div>
    </div>
  );
}