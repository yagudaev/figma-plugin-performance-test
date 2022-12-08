import { emit, on, showUI } from "@create-figma-plugin/utilities"
import Timeout from "await-timeout"

const COUNT_TARGET = 5_600_000_000

export default function () {
  exposeToUI(count)
  showUI({ height: 240, width: 320 })
}

async function count() {
  console.log("It's the final countdown! Tananana nanana nanana")
  // await Timeout.set(1000)
  for (let i = 0; i < COUNT_TARGET; i++) {
    // console.log(i)
  }
  return COUNT_TARGET
}

function exposeToUI(fn: (...args: any[]) => Promise<number>) {
  const name = fn.name
  on(`REQ_${name}`, async (...args: any[]) => {
    const returnValue = await fn(...args)
    emit(`RES_${name}`, returnValue)
  })
}
