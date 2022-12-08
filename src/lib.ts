import { emit, on, once } from "@create-figma-plugin/utilities"

export function callMain(fnName: string, ...args: any[]) {
  return new Promise<number>(function (resolve) {
    once(`RES_${fnName}`, (returnValue) => resolve(returnValue))
    emit(`REQ_${fnName}`, ...args)
  })
}

export function exposeToUI(fn: (...args: any[]) => Promise<number>) {
  const name = fn.name
  on(`REQ_${name}`, async (...args: any[]) => {
    const returnValue = await fn(...args)
    emit(`RES_${name}`, returnValue)
  })
}
