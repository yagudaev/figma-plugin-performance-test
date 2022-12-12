import type * as Actions from "../main/actions"
import { AsyncActionType, callMain, SyncActionType } from "../lib"

export const count: AsyncActionType<typeof Actions.count> = async function () {
  return callMain("count")
}

export const countChunked: AsyncActionType<typeof Actions.countChunked> = async function (options) {
  return callMain("countChunked", options)
}

// try calling it like this:
//
// const promises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => MainAPI.debugTest(num))
// const results = await Promise.all(promises)
// console.log("[ui] Promise.all results", results)
export const debugTest: SyncActionType<typeof Actions.debugTest> = async function (num: number) {
  return callMain("debugTest", num)
}

export const foo: SyncActionType<typeof Actions.foo> = async function () {
  return callMain("foo")
}

export const throwError: AsyncActionType<typeof Actions.throwError> = async function () {
  return callMain("throwError")
}
