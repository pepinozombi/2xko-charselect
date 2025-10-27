import { useState } from "react";
import type { Champion, Fuse } from "@/utils/data";

export type Player = {
  id: 'P1' | 'P2' | 'P3' | 'P4';
  champion: Champion | null;
  name: string;
};

export type Team = { 
  id: 'A' | 'B'; 
  players: Player[];
  name?: string; 
  selectedFuse: Fuse | null;
};

export function useSelection() {
    const [players, setPlayers] = useState<Record<'P1' | 'P2' | 'P3' | 'P4', Champion | null>>({
        P1: null,
        P2: null,
        P3: null,
        P4: null,
    });

    const [fuses, setFuses] = useState<Record<'A' | 'B', Fuse | null>>({
        A: null,
        B: null,
    });

    // Función para seleccionar un campeón en una posición específica
    function selectChampionForPlayer(playerId: 'P1' | 'P2' | 'P3' | 'P4', champion: Champion | null) {
        // Si estamos borrando la selección, permitir siempre
        if (champion === null) {
            setPlayers(prev => ({
                ...prev,
                [playerId]: champion
            }));
            return;
        }

        // Verificar si el campeón ya está seleccionado en el mismo equipo
        const isTeamA = playerId === 'P1' || playerId === 'P2';
        const teammateIds = isTeamA ? ['P1', 'P2'] as const : ['P3', 'P4'] as const;
        
        setPlayers(prev => {
            // Verificar si algún compañero de equipo ya tiene este campeón
            const teammateHasChampion = teammateIds
                .filter(id => id !== playerId) // Excluir el jugador actual
                .some(id => prev[id]?.id === champion.id);
            
            if (teammateHasChampion) {
                // No permitir la selección si un compañero ya tiene este campeón
                return prev;
            }

            return {
                ...prev,
                [playerId]: champion
            };
        });
    }

    // Función para obtener los equipos basados en los jugadores
    const getTeams = (): { teamA: Team; teamB: Team } => {
        const teamA: Team = {
            id: 'A',
            players: [
                { id: 'P1', champion: players.P1, name: 'Jugador 1' },
                { id: 'P2', champion: players.P2, name: 'Jugador 2' },
            ],
            name: 'Equipo A',
            selectedFuse: fuses.A,
        };

        const teamB: Team = {
            id: 'B',
            players: [
                { id: 'P3', champion: players.P3, name: 'Jugador 3' },
                { id: 'P4', champion: players.P4, name: 'Jugador 4' },
            ],
            name: 'Equipo B',
            selectedFuse: fuses.B,
        };

        return { teamA, teamB };
    };

    function toggleFuse(teamId: 'A' | 'B', fuse: Fuse) {
        setFuses(prev => ({
            ...prev,
            [teamId]: prev[teamId]?.id === fuse.id ? null : fuse
        }));
    }

    function reset() {
        setPlayers({
            P1: null,
            P2: null,
            P3: null,
            P4: null,
        });
        setFuses({
            A: null,
            B: null,
        });
    }

    // Obtener todos los campeones seleccionados para evitar duplicados
    const selectedChampionIds = Object.values(players)
        .filter(champion => champion !== null)
        .map(champion => champion!.id);

    // Función para obtener qué jugador está usando un campeón específico
    const getPlayerUsingChampion = (championId: string): 'P1' | 'P2' | 'P3' | 'P4' | null => {
        for (const [playerId, champion] of Object.entries(players)) {
            if (champion?.id === championId) {
                return playerId as 'P1' | 'P2' | 'P3' | 'P4';
            }
        }
        return null;
    };

    const { teamA, teamB } = getTeams();

    return { 
        players, 
        teamA, 
        teamB, 
        selectChampionForPlayer, 
        toggleFuse, 
        reset,
        selectedChampionIds,
        getPlayerUsingChampion
    };
}