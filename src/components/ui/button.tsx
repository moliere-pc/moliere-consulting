import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ease-smooth focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-[0_14px_30px_-12px_rgba(205,7,30,0.65)] hover:bg-brand-700 hover:shadow-[0_18px_40px_-12px_rgba(205,7,30,0.75)]",
        gold: "bg-gold-gradient text-ink-950 font-bold shadow-gold hover:brightness-105",
        outline:
          "border border-ink-200 bg-white/70 text-ink-900 backdrop-blur hover:border-brand-300 hover:bg-white",
        ghost: "text-ink-800 hover:bg-ink-100",
        whatsapp:
          "bg-whatsapp text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.7)] hover:bg-whatsapp-dark",
        dark: "bg-ink-950 text-white hover:bg-ink-900",
        link: "rounded-none px-0 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-13 px-8 py-3.5 text-base sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, external, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        ref={ref}
        role="button"
        tabIndex={0}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
