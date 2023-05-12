import {CrossNullCore} from "../class/CrossNullCore";
import {FIELD_MARKER} from "../enum/FIELD_MARKER";
import {CROSS_NULL_ERRORS} from "../enum/CROSS_NULL_ERRORS";

describe('CrossNullCore', () => {
  let crossNullCore: CrossNullCore
  const dx = 0
  const dy = 0

  beforeEach(() => {
    crossNullCore = new CrossNullCore()
  })

  describe('writeSymbol', () => {
    it('Первая запись в поле всегда будет X', () => {
      crossNullCore.writeSymbol(dx, dy)
      expect(crossNullCore.field[dx][dy]).toEqual(FIELD_MARKER.X)
    })

    it('Следующий текущий символ внутри класса после X будет O', () => {
      crossNullCore.writeSymbol(dx, dy)
      crossNullCore.writeSymbol(1, 1)
      expect(crossNullCore.getSymbol(1, 1)).toEqual(FIELD_MARKER.O)
    })

    it('Ожидается ошибка если попытаться записать значение в уже записанное поле', () => {
      crossNullCore.writeSymbol(dx, dy)
      expect(() => {
        crossNullCore.writeSymbol(dx, dy)
      }).toThrowError(CROSS_NULL_ERRORS.NOT_WRITABLE)
    })

    it('Ожидается ошибка, если пользователь попытается записать в отрицательные координаты', () => {
      expect(() => {
        crossNullCore.writeSymbol(-1, 0)
      }).toThrowError(CROSS_NULL_ERRORS.NOT_COORDINATE)
    })

    it('Ожидается ошибка, если пользователь попытается записать в координаты привышающие значение', () => {
      expect(() => {
        crossNullCore.writeSymbol(4, 0)
      }).toThrowError(CROSS_NULL_ERRORS.MAX_SIZE)

      expect(() => {
        crossNullCore.writeSymbol(0, 4)
      }).toThrowError(CROSS_NULL_ERRORS.MAX_SIZE)
    })
  });

  describe('checkWin', () => {
    it('Работает по горизонтальной линии', () => {
      crossNullCore.field[0][0] = FIELD_MARKER.X
      crossNullCore.field[0][1] = FIELD_MARKER.X
      crossNullCore.field[0][2] = FIELD_MARKER.X

      expect(crossNullCore.checkWin()).toBe(true)
    })

    it('Работает по вертикальной линии', () => {

      crossNullCore.field[0][0] = FIELD_MARKER.X
      crossNullCore.field[1][0] = FIELD_MARKER.X
      crossNullCore.field[2][0] = FIELD_MARKER.X

      crossNullCore.writeSymbol(2, 0)
      expect(crossNullCore.checkWin()).toBe(true)
    })

    it('Работает по диагонали', () => {
      crossNullCore.field[0][0] = FIELD_MARKER.X
      crossNullCore.field[1][1] = FIELD_MARKER.X
      crossNullCore.field[2][2] = FIELD_MARKER.X

      expect(crossNullCore.checkWin()).toBe(true)
    })
  })
});