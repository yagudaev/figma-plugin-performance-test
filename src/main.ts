import { once, showUI } from "@create-figma-plugin/utilities"
import { ReqCountHandler } from "./api"

export default function () {
  once<ReqCountHandler>("REQ_COUNT", async function () {
    console.log("It's the final countdown! Tananana nanana nanana")
  })
  showUI({ height: 240, width: 320 })
}
