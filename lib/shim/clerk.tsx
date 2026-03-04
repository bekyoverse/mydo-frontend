"use client";

import { ReactNode } from "react";
import { useSession, signOut, signIn, SessionProvider } from "next-auth/react";
import { Button } from "@/components/ui/button";

// Mocking Clerk Auth with NextAuth
export const useUser = () => {
    const { data: session, status } = useSession();
    const isLoaded = status !== "loading";
    const isSignedIn = status === "authenticated";

    return {
        user: session?.user ? {
            id: session.user.id,
            firstName: session.user.name?.split(" ")[0],
            lastName: session.user.name?.split(" ").slice(1).join(" "),
            fullName: session.user.name,
            imageUrl: session.user.image,
            emailAddresses: [{ emailAddress: session.user.email }]
        } : null,
        isSignedIn,
        isLoaded
    };
};

export const useAuth = () => {
    const { data: session, status } = useSession();
    return {
        isLoaded: status !== "loading",
        isSignedIn: status === "authenticated",
        userId: session?.user?.id,
        sessionId: "mock_session",
        signOut: async () => signOut(),
    };
};

export const UserButton = (props: any) => {
    const { data: session } = useSession();
    if (!session?.user) return null;
    return (
        <Button variant="ghost" className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden text-white flex items-center justify-center text-xs p-0 m-0 cursor-pointer" onClick={() => signOut()}>
            {session.user.image ? <img src={session.user.image} alt="User" className="h-full w-full object-cover" /> : session.user.name?.charAt(0) || "U"}
        </Button>
    );
};

export const SignInButton = ({ children, mode }: any) => {
    return <div onClick={() => signIn("google")}>{children}</div>;
};

export const SignOutButton = ({ children }: any) => {
    return <div onClick={() => signOut()}>{children}</div>;
};

// Act as our wrapper
export const ClerkProvider = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};
