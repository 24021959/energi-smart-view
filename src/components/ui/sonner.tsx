
import * as React from "react"
import { Toaster as SonnerToaster } from "sonner"

const Toaster = (props: React.ComponentProps<typeof SonnerToaster>) => {
  // Use a more simplified version that doesn't depend on next-themes
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

// Import toast from our toast hook
import { toast } from "@/hooks/use-toast"

export { Toaster, toast }
