"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { authFormSchema } from "@/lib/schema";
import signin from "@/actions/signin";

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof authFormSchema>) => {
    await signin(values);
  };

  return (
    <div className="min-h-[80vh] flex fle-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px]">
            Login now to access your dashboard
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Get access to your very own dashboard where you control all of your
            fundraising.
          </p>
          <p className="text-sm mt-12 text-slate-500">
            Don't have an account{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>

        <form
          className="max-w-md md:ml-auto w-full"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h3 className=" lg:text-3xl text-2xl font-bold mb-8">Sign in</h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input
                type="email"
                required
                className="bg-slate-100 w-full text-sm text-slate-700 focus:text-white px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input
                type="password"
                required
                className="bg-slate-100 w-full text-sm text-slate-700 focus:text-white px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-500"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
