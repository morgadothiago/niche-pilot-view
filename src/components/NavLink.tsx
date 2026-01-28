import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { preloadRoute } from "@/lib/preload";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const handlePrefetch = () => {
      try {
        if (typeof to === "string") preloadRoute(to as string);
      } catch (_e) {
        // ignore
      }
    };
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        onMouseEnter={handlePrefetch}
        onFocus={handlePrefetch}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
