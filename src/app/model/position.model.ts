import {DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW} from '@angular/cdk/keycodes';
import {GameConfig} from './game-config.model';

export class Position {
  y: number;
  x: number;

  lastPosition;
  positionHistory: Position[] = new Array();


  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }

  move(arrowCode: number): void {
    this.lastPosition = new Position(this.y, this.x);
    this.positionHistory.unshift(this.lastPosition);
    if (arrowCode === RIGHT_ARROW) {
      this.x = this.x + 1;
    }
    if (arrowCode === LEFT_ARROW) {
      this.x = this.x - 1;
    }
    if (arrowCode === UP_ARROW) {
      this.y = this.y - 1;
    }
    if (arrowCode === DOWN_ARROW) {
      this.y = this.y + 1;
    }
  }

  invalid() {
    return this.x > GameConfig.x || this.x < 0 || this.y > GameConfig.y || this.y < 0;
  }

  canMoveTo(position: Position, arrowCode: number): boolean {
    let x = this.x;
    let y = this.y;
    if (arrowCode === RIGHT_ARROW) {
      x = Math.min(this.x + 1, 49);
    }
    if (arrowCode === LEFT_ARROW) {
      x = Math.max(this.x - 1, 0);
    }
    if (arrowCode === UP_ARROW) {
      y = Math.max(this.y - 1, 0);
    }
    if (arrowCode === DOWN_ARROW) {
      y = Math.min(this.y + 1, 49);
    }
    return position.equals(new Position(y, x));
  }

  equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }

  clone(): Position {
    return new Position(this.y, this.x);
  }

}
