"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

export function Button({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
}

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};