// components/auth/sign-up.tsx
"use client";

import { SignupSchema } from "@/helpers/zod/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";

import { signUp } from "@/lib/auth-client";
import { useAuthState } from "@/hooks/use-auth-state";

import CardWrapper from "../card-wrapper";
import FormError from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SocialButton from "./social-button";

// TODO: set up Zod resolver for form errors
// TODO: Add mobile-friendly input method/type for form fields

const SignUp = () => {
  const { error, success, loading, setLoading, setError, setSuccess, resetState } =
    useAuthState();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    try {
      await signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          callbackURL: "/dashboard",
        },
        {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            resetState();
            setLoading(true);
          },
          onSuccess: () => {
            // TODO: Set up email verification
            setSuccess("Verification link has been sent to your email");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong");
      setError("Something went wrong");
    }
  };

  return (
    <CardWrapper
      cardTitle="SignUp"
      cardDescription="Create an new account"
      cardFooterLink="/signin"
      cardFooterDescription="Already have an account?"
      cardFooterLinkTitle="Signin"
    >
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="text"
                    placeholder="Ashley Vee"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="mother.of.3@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
          <div className="flex justify-between">
            <SocialButton
              provider="google"
              icon={<FcGoogle />}
              label=""
            />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUp;
