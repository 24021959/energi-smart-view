
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };
    
    return (
      <div className="relative">
        <input
          type="checkbox"
          className="absolute opacity-0 w-0 h-0"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          ref={ref}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            checked ? "bg-primary" : "",
            className
          )}
          data-state={checked ? "checked" : "unchecked"}
        >
          {checked && (
            <span className="flex items-center justify-center text-current">
              <Check className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    );
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
