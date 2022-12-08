import { COUNT_TARGET } from "../constants"

export function count() {
  console.log("[ui] Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  return value
}

export function countChunked() {
  console.log("[ui] Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  return value
}
