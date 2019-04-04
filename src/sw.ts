import * as React from 'react'

export const isUpdateAvailable = new Promise((resolve, reject) => {
  if (!('serviceWorker' in navigator)) return resolve(false)

  const sw = `service-worker.js`

  navigator.serviceWorker.register(sw).then(reg => {
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing
      if (!newWorker) return

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated') resolve(true)
      })
    })
  })
})

export function useSW(): boolean {
  const [needsUpdate, setNeedsUpdate] = React.useState(false)

  React.useEffect(() => {
    isUpdateAvailable.then(updates => setNeedsUpdate)
  }, [])

  return needsUpdate
}
