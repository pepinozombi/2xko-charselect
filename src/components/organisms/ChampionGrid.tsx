import { ChampionCard } from "@/components/molecules/ChampionCard";
import type { Champion } from "@/utils/data";

interface ChampionGridProps {
  champions: Champion[];
  onSelect: (c: Champion) => void;
  selectedIds: string[];
  getPlayerUsingChampion?: (championId: string) => 'P1' | 'P2' | 'P3' | 'P4' | null;
}

export function ChampionGrid({ champions, onSelect, selectedIds, getPlayerUsingChampion }: ChampionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {champions.map(c => (
        <ChampionCard 
          key={c.id} 
          champ={c} 
          selected={selectedIds.includes(c.id)} 
          onSelect={onSelect}
          playerUsing={getPlayerUsingChampion ? getPlayerUsingChampion(c.id) : null}
        />
      ))}
    </div>
  );
}