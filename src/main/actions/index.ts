import Timeout from "await-timeout"
import { COUNT_TARGET } from "../../constants"

export async function count() {
  console.log("[main] Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  console.log("[main] Finished counting...")
  return value
}

// TOOD: how do you determine the optimal chunk size?
const CHUNK_SIZE = 500_000 // 5 million in 10ms counted
export async function countChunked() {
  console.log("[main] Starting to count chunked...")

  const numChunks = Math.ceil(COUNT_TARGET / CHUNK_SIZE)
  let value = 0
  for (let i = 0; i < numChunks; i++) {
    const from = i * CHUNK_SIZE
    const to = Math.min((i + 1) * CHUNK_SIZE, COUNT_TARGET)
    value = countChunk(from, to)

    // wait for next tick to avoid blocking the main thread
    await Timeout.set(0)
  }

  console.log("[main] Finished counting chunked...")
  return value
}

function countChunk(from: number, to: number) {
  let value = 0
  for (let i = from; i < to; i++) {
    value = i
  }
  return value
}

export function debugTest(num: number) {
  console.log("[main] Debugging test", num)
  return num
}
