"use client";

import { useEffect } from "react";

export default function RootErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => console.error(error), [error]);

    return <div>you messed up.</div>;
}
