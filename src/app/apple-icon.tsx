import { Icon } from "./icon";
import { ImageResponse } from "next/server";

export const size = { width: 192, height: 192 };

export default function AppleIcon() {
    return new ImageResponse(<Icon />, { ...size });
}
