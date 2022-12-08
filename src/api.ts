import { emit, EventHandler, once } from "@create-figma-plugin/utilities"

export interface ReqCountHandler extends EventHandler {
  name: "REQ_count"
  handler: () => void
}

export interface ResCountHandler extends EventHandler {
  name: "RES_count"
  handler: (returnValue: number) => void
}

export async function count() {
  return callMain("count")
}

function callMain(fnName: string) {
  return new Promise<number>(function (resolve) {
    once(`RES_${fnName}`, (returnValue) => resolve(returnValue))
    emit(`REQ_${fnName}`)
  })
}
