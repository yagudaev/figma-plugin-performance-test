import { emit, on, showUI } from "@create-figma-plugin/utilities"
import Timeout from "await-timeout"

export default function () {
  exposeToUI(count)
  showUI({ height: 240, width: 320 })
}

async function count() {
  console.log("It's the final countdown! Tananana nanana nanana")
  await Timeout.set(1000)
  return 1000
}

function exposeToUI(fn: () => Promise<number>) {
  const name = fn.name
  on(`REQ_${name}`, async () => {
    const returnValue = await fn()
    emit(`RES_${name}`, returnValue)
  })
}
