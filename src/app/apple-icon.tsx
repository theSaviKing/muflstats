import { Icon } from "../components/Icon";
import { ImageResponse } from "next/server";

export const size = { width: 192, height: 192 };

export default function AppleIcon() {
    return new ImageResponse(
        <Icon style={{ width: "100%", height: "100%" }} />,
        { ...size }
    );
}
