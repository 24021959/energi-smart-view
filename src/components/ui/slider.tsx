
import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (values: number[]) => void
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div className="absolute h-full bg-primary" style={{ width: `${props.value?.[0] || 50}%` }} />
        </div>
        <div 
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background"
          style={{ 
            position: "absolute", 
            left: `${props.value?.[0] || 50}%`, 
            transform: "translateX(-50%)" 
          }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
