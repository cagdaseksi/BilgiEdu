import type { ComponentType } from 'react';
export type GameScreen = 'home' | 'levels' | 'game';
export type ParticipantScreenProps = {
  screen: GameScreen;
  level: number;
  onBack: () => void;
  onExit: () => void;
  onOpenLevels: () => void;
  onPlayLevel: (level: number) => void;
};
export type Participant = {
  id: string;
  name: string;
  gameTitle: string;
  accent: string;
  Screen: ComponentType<ParticipantScreenProps>;
};
