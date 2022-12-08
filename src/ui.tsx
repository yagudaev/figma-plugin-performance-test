import {
  Button,
  Columns,
  Container,
  render,
  VerticalSpace,
  Text,
  MiddleAlign
} from "@create-figma-plugin/ui"
import { emit } from "@create-figma-plugin/utilities"
import { h } from "preact"
import { useCallback, useState } from "preact/hooks"

import { InsertCodeHandler } from "./types"

function Plugin() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
  const handleInsertCodeButtonClick = useCallback(
    function () {
      emit<InsertCodeHandler>("INSERT_CODE", code)
    },
    [code]
  )
  return (
    <Container space='medium'>
      <MiddleAlign>
        <Columns space={"small"}>
          <Button fullWidth onClick={handleInsertCodeButtonClick}>
            Count Main
          </Button>

          <Button fullWidth onClick={handleInsertCodeButtonClick}>
            Count UI
          </Button>
        </Columns>
        <VerticalSpace space='small' />
        <Text align={"center"}>Time Taken: 100ms</Text>
      </MiddleAlign>
    </Container>
  )
}

export default render(Plugin)
