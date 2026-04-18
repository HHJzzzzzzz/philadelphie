import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <div className="relative">
    {icon && (
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
    )}
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-slate-200/90 bg-white/80 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20",
        icon ? "pl-10 pr-3" : "px-3",
        className,
      )}
      {...props}
    />
  </div>
));
Input.displayName = "Input";
