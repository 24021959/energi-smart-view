import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Simplified Command component
const Command = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = "Command"

// Simplified CommandDialog
const CommandDialog = ({ children, ...props }: { children: React.ReactNode } & DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// Simplified Command components
const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = "CommandInput"

// Other simplified Command components
const CommandList = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}>{children}</div>
)
const CommandEmpty = ({ children }: { children: React.ReactNode }) => (
  <div className="py-6 text-center text-sm">{children}</div>
)
const CommandGroup = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("overflow-hidden p-1 text-foreground", className)}>{children}</div>
)
const CommandSeparator = ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("-mx-1 h-px bg-border", className)} />
)
const CommandItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean, onSelect?: () => void }
>(({ className, disabled, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    data-disabled={disabled ? true : undefined}
    onClick={onSelect}
    {...props}
  />
))
CommandItem.displayName = "CommandItem"

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
)
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
