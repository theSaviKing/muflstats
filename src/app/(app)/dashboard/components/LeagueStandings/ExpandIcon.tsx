import {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

export default function ExpandIcon({
    scale = 1,
    className = "",
    expanded: exp = false,
}: {
    scale?: number;
    className?: string;
    expanded?: boolean;
}) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                scale: scale,
            }}
        >
            <ArrowsPointingOutIcon
                className={`absolute left-0 top-0 w-6 h-6 transition-opacity ${
                    exp ? "opacity-0" : "opacity-100"
                }`}
            />
            <ArrowsPointingInIcon
                className={`w-6 h-6 transition-opacity ${
                    exp ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}
