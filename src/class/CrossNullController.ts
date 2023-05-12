import {CrossNullCore} from "./CrossNullCore";
import {GameField} from "../components/GameField/GameField";
import {FIELD_MARKER} from "../enum/FIELD_MARKER";

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

    if (this.crossCore.isHaveFullField) {
      this.gameField.endGame('Ничья')
    }
    else if (this.crossCore.checkWin()) {
      this.gameField.endGame('Игра закончена')
    }
  }

  getMatrix() {
    return this.crossCore.field
  }

  getCurrentSymbol(): FIELD_MARKER {
    return this.crossCore.currentMarker
  }

  init(selector: string) {
    this.gameField.init(document.querySelector(selector))
    return
  }
}