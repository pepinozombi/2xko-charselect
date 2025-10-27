import { renderHook, act } from '@testing-library/react';
import { useSelection } from './useSelection';
import type { Champion } from '@/utils/data';

const champ: Champion = { id: 'x', name: 'X', thumbnail: '', image: '', archetype: 'Test' };

test('can select champion for player', () => {
  const { result } = renderHook(() => useSelection());
  
  // Select champion for P1
  act(() => {
    result.current.selectChampionForPlayer('P1', champ);
  });
  expect(result.current.players.P1).toEqual(champ);
  expect(result.current.teamA.players[0].champion).toEqual(champ);
  
  // Remove champion from P1
  act(() => {
    result.current.selectChampionForPlayer('P1', null);
  });
  expect(result.current.players.P1).toBeNull();
  expect(result.current.teamA.players[0].champion).toBeNull();
});

test('prevents duplicate champions in same team', () => {
  const { result } = renderHook(() => useSelection());
  
  // Select champion for P1 (Team A)
  act(() => {
    result.current.selectChampionForPlayer('P1', champ);
  });
  expect(result.current.players.P1).toEqual(champ);
  
  // Try to select same champion for P2 (same team) - should be blocked
  act(() => {
    result.current.selectChampionForPlayer('P2', champ);
  });
  expect(result.current.players.P2).toBeNull(); // Should remain null
  
  // But should allow same champion in different team (P3 - Team B)
  act(() => {
    result.current.selectChampionForPlayer('P3', champ);
  });
  expect(result.current.players.P3).toEqual(champ); // Should work
});

test('getPlayerUsingChampion returns correct player', () => {
  const { result } = renderHook(() => useSelection());
  
  // Select champion for P2
  act(() => {
    result.current.selectChampionForPlayer('P2', champ);
  });
  
  expect(result.current.getPlayerUsingChampion(champ.id)).toBe('P2');
  expect(result.current.getPlayerUsingChampion('nonexistent')).toBeNull();
});