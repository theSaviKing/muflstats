import { CardBody } from "@nextui-org/card";

export default function LoadingBars() {
    return (
        <div className="flex-center flex-row gap-2">
            <div className="sk-wave text-secondary">
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
            </div>
            Loading...
        </div>
    );
}
