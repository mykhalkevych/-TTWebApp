import { Player } from './player.model';

export interface Game {
  id: string;
  firstPlayer: Player;
  secondPlayer: Player;
  likes: number;
}
