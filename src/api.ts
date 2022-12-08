import { emit, EventHandler, once } from "@create-figma-plugin/utilities"

export interface ReqCountHandler extends EventHandler {
  name: "REQ_COUNT"
  handler: () => void
}

export interface ResCountHandler extends EventHandler {
  name: "RES_COUNT"
  handler: () => void
}

export async function count() {
  return new Promise<void>(function (resolve) {
    once<ResCountHandler>("RES_COUNT", resolve)
    emit<ReqCountHandler>("REQ_COUNT")
  })
}
