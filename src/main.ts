import { emit, on, showUI } from "@create-figma-plugin/utilities"
import Timeout from "await-timeout"
import { ReqCountHandler, ResCountHandler } from "./api"

export default function () {
  handleCount(async function () {
    console.log("It's the final countdown! Tananana nanana nanana")
    await Timeout.set(1000)
    return 1000
  })
  showUI({ height: 240, width: 320 })
}

function handleCount(fn: () => Promise<number>) {
  on<ReqCountHandler>("REQ_COUNT", async () => {
    const returnValue = await fn()
    emit<ResCountHandler>("RES_COUNT", returnValue)
  })
}
