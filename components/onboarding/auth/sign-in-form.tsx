"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveDetails, setSaveDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="font-heading w-full max-w-xs space-y-5 text-center"
      >
        <h1 className="text-darkblue-104 font-heading text-2xl font-bold">Login</h1>

        <div className="space-y-2 text-left">
          <label
            htmlFor="email"
            className="text-darkblue-104 text-xs"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="youremail@anysite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="placeholder:text-lightblue-102 w-full rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-sm"
          />

          <label
            htmlFor="password"
            className="text-darkblue-104 text-xs"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder:text-lightblue-102 w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 placeholder:text-sm"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2 right-3 cursor-pointer text-sm text-gray-500"
            >
              {showPassword ? (
                <EyeIcon
                  className="mt-[0.3rem] size-4"
                  aria-hidden="true"
                />
              ) : (
                <EyeOffIcon
                  className="mt-[0.3rem] size-4"
                  aria-hidden="true"
                />
              )}
            </span>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={saveDetails}
              onChange={() => setSaveDetails(!saveDetails)}
            />
            Save my details
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 py-2 text-white hover:bg-yellow-600"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-sm text-gray-500">– OR –</div>

        <div>
          <p className="text-sm font-semibold text-black">Use your social account</p>
          <div className="text-darkblue-104 mt-2 flex justify-center gap-6 text-xl">
            <FaGoogle className="cursor-pointer" />
            <FaFacebookF className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaApple className="cursor-pointer" />
          </div>
        </div>

        {message && <p className="text-xs text-red-500">{message}</p>}
      </form>
    </div>
  );
}
