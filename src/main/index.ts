import { showUI } from "@create-figma-plugin/utilities"
import { exposeToUI } from "../lib"
import * as actions from "./actions"

export const COUNT_TARGET = 5_600_000_000

export default function () {
  Object.keys(actions).map((actionName: string) => exposeToUI((actions as any)[actionName]))
  showUI({ height: 240, width: 320 })
}
