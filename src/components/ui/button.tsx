import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-[#1e3a5f] via-[#2d4a6f] to-[#0f766e] text-white shadow-md shadow-[#1e3a5f]/20 hover:shadow-lg hover:brightness-[1.03] active:scale-[0.98]",
  secondary:
    "bg-white/90 text-[#1e3a5f] border border-slate-200/80 shadow-sm hover:bg-white hover:border-[#c9a227]/40",
  ghost: "text-slate-600 hover:bg-slate-100/80",
  danger:
    "bg-slate-800 text-white hover:bg-slate-700",
  gold:
    "bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-[#1e293b] font-medium shadow-md hover:brightness-105 active:scale-[0.98]",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
  }
>(({ className, variant = "primary", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      className,
    )}
    {...props}
  />
));
Button.displayName = "Button";
