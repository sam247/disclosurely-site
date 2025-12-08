import * as React from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const toastContext = React.createContext<{
  toasts: Toast[]
  toast: (props: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
})

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { ...props, id }])
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}

export const toast = {
  success: (message: string) => console.log("Toast success:", message),
  error: (message: string) => console.error("Toast error:", message),
  info: (message: string) => console.info("Toast info:", message),
  warning: (message: string) => console.warn("Toast warning:", message),
}

