import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          success: "!bg-green-600 !text-white !border-green-700",
          error: "!bg-red-600 !text-white !border-red-700",
          info: "!bg-blue-600 !text-white !border-blue-700",
          warning: "!bg-amber-500 !text-white !border-amber-600",
        },
      }}
      {...props}
    />
  );
};

/* eslint-disable react-refresh/only-export-components */
export { Toaster, toast };
