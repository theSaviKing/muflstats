"use client";

import {
    ArrowRightIcon,
    UserGroupIcon as TinyPlayers,
    TrophyIcon as TinyTrophy,
    ChartBarIcon as TinyStats,
} from "@heroicons/react/20/solid";
import {
    TrophyIcon,
    UserGroupIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Icon } from "../../components/Icon";
import LetterIcon from "@/components/LetterIcon";
import { usePathname } from "next/navigation";

export default function PageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <div className="flex flex-col">
            <Navbar isBordered>
                <NavbarBrand className="gap-4 w-min" as={Link} href="/">
                    <Icon className="w-10 h-10" />
                    <h1 className="text-3xl text-primary-200">
                        <span className="hidden md:inline">MUFLStats</span>
                        <span className="inline md:hidden">MS</span>
                    </h1>
                </NavbarBrand>
                {/* <NavbarContent className="hidden lg:flex gap-2">
                    <p className="p-2 px-8 rounded bg-content1 text-sm group transition-all relative">
                        <span className="group-hover:blur-sm group-hover:opacity-50 transition-all duration-75">
                            {new Date().toLocaleDateString("en-US", {
                                dateStyle: "full",
                            })}
                        </span>
                        <Link
                            className="flex-center opacity-0 group-hover:opacity-100 absolute left-0 top-0 w-full h-full transition-opacity duration-150 font-medium gap-1"
                            href="dashboard"
                        >
                            DASHBOARD <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </p>
                    <Link
                        // href="/seasons"
                        href=""
                        className="p-2 px-4 rounded bg-secondary-600 font-bold text-sm hover:scale-110 hover:bg-secondary-700 transition-transform-colors"
                    >
                        8
                    </Link>
                </NavbarContent> */}
                <NavbarContent className="gap-2" justify="end">
                    <NavbarItem>
                        <Link href="/dashboard" tabIndex={-1}>
                            <Button
                                variant={
                                    pathname == "/dashboard" ? "flat" : "light"
                                }
                                size="lg"
                                color="default"
                                endContent={<TinyStats className="w-5 h-5" />}
                                className="hidden sm:flex"
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant={
                                    pathname == "/dashboard" ? "flat" : "light"
                                }
                                size="lg"
                                color="default"
                                className="flex sm:hidden"
                                isIconOnly
                            >
                                <ChartBarIcon className="w-6 h-6" />
                            </Button>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/players" tabIndex={-1}>
                            <Button
                                variant={
                                    pathname == "/players" ? "flat" : "light"
                                }
                                size="lg"
                                color="primary"
                                endContent={<TinyPlayers className="w-5 h-5" />}
                                className="hidden sm:flex"
                            >
                                Players
                            </Button>
                            <Button
                                variant={
                                    pathname == "/players" ? "flat" : "light"
                                }
                                size="lg"
                                color="primary"
                                className="flex sm:hidden"
                                isIconOnly
                            >
                                <UserGroupIcon className="w-6 h-6" />
                            </Button>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/games" tabIndex={-1}>
                            <Button
                                variant={
                                    pathname == "/games" ? "flat" : "light"
                                }
                                size="lg"
                                color="secondary"
                                endContent={<TinyTrophy className="w-5 h-5" />}
                                className="hidden sm:flex"
                            >
                                Games
                            </Button>
                            <Button
                                variant={
                                    pathname == "/games" ? "flat" : "light"
                                }
                                size="lg"
                                color="secondary"
                                className="flex sm:hidden"
                                isIconOnly
                            >
                                <TrophyIcon className="w-6 h-6" />
                            </Button>
                        </Link>
                    </NavbarItem>
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
