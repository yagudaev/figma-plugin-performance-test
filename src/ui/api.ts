import type { count as Count, debugTest as DebugTest } from "../main/actions"
import { callMain } from "../lib"

type CountType = typeof Count

export const count: CountType = async function () {
  return callMain("count")
}

type DebugTestType = (
  ...args: Parameters<typeof DebugTest>
) => Promise<ReturnType<typeof DebugTest>>

export const debugTest: DebugTestType = async function (num: number) {
  return callMain("debugTest", num)
}
