import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          success:
            "group-[.toaster]:!bg-success group-[.toaster]:!text-success-foreground group-[.toaster]:border-success/30",
          error:
            "group-[.toaster]:!bg-destructive group-[.toaster]:!text-destructive-foreground group-[.toaster]:border-destructive/30",
          info: "group-[.toaster]:!bg-info group-[.toaster]:!text-info-foreground group-[.toaster]:border-info/30",
          warning:
            "group-[.toaster]:!bg-warning group-[.toaster]:!text-warning-foreground group-[.toaster]:border-warning/30",
        },
      }}
      {...props}
    />
  );
};

/* eslint-disable react-refresh/only-export-components */
export { Toaster, toast };
