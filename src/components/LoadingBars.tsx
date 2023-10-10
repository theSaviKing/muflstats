import { CardBody } from "@nextui-org/card";

export default function LoadingBars({ inCard = true }: { inCard?: boolean }) {
    let Comp = inCard ? CardBody : "div";
    return (
        <Comp className="flex-center flex-row gap-2">
            <span className="loading loading-bars w-8 h-8 text-secondary"></span>
            Loading...
        </Comp>
    );
}
