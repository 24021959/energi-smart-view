
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        {...props}
      />
      <div
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          props.checked ? "bg-primary" : "",
          className
        )}
        data-state={props.checked ? "checked" : "unchecked"}
      >
        {props.checked && (
          <span className="flex items-center justify-center text-current">
            <Check className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
