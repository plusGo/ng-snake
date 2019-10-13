import {NumberStream} from 'stream-plus';
import {Position} from './position.model';
import {GameConfig} from './game-config.model';

export class GameMap {
  x: number; // 横向个数
  y: number; // 纵向个数
  positions: Position[] = [];


  constructor() {
    this.x = GameConfig.x;
    this.y = GameConfig.y;
    this.positions = NumberStream.from(0, this.y)
      .flatMap(($y) => NumberStream.from(0, this.x).map(($x) => new Position($y, $x)))
      .toArray();
  }
}
