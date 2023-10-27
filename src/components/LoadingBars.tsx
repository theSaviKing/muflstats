import { CardBody } from "@nextui-org/card";

export default function LoadingBars() {
    return (
        <div className="flex-center flex-row gap-2">
            <span className="loading loading-bars w-8 h-8 text-secondary"></span>
            Loading...
        </div>
    );
}
