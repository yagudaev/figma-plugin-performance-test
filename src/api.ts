import { emit, EventHandler, once } from "@create-figma-plugin/utilities"

export interface ReqCountHandler extends EventHandler {
  name: "REQ_COUNT"
  handler: () => void
}

export interface ResCountHandler extends EventHandler {
  name: "RES_COUNT"
  handler: (returnValue: number) => void
}

export async function count() {
  return new Promise<number>(function (resolve) {
    once<ResCountHandler>("RES_COUNT", (returnValue) => resolve(returnValue))
    emit<ReqCountHandler>("REQ_COUNT")
  })
}
