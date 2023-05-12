import {CrossNullCore} from "./CrossNullCore";
import {GameField} from "../components/GameField/GameField";

export class CrossNullController {
  crossCore: CrossNullCore
  gameField: GameField

  constructor(crossCore: CrossNullCore, gameField: GameField) {
    this.crossCore = crossCore
    this.gameField = gameField

    this.gameField.controller = this
  }

  setMarker(x: number, y: number) {
    this.crossCore.writeSymbol(x, y)
    this.gameField.render()

    if (this.crossCore.checkWin()) {
      this.gameField.endGame('Игра закончена')
    }
  }

  getMatrix() {
    return this.crossCore.field
  }

  init(selector: string) {
    this.gameField.init(document.querySelector(selector))
    return
  }
}