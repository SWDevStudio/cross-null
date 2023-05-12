import {GameField} from "./components/GameField/GameField";
import {CrossNullController} from "./class/CrossNullController";
import {CrossNullCore} from "./class/CrossNullCore";

// Можно добавить дополнительные настройки
const crossNullCore = new CrossNullCore()
const crossNullView = new GameField()

const crossNullController: CrossNullController = new CrossNullController(
  crossNullCore,
  crossNullView
)
crossNullController.init('.app')