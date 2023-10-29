import LoadingBars from "@/components/LoadingBars";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Suspense, type ReactNode } from "react";

export function SectionHeader({ children }: { children: string }) {
    return (
        <CardHeader className="p-4">
            <p className="font-display uppercase text-sm font-bold tracking-widest text-center">
                {children}
            </p>
        </CardHeader>
    );
}
export function DashSuspense({
    fallback = (
        <CardBody>
            <LoadingBars />
        </CardBody>
    ),
    noCard = false,
    children,
}: {
    fallback?: ReactNode;
    noCard?: boolean;
    children: ReactNode;
}) {
    return (
        <Suspense fallback={fallback}>
            {noCard ? <div>{children}</div> : <CardBody>{children}</CardBody>}
        </Suspense>
    );
}
export function DashCard({
    className,
    cardClassName,
    title = "Card",
    children = <div></div>,
}: {
    className?: string;
    cardClassName?: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <div className={className}>
            <Card className={cardClassName}>
                <SectionHeader>{title}</SectionHeader>
                <Divider />
                <DashSuspense>{children}</DashSuspense>
            </Card>
        </div>
    );
}
