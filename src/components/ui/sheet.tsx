
import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Sheet = ({ children, open, onOpenChange, ...props }: SheetProps) => {
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

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
}

const SheetContent = React.forwardRef<
  HTMLDivElement,
  SheetContentProps
>(({ className, side = "right", children, ...props }, ref) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
    <div 
      ref={ref}
      className={cn(
        "fixed inset-y-0 z-50 h-full bg-background p-6 shadow-lg",
        side === "left" && "left-0 border-r",
        side === "right" && "right-0 border-l",
        className
      )}
      {...props}
    >
      {children}
    </div>
  </div>
))
SheetContent.displayName = "SheetContent"

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, asChild, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
))
SheetTrigger.displayName = "SheetTrigger"

export { Sheet, SheetContent, SheetTrigger }
