"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function NavLink({
  href,
  icon,
  label,
  active,
  className,
  onClick,
}: NavLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-white/10 text-white"
          : "text-white/65 hover:bg-white/8 hover:text-white",
        className,
      )}
    >
      {icon}
      {label}
    </a>
  );
}
