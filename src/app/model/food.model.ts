import {Position} from './position.model';
import {GameMap} from './map.model';
import {Snack} from './snack.model';

export class Food {
  position: Position;
  history: Position[] = [];
  map: GameMap;

  constructor(map: GameMap) {
    this.map = map;
    this.position = this.randomPosition();
    this.history.push(new Position(0, 0));
  }

  isSelf(position: Position): boolean {
    return this.position.equals(position);
  }

  randomPosition(): Position {
    const x = Math.floor(Math.random() * this.map.x);
    const y = Math.floor(Math.random() * this.map.y);
    return new Position(y, x);
  }

  fresh(snack: Snack): void {
    this.history.push(this.position);
    let randomPosition;
    while (!randomPosition || !!snack.body.find(item => item && item.equals(randomPosition))) {
      randomPosition = this.randomPosition();
    }
    this.position = randomPosition;
  }

  /**
   * 这一次果实到上次果实的最小距离
   */
  getMinDistance(): number {
    const lastFood = this.getLastFoodPosition();
    return Math.abs(this.position.x - lastFood.x) + Math.abs(this.position.y - lastFood.y);
  }

  getLastFoodPosition(): Position {
    return this.history[this.history.length - 1];
  }

}
