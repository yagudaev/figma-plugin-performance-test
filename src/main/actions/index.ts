import { COUNT_TARGET } from "../../constants"

export async function count() {
  console.log("[main] Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  return value
}

export function debugTest(num: number) {
  console.log("[main] Debugging test", num)
  return num
}
