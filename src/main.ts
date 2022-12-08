import { emit, on, showUI } from "@create-figma-plugin/utilities"
import Timeout from "await-timeout"
import { ReqCountHandler, ResCountHandler } from "./api"

export default function () {
  exposeToUI(count)
  showUI({ height: 240, width: 320 })
}

async function count() {
  console.log("It's the final countdown! Tananana nanana nanana")
  await Timeout.set(1000)
  return 1000
}

function exposeToUI(fn: () => Promise<number>) {
  console.log("called by function with name", fn.name)
  on<ReqCountHandler>("REQ_COUNT", async () => {
    const returnValue = await fn()
    emit<ResCountHandler>("RES_COUNT", returnValue)
  })
}
