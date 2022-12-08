import { emit, on, showUI } from "@create-figma-plugin/utilities"
import Timeout from "await-timeout"
import { ReqCountHandler, ResCountHandler } from "./api"

export default function () {
  on<ReqCountHandler>("REQ_COUNT", async function () {
    console.log("It's the final countdown! Tananana nanana nanana")
    await Timeout.set(5000)
    emit<ResCountHandler>("RES_COUNT")
  })
  showUI({ height: 240, width: 320 })
}
