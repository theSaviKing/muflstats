import { ImageResponse } from "next/og";
import { Icon } from "../components/Icon";

export const contentType = "image/png";

export const size = { width: 32, height: 32 };

export default function Favicon() {
    return new ImageResponse(
        <Icon style={{ width: "100%", height: "100%" }} />,
        { ...size },
    );
}
