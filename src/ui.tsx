import {
  Button,
  Columns,
  Container,
  render,
  VerticalSpace,
  Text,
  MiddleAlign,
  Toggle
} from "@create-figma-plugin/ui"
import { h } from "preact"
import { useCallback, useState } from "preact/hooks"

import * as MainAPI from "./api"

const formatter = Intl.NumberFormat("en", { notation: "compact" })

function Plugin() {
  const [text, setText] = useState<string | null>(null)
  const handleCountMain = useCallback(async function () {
    setText(null)
    const start = Date.now()
    const countTarget = await MainAPI.count()
    setText(`Time Taken: ${Date.now() - start}ms. Count: ${formatter.format(countTarget)}`)
  }, [])

  return (
    <Container space='medium'>
      <MiddleAlign>
        <Columns space={"small"}>
          <Button fullWidth onClick={handleCountMain}>
            Count Main
          </Button>

          <Button fullWidth onClick={handleCountMain}>
            Count UI
          </Button>
        </Columns>
        <VerticalSpace space='small' />
        {text && <Text align={"center"}>{text}</Text>}
        <VerticalSpace space='small' />
        <Toggle value={false}>
          <Text>Useless fidget</Text>
        </Toggle>
      </MiddleAlign>
    </Container>
  )
}

export default render(Plugin)
