import { ImageResponse } from "next/server";

export const size = {
    width: 32,
    height: 32,
};

export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: 999,
                    padding: "0.5rem",
                    fontWeight: "bold",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                SP
            </div>
        ),
        size
    );
}
