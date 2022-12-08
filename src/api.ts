import { emit, EventHandler } from "@create-figma-plugin/utilities"

export interface ReqCountHandler extends EventHandler {
  name: "REQ_COUNT"
  handler: () => void
}

export async function count() {
  emit<ReqCountHandler>("REQ_COUNT")
}
