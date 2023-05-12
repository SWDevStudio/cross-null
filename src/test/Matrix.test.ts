import {Matrix} from "../class/Matrix";

describe('Matrix', () => {
  let matrix: number[][]

  let transposeMatrix: number[][]

  beforeEach(() => {
    matrix = [
      [0, 1, 0],
      [0, 2, 0],
      [0, 3, 1],
    ]

    transposeMatrix = [
      [0, 0, 0],
      [1, 2, 3],
      [0, 0, 1]
    ]
  })

  describe('getDiagonal', () => {
    it('Получим главную диагональ', () => {
      expect(Matrix.getDiagonal(matrix, 'main')).toEqual([0, 2, 1])
    })

    it('Получим анти диагональ', () => {
      expect(Matrix.getDiagonal(matrix, 'anti')).toEqual([0, 2, 0])
    })
  })

  describe('transpose', () => {
    it('Корректная перевернутая матрица', () => {
      expect(Matrix.transpose(matrix)).toEqual(transposeMatrix)
    })
  })
})