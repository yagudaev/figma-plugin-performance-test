import { showUI } from "@create-figma-plugin/utilities"
import { exposeToUI } from "./lib"

const COUNT_TARGET = 5_600_000_000

export default function () {
  exposeToUI(count)
  showUI({ height: 240, width: 320 })
}

async function count() {
  console.log("Starting to count...")

  let value = 0
  for (let i = 0; i < COUNT_TARGET; i++) {
    value = i
  }
  return value
}
