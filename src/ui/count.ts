import Timeout from "await-timeout"
import { COUNT_TARGET } from "../constants"

export function count() {
  console.log("[ui] Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  return value
}

const CHUNK_SIZE = 500_000 // 5 million in 10ms counted
const defaultOptions = { onProgress: () => {} }

interface CountChunkedOptions {
  onProgress?: (progress: {
    value: number
    total: number
    chunk: number
    numChunks: number
    chunkSize: number
  }) => void
}

export async function countChunked(options: CountChunkedOptions = defaultOptions) {
  console.log("[ui] Starting to count chunked...")

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

  console.log("[ui] Finished counting chunked...")
  return value
}

function countChunk(from: number, to: number) {
  let value = 0
  for (let i = from; i < to; i++) {
    value = i
  }
  return value
}
