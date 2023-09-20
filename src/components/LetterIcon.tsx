import { Icon } from "../app/icon";

export default function LetterIcon({ className }: { className?: string }) {
    return (
        <div className={`relative select-none ${className}`}>
            <Icon />
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center text-8xl font-thin">
                MUFL
            </p>
        </div>
    );
}
