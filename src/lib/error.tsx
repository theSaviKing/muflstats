"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Link,
} from "@nextui-org/react";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function errorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <Card className="w-1/2">
            <CardHeader className="flex-center font-bold text-xl font-display">
                An error occurred.
            </CardHeader>
            <Divider />
            <CardBody className="flex-center gap-1">
                <p>
                    Try reloading the page, or{" "}
                    <Link onClick={resetErrorBoundary}>retry the load</Link>.
                </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex-center flex-col gap-4">
                <p className="font-bold font-display">ERROR</p>
                <pre className="p-2 rounded bg-background text-sm whitespace-pre-wrap text-center">
                    {error.message}
                </pre>
            </CardFooter>
        </Card>
    );
}

export function MSErrorBoundary({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary fallbackRender={errorFallback}>{children}</ErrorBoundary>
    );
}
