import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
