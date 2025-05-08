
import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (values: number[]) => void
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, defaultValue, min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || defaultValue || [50]);
    
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newValue = Math.round((percentage / 100) * (max - min) / step) * step + min;
      const newValues = [newValue];
      
      setInternalValue(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div className="absolute h-full bg-primary" style={{ width: `${internalValue[0] !== undefined ? ((internalValue[0] - min) / (max - min)) * 100 : 50}%` }} />
        </div>
        <div 
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background"
          style={{ 
            position: "absolute", 
            left: `${internalValue[0] !== undefined ? ((internalValue[0] - min) / (max - min)) * 100 : 50}%`, 
            transform: "translateX(-50%)" 
          }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
