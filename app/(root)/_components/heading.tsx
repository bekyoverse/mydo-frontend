"use client";

import Loading from "@/components/Loading";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@/lib/shim/clerk";
import { useConvexAuth } from "@/lib/shim/convex";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
        Your Ideas, Powered by <span className="text-blue-500 bg-clip-text">Mydo</span>.
      </h1>
      <h3 className="text-lg sm:text-2xl md:text-3xl font-medium text-muted-foreground/80 max-w-2xl mx-auto">
        The universal AI-powered workspace. Bring your own keys, own your data, and build your digital empire.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Loading size={"lg"} />
        </div>
      )}
      {!isLoading && isAuthenticated && (
        <div className="flex items-center justify-center gap-x-4">
          <Link
            className={cn(buttonVariants({ size: "lg" }), "md:inline-flex bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-8 py-6 text-lg rounded-full transition-all hover:scale-105")}
            href={"/documents"}
          >
            Enter Workspace
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <Button size={"lg"} className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-lg rounded-full transition-all hover:scale-105">
            Get Mydo Pro
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
