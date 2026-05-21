"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="flex w-full flex-col items-center">
        {/* Logo/Brand */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Hibihibi AI</h1>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Anything you may need assistance with
          </p>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <Button
            variant="link"
            className="p-0 text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
