import { once, showUI } from "@create-figma-plugin/utilities"

import { InsertCodeHandler } from "./types"

export default function () {
  once<InsertCodeHandler>("INSERT_CODE", async function (code: string) {
    console.log("Received code from UI:", code)
  })
  showUI({ height: 240, width: 320 })
}
