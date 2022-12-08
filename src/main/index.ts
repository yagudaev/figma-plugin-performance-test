import { showUI } from "@create-figma-plugin/utilities"
import { exposeAllToUI } from "../lib"
import * as actions from "./actions"

export const COUNT_TARGET = 5_600_000_000

export default function () {
  exposeAllToUI(actions)
  showUI({ height: 240, width: 320 })
}
