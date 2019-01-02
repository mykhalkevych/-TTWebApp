import { Player } from './player.model';

export interface GameSet {
  firstPlayerPoints: number;
  secondPlayerPoints: number;
}

export interface Game {
  id: string;
  date: string;
  double?: boolean;
  tournament?: string;
  gameType: string;
  status?: string;
  firstPlayer: Player;
  secondPlayer: Player;
  result: Array<GameSet>;
}
