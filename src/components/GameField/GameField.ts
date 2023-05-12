import './GameField.scss'
import {GameFieldOption} from "./GameField.types";
import {CrossNullController} from "../../class/CrossNullController";

export class GameField {
  protected _root: HTMLElement;
  protected _controller: CrossNullController;
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
    const root = document.createElement('div');
    root.classList.add('game-field');
    this._root = root;
    this.render();

    target.appendChild(root);
    return this;
  }

  public render() {
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
    this._root.querySelectorAll('*').forEach(i => i.remove())
    this._root.append(...lines)
  }

  public endGame(message) {
    alert(message)
  }
}