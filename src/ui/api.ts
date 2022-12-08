import type * as Actions from "../main/actions"
import { AsyncActionType, callMain, SyncActionType } from "../lib"

export const count: AsyncActionType<typeof Actions.count> = async function () {
  return callMain("count")
}

export const debugTest: SyncActionType<typeof Actions.debugTest> = async function (num: number) {
  return callMain("debugTest", num)
}
