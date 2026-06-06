export default defineNuxtPlugin(() => {
  if (process.dev) {
    const originalError = console.error
    console.error = (...args: any[]) => {
      const message = args.join(' ')
      if (
        message.includes('connect ENOENT') ||
        message.includes('vite-node socket') ||
        message.includes('Failed to restrict')
      ) {
        return
      }
      originalError.apply(console, args)
    }
  }
})
