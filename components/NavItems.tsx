"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [{ label: "Tickets", href: "/tickets" }];

const NavItems = () => {
  const pathName = usePathname();

  return (
    <nav>
      {navItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(pathName === href && "border-b-2 border-primary")}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
