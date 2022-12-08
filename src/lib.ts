import { emit, on, once } from "@create-figma-plugin/utilities"

let lastCallerId = 0
export function callMain(fnName: string, ...args: any[]) {
  lastCallerId += 1
  const callerId = lastCallerId

  return new Promise<any>(function (resolve) {
    once(`RES_${fnName}_${callerId}`, (returnValue) => resolve(returnValue))
    emit(`REQ_${fnName}`, callerId, ...args)
  })
}

export function exposeToUI(fn: (...args: any[]) => any) {
  const name = fn.name
  on(`REQ_${name}`, async (callerId: number, ...args: any[]) => {
    const returnValue = await fn(...args)
    emit(`RES_${name}_${callerId}`, returnValue)
  })
}

export function exposeAllToUI(actions: any) {
  Object.keys(actions).map((actionName: string) => exposeToUI((actions as any)[actionName]))
}

export type AsyncActionType<F extends (...args: any) => any> = F
export type SyncActionType<F extends (...args: any) => any> = (
  ...args: Parameters<F>
) => Promise<ReturnType<F>>
