import * as React from 'react'

export function useTimer(start: number, limit: number) {
  const [num, setNum] = React.useState(0)
  const ref = React.useRef<any>()

  React.useEffect(() => {
    const id = setInterval(() => {
      setNum(num + 1)
    }, 1000)

    ref.current = id

    return () => {
      clearInterval(ref.current)
    }
  })

  const timeLeft = Math.floor((Date.now() - start) / 1000)
  const timesUp = timeLeft - limit <= 0

  return {
    timesUp,
    message: timesUp ? 'Go to sleep!' : `Time Left: ${timeLeft}`,
  }
}
