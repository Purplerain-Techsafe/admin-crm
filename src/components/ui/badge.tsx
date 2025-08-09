import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-accent text-white",
                secondary:
                    "border-gray-500 bg-background-secondary text-text",
                destructive:
                    "border-transparent bg-red-600 text-white",
                outline: "text-text",
                success:
                    "border-transparent bg-green-600 text-white",
                warning:
                    "border-transparent bg-yellow-600 text-white",
                info:
                    "border-transparent bg-blue-600 text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants }; 