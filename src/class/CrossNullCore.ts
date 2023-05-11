import {FIELD_MARKER} from "../enum/FIELD_MARKER";
import {CROSS_NULL_ERRORS} from "../enum/CROSS_NULL_ERRORS";
import {Matrix} from "./Matrix";

export type CrossFieldMarker = FIELD_MARKER | ''
type CrossNullMatrix = Array<Array<CrossFieldMarker>>
export class CrossNullCore {
  private currentMarker: FIELD_MARKER = FIELD_MARKER.X

  field: CrossNullMatrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  public writeSymbol(x: number, y: number): void {
    if (x > 3 || y > 3) throw new Error(CROSS_NULL_ERRORS.MAX_SIZE)
    if (x < 0 || y < 0) throw new Error(CROSS_NULL_ERRORS.NOT_COORDINATE)
    if (!this._isEmptyField(x, y)) throw new Error(CROSS_NULL_ERRORS.NOT_WRITABLE)

    this.field[x][y] = this.currentMarker
    const isWin = this._checkWin()
    if (isWin) this.exit()
    this._changeMarker()
  }

  public getSymbol(x: number, y: number): CrossFieldMarker {
    return this.field[x][y]
  }

  private _changeMarker(): void {
    this.currentMarker = this.currentMarker === FIELD_MARKER.X ? FIELD_MARKER.O : FIELD_MARKER.X
  }

  public exit(winner?: FIELD_MARKER): void {
    console.log('Конец игры')
  }

  private _isEmptyField(x: number, y: number): boolean {
    return Boolean(!this.field[x][y])
  }

  private _checkWin(): boolean {
    const line = this._checkLines(this.field)
    if (line) return line

    const transposeLine = this._checkLines(Matrix.transpose(this.field))
    if (transposeLine) return transposeLine

    const diagonal = this._checkDiagonals(this.field)
    if (diagonal) return diagonal

    return false
  }

  private _checkDiagonals(matrix: CrossNullMatrix): boolean {
    const mainDiagonal = Matrix.getDiagonal(matrix, 'main')
    if (mainDiagonal.every(val => val && val === mainDiagonal[0]))
      return true

    const antiDiagonal = Matrix.getDiagonal(matrix, 'anti')
    return antiDiagonal.every(val => val && val === antiDiagonal[0]);
  }

  private _checkLines(matrix: CrossNullMatrix): boolean {
    return matrix.some(line => line.every(val => val && val === line[0]));
  }
}