import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { CardBody } from "@nextui-org/card";

export default function LoadingError({
    message = "Could not retrieve data. Check your internet connection and try reloading the page.",
    length = "long",
    isCard = true,
}: {
    message?: string;
    length?: "long" | "short" | "narrow";
    isCard?: boolean;
}) {
    const Comp = isCard ? CardBody : "div";
    return (
        <Comp className="flex flex-row flex-center gap-2">
            <ExclamationCircleIcon className="w-8 h-8 fill-danger" />{" "}
            {length == "long"
                ? message
                : length == "short"
                ? "Could not retrieve data. Reload page."
                : "Loading error"}
        </Comp>
    );
}
