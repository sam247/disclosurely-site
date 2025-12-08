import * as React from "react"

type ToasterProps = React.HTMLAttributes<HTMLDivElement> & {
  theme?: "light" | "dark" | "system"
}

const Toaster = ({ theme: _theme = "system", ...props }: ToasterProps) => {
  return <div className="toaster group" {...props} />
}

export const toast = {
  success: (message: string) => console.log("Toast success:", message),
  error: (message: string) => console.error("Toast error:", message),
  info: (message: string) => console.info("Toast info:", message),
  warning: (message: string) => console.warn("Toast warning:", message),
}

export { Toaster }
