import {Position} from './position.model';
import {Food} from './food.model';

export class Snack {
  head: Position = new Position(0, 0);
  body: Position[] = [];
  speed = 150;


  constructor(head?: Position, body?: Position[]) {
    if (head) {
      this.head = head;
    }
    if (body) {
      this.body = body;
    }
  }

  isHead(position: Position): boolean {
    return this.head.equals(position);
  }

  isBody(position: Position): boolean {
    return !!(this.body.find(bodyPosition => bodyPosition && bodyPosition.equals(position)));
  }

  move(arrowCode: number): void {
    if (this.head.invalid()) {
      return;
    }
    this.head.move(arrowCode);

    this.body.forEach((bodyPosition, index, body) => {
      body[index] = this.head.positionHistory[index];
    });
  }

  canEat(food: Food, arrowCode: number): boolean {
    return this.head.canMoveTo(food.position, arrowCode);
  }

  /*
  * 吃掉果实，返回分数
  * */
  eat(food: Food): number {
    /*计算得分
    * */
    const defaultScore = 10;
    const minDistance = food.getMinDistance();
    const movedStep = this.head.positionHistory.findIndex(item => item.equals(food.getLastFoodPosition())) + 2;

    let history = this.head.positionHistory;
    const lastHead = this.head.clone();
    this.head = food.position.clone();
    history.unshift(lastHead);
    history = history.splice(0, 200);
    this.head.positionHistory = history;
    this.body.unshift(lastHead);

    return Math.max(defaultScore - (movedStep - minDistance), 1);
  }

  invalid(): boolean {
    const hitBody = !!(this.body.find($bodyPosition => $bodyPosition && $bodyPosition.equals(this.head)));
    return hitBody || this.head.invalid();
  }
}
