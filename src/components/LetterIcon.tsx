import { Icon } from "@/components/Icon";

export default function LetterIcon({ className }: { className?: string }) {
    return (
        <div className={`relative select-none ${className}`}>
            <Icon className="w-full h-full" />
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center font-thin">
                MUFL
            </p>
        </div>
    );
}
