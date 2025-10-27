import { render, screen, fireEvent } from '@testing-library/react';
import { ChampionCard } from './ChampionCard';
import type { Champion } from '@/utils/data';

const mockChampion: Champion = {
  id: 'c1',
  name: 'Test Champ',
  thumbnail: '/assets/test-thumb.png',
  image: '/assets/test.png',
  archetype: 'Rushdown'
};

test('renders champion card and triggers onSelect', () => {
  const onSelect = jest.fn();
  render(<ChampionCard champ={mockChampion} onSelect={onSelect} />);
  expect(screen.getByText('Test Champ')).toBeInTheDocument();
  const card = screen.getByText('Test Champ');
  fireEvent.click(card);
  expect(onSelect).toHaveBeenCalledWith(mockChampion);
});