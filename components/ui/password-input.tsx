"use client";

import * as React from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled = props.value === "" || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        name="password"
        className={cn("hide-password-toggle", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute end-0 top-0 ml-auto h-full hover:bg-transparent max-sm:px-2"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeIcon
            className="size-4"
            aria-hidden="true"
          />
        ) : (
          <EyeOffIcon
            className="size-4"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
                .hide-password-toggle::-ms-reveal,
                .hide-password-toggle::-ms-clear {
                    visibility: hidden;
                    pointer-events: none;
                    display: none;
                }
            `}</style>
    </div>
  );
};
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
