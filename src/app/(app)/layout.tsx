import { Button } from "@nextui-org/button";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Icon } from "../icon";
import Link from "next/link";
import { TrophyIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import {
    TrophyIcon as TinyTrophy,
    UserGroupIcon as TinyPlayers,
} from "@heroicons/react/20/solid";

export default function PageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar isBordered>
                <NavbarContent>
                    <NavbarBrand className="gap-4" as={Link} href="/">
                        <Icon className="w-10 h-10" />
                        <h1 className="text-3xl font-bold text-primary-200">
                            MUFLStats
                        </h1>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent
                    className="hidden sm:flex gap-2"
                    justify="center"
                >
                    <Button
                        variant="light"
                        size="lg"
                        color="primary"
                        className="font-bold"
                        as={Link}
                        // href="/players"
                        href=""
                        endContent={<TinyPlayers className="w-5 h-5" />}
                    >
                        Players
                    </Button>
                    <Button
                        variant="light"
                        size="lg"
                        color="secondary"
                        className="font-bold"
                        as={Link}
                        // href="/games"
                        href=""
                        endContent={<TinyTrophy className="w-5 h-5" />}
                    >
                        Games
                    </Button>
                </NavbarContent>
                <NavbarContent className="flex sm:hidden gap-2" justify="end">
                    <Button
                        variant="light"
                        color="primary"
                        size="lg"
                        isIconOnly
                    >
                        <UserGroupIcon className="w-6 h-6" />
                    </Button>
                    <Button
                        variant="light"
                        color="secondary"
                        size="lg"
                        isIconOnly
                    >
                        <TrophyIcon className="w-6 h-6" />
                    </Button>
                </NavbarContent>
            </Navbar>
            <div className="flex w-full h-full">
                <div className="w-full h-full p-4 flex flex-col items-center gap-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
