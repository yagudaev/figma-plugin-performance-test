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

interface CountChunkedOptions {
  onProgress?: (progress: {
    value: number
    total: number
    chunk: number
    numChunks: number
    chunkSize: number
  }) => void
}

// TOOD: how do you determine the optimal chunk size?
const CHUNK_SIZE = 500_000 // 5 million in 10ms counted
const defaultOptions = { onProgress: () => {} }

export async function countChunked(options: CountChunkedOptions = defaultOptions) {
  console.log("[main] Starting to count chunked...")

  const numChunks = Math.ceil(COUNT_TARGET / CHUNK_SIZE)
  let value = 0
  for (let i = 0; i < numChunks; i++) {
    const from = i * CHUNK_SIZE
    const to = Math.min((i + 1) * CHUNK_SIZE, COUNT_TARGET)
    value = countChunk(from, to)

    // broadcast progress
    options.onProgress &&
      options.onProgress({
        value: value + 1, // +1 because we are counting from 0
        total: COUNT_TARGET,
        chunk: i,
        numChunks,
        chunkSize: CHUNK_SIZE
      })

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
  const pageName = figma.currentPage.name
  console.log("[main] Debugging test", num, pageName)

  return num
}

export function foo() {
  console.log("[main] foo")
}

export async function throwError() {
  console.log("[main] throwing error...")
  throw new Error("This is an error")
}

export const positionalCallback = function (onProgress: (progress: number) => void) {
  onProgress(123)
  return 456
}

export const namedCallback = function ({ onProgress }: { onProgress: (progress: number) => void }) {
  onProgress(123)
  return 456
}
