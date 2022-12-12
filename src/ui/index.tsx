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
import { count, countChunked } from "./count"

import * as MainAPI from "./mainApi"

const formatter = Intl.NumberFormat("en", { notation: "compact" })

function Plugin() {
  const [text, setText] = useState<string | null>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [progressText, setProgressText] = useState<string | null>(null)
  const [fidgetValue, setFidgetValue] = useState(false)

  const handleCountMain = useCallback(async function () {
    setText(null)
    const start = Date.now()
    const countTarget = await MainAPI.count()
    setText(`Time Taken: ${Date.now() - start}ms. Count: ${formatter.format(countTarget)}`)
  }, [])

  const handleCountUI = useCallback(async function () {
    const start = Date.now()
    const countTarget = count()
    setText(`Time Taken: ${Date.now() - start}ms. Count: ${formatter.format(countTarget)}`)
  }, [])

  const handleCountChunkedMain = useCallback(async function () {
    setText(null)
    const start = Date.now()
    const countTarget = await MainAPI.countChunked({
      onProgress: (progress) => {
        const percentage = progress.value / progress.total
        setProgress(percentage)
        setProgressText(
          `Counted to: ${formatter.format(progress.value)} (${Math.round(percentage * 100)})%`
        )
      }
    })
    setProgress(null)
    setProgressText(null)
    setText(`Time Taken: ${Date.now() - start}ms. Count: ${formatter.format(countTarget)}`)
  }, [])

  const handleCountChunkedUI = useCallback(async function () {
    setText(null)
    const start = Date.now()
    const countTarget = await countChunked({
      onProgress: (progress) => {
        const percentage = progress.value / progress.total
        setProgress(percentage)
        setProgressText(
          `Counted to: ${formatter.format(progress.value)} (${Math.round(percentage * 100)})%`
        )
      }
    })
    setProgress(null)
    setProgressText(null)
    setText(`Time Taken: ${Date.now() - start}ms. Count: ${formatter.format(countTarget)}`)
  }, [])

  const handleThrowErrorMain = useCallback(async function () {
    setText(null)
    try {
      await MainAPI.throwError()
    } catch (error) {
      setText(`Error from main: ${(error as Error).message}`)
      throw error
    }
  }, [])

  return (
    <Container space='medium'>
      <MiddleAlign>
        <Columns space={"small"}>
          <Button fullWidth onClick={handleCountMain}>
            Count Main
          </Button>

          <Button fullWidth onClick={handleCountUI}>
            Count UI
          </Button>
        </Columns>
        <Columns space={"small"} style={{ marginTop: 8 }}>
          <Button fullWidth onClick={handleCountChunkedMain}>
            Count Chunked Main
          </Button>

          <Button fullWidth onClick={handleCountChunkedUI}>
            Count Chunked UI
          </Button>
        </Columns>
        <Columns space={"small"} style={{ marginTop: 8 }}>
          <Button fullWidth onClick={handleThrowErrorMain}>
            Throw Error Main
          </Button>

          {/* <Button fullWidth onClick={handleCountChunkedUI}>
            Count Chunked UI
          </Button> */}
        </Columns>
        <VerticalSpace space='small' />
        {text && <Text align={"center"}>{text}</Text>}
        <div style={{ marginTop: 8 }}>
          {progress && <div>Bar coming soon: {progressText}</div>}
          {progressText && <Text>{progressText}</Text>}
        </div>
        <VerticalSpace space='small' />
        <Toggle
          value={fidgetValue}
          onChange={(event) => setFidgetValue(event.currentTarget.checked)}
        >
          <Text>Useless fidget</Text>
        </Toggle>
      </MiddleAlign>
    </Container>
  )
}

export default render(Plugin)
