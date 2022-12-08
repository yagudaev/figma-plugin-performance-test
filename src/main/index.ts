import { showUI } from "@create-figma-plugin/utilities"
import { exposeAllToUI } from "../lib"
import * as actions from "./actions"

export default function () {
  exposeAllToUI(actions)
  showUI({ height: 240, width: 320 })
}
