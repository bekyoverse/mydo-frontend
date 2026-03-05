"use client";

import { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

// This acts as our generic GET hook (replaces Convex useQuery)
export const useQuery = (endpoint: string, args?: any) => {
    const { data: session } = useSession();
    const user = session?.user as any;
    const [data, setData] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user?.id && !user?.email) {
            setData(undefined);
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // If it's a known string endpoint, convert it to a path
                const path = typeof endpoint === "string" ? `/${endpoint}` : `/${Object.values(endpoint || {})[0]}`;
                const url = new URL(`${BACKEND_URL}${path}`);

                if (args) {
                    Object.entries(args).forEach(([key, val]) => url.searchParams.append(key, String(val)));
                }

                const res = await fetch(url.toString(), {
                    headers: { 'Authorization': `Bearer ${user?.id || user?.email}` }
                });

                if (res.ok) {
                    setData(await res.json());
                } else {
                    setData(null);
                }
            } catch (e) {
                console.error("Fetch error:", e);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(args), user?.id || user?.email]);

    return isLoading ? undefined : data;
};

// This acts as our generic POST/PUT hook (replaces Convex useMutation)
export const useMutation = (endpoint: string) => {
    const { data: session } = useSession();
    const mutUser = session?.user as any;

    return async (...args: any[]) => {
        if (!mutUser?.id && !mutUser?.email) throw new Error("Unauthorized");

        const path = typeof endpoint === "string" ? `/${endpoint}` : `/${Object.values(endpoint || {})[0]}`;
        const url = `${BACKEND_URL}${path}`;

        const method = path.includes("remove") || path.includes("archieve") ? "DELETE" :
            path.includes("update") ? "PATCH" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${mutUser?.id || mutUser?.email}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args[0] || {})
        });

        if (!res.ok) throw new Error("Failed mutation");
        return await res.json();
    };
};

export const useConvexAuth = () => {
    const { data: session, status } = useSession();
    return {
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading"
    };
};

export const ConvexProvider = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};
