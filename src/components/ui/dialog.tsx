
import * as React from "react"

import { cn } from "@/lib/utils"

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Dialog = ({ children, open, onOpenChange, ...props }: DialogProps) => {
  const [isOpen, setIsOpen] = React.useState(open || false)
  
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])
  
  React.useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen)
    }
  }, [isOpen, onOpenChange])

  if (!isOpen) return null
  
  return <div className="relative z-50" {...props}>{children}</div>
}

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
    <div className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  </div>
))
DialogContent.displayName = "DialogContent"

export { Dialog, DialogContent }
