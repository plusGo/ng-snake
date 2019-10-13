import {Component} from '@angular/core';
import {fromEvent, timer} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Snack} from './model/snack.model';
import {GameMap} from './model/map.model';
import {Food} from './model/food.model';
import {DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW} from '@angular/cdk/keycodes';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SuccessModalComponent} from './share/success-modal/success-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  map: GameMap;
  snack: Snack = new Snack();

  startMove = false;
  lastArrow;
  currentFood: Food;
  score = 0;
  gameStatus: 'init' | 'start' | 'stop' | 'end' = 'init';

  recentMessage = [];

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.map = new GameMap();
    this.snack = new Snack();
    this.currentFood = new Food(this.map);
    this.recentMessage.unshift('游戏初始化成功！来战吧小蛇！');
    timer(0, this.snack.speed)
      .pipe(
        filter(() => this.startMove),
        filter(() => this.gameStatus === 'start'),
        filter(() => !!this.lastArrow),
      )
      .subscribe(() => {
        const canEat = this.snack.canEat(this.currentFood, this.lastArrow);
        if (canEat) {
          const score = this.snack.eat(this.currentFood);
          this.currentFood.fresh(this.snack);
          this.score = this.score + score;
          this.recentMessage.unshift(`小蛇吃掉了果实，加${score}分`);
          if (this.score === 300) {
            this.win();
          }
        } else {
          this.snack.move(this.lastArrow);
        }
        if (this.snack.invalid()) {
          this.recentMessage.unshift('为什么这么不小心！死掉了！');
          this.gameStatus = 'end';
          const simpleSnackBarMatSnackBarRef = this.snackBar.open('为什么这么不小心！撞墙了！', '再来一局', {
            duration: 20000,
          });
          simpleSnackBarMatSnackBarRef.onAction().subscribe(() => {
            this.reStartGame();
          });
        }
      });

    fromEvent<any>(document, 'keyup')
      .pipe(
        filter(() => this.gameStatus === 'start'),
        tap((event) => event.preventDefault()),
        map(event => event.keyCode),
        tap(() => this.startMove = true)
      )
      .subscribe(keyCode => {
        if (this.lastArrow === RIGHT_ARROW && keyCode === LEFT_ARROW) {
          return;
        }
        if (this.lastArrow === LEFT_ARROW && keyCode === RIGHT_ARROW) {
          return;
        }
        if (this.lastArrow === UP_ARROW && keyCode === DOWN_ARROW) {
          return;
        }
        if (this.lastArrow === DOWN_ARROW && keyCode === UP_ARROW) {
          return;
        }
        this.lastArrow = keyCode;
      });
  }

  startGame() {
    this.gameStatus = 'start';
    this.recentMessage.unshift('哇，开始了游戏！');
  }

  reStartGame() {
    this.recentMessage.unshift('重新开始游戏！');
    this.gameStatus = 'start';
    this.score = 0;
    this.snack = new Snack();
    this.currentFood = new Food(this.map);
    this.lastArrow = null;
  }

  stopStartGame() {
    this.recentMessage.unshift('暂停游戏，喝杯水！');
    this.gameStatus = 'stop';
  }

  continueStartGame() {
    this.recentMessage.unshift('继续游戏！');
    this.gameStatus = 'start';
  }

  win() {
    this.dialog.open(SuccessModalComponent, {
      width: '400px',
    });
  }
}
