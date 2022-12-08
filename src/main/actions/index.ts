import { COUNT_TARGET } from "../index"

export async function count() {
  console.log("Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  return value
}

export function debugTest() {
  console.log("Debugging test")
  return "Debugging test"
}
