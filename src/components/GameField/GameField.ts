import './GameField.scss'
import {GameFieldOption} from "./GameField.types";
import {CrossNullController} from "../../class/CrossNullController";

export class GameField {
  protected _gameField: HTMLElement;
  protected _gameBoard: HTMLElement;
  protected _controller: CrossNullController;
  protected _root: HTMLElement
  crossImage: string;
  nullImage: string;
  matrixSize: number = 3;

  constructor({crossImage, nullImage, matrixSize}: GameFieldOption = {}) {
    this.crossImage = crossImage || '/default-img'
    this.nullImage = nullImage || '/default-img'
    this.matrixSize = matrixSize || this.matrixSize
  }

  set controller(controller: CrossNullController) {
    this._controller = controller
  }

  public init(target: HTMLElement) {
    this._root = target

    const gameField = document.createElement('div');
    gameField.classList.add('game-field');
    this._gameField = gameField;

    const gameBoard = document.createElement('div')
    this._gameBoard = gameBoard
    this._gameBoard.classList.add('game-board')

    this._root.append(gameField, gameBoard)
    this.render()
    // target.appendChild(gameField);
    // target.appendChild(document.createElement('div'))
    return this;
  }

  public render() {
    this._renderGameField()
    this._renderBoardField()
  }

  private _renderGameField() {

    const matrix = this._controller.getMatrix().map((line, dx) => {
      return line.map((crossMarker, dy) => {
        const div = document.createElement('div')
        div.innerText = crossMarker
        div.addEventListener('click', () => this._controller.setMarker(dx, dy))
        return div
      })
    })

    const lines = matrix.map((line) => {
      const div = document.createElement('div')
      div.classList.add('game-field__line')
      div.append(...line)

      return div
    })

    // Думаю стоит по другому удалять блоки, и проверить как вообще удаляются элементы из DOM
    this._gameField.querySelectorAll('*').forEach(i => i.remove())
    this._gameField.append(...lines)
  }

  private _renderBoardField() {
    this._gameBoard.innerText = `Текущий символ: ${this._controller.getCurrentSymbol()}`
  }

  public endGame(message) {
    alert(message)
  }
}