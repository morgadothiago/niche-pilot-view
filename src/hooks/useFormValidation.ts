import { useForm, UseFormProps, UseFormReturn, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { useState } from "react";

interface UseFormValidationProps<T extends FieldValues> extends UseFormProps<T> {
  schema: ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
}

interface UseFormValidationReturn<T extends FieldValues> {
  form: UseFormReturn<T>;
  isSubmitting: boolean;
  submitError: string | null;
  handleSubmit: () => Promise<void>;
}

export function useFormValidation<T extends FieldValues>({
  schema,
  onSubmit,
  ...formProps
}: UseFormValidationProps<T>): UseFormValidationReturn<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    ...formProps,
  });

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    submitError,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
}
