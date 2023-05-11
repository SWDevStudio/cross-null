export class Matrix {
  static transpose<T>(matrix: Array<Array<T>>): Array<Array<T>> {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  }

  static getDiagonal<T>(matrix: Array<Array<T>>, diagonal: 'main' | 'anti'): Array<T> {
    const diagonalData = [];


    for (let i = 0; i < matrix.length; i++) {
      if (diagonal === 'main') diagonalData.push(matrix[i][i])
      else diagonalData.push(matrix[i][matrix.length - 1 - i]);
    }

    return diagonalData
  }
}