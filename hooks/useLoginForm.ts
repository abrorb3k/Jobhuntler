"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
    // Login logikasini shu yerga yozasiz
    router.push("/dashboard");
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
