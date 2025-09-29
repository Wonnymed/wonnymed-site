import { ImageResponse } from "next/server";

import { METADATA_BY_LOCALE, resolveLocale } from "../../../lib/metadata";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

const BACKGROUND = "#0E2736";
const ACCENT = "#5CD2FF";
const MUTED = "#A7C7D9";

export async function GET(request, { params }) {
  const locale = resolveLocale(params?.locale);
  const { ogTitle, description } = METADATA_BY_LOCALE[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: BACKGROUND,
          color: "#F2FAFF",
          backgroundImage: "radial-gradient(circle at 20% 20%, #15374b, #0e2736)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              textTransform: "uppercase",
              letterSpacing: 6,
              fontSize: 26,
              fontWeight: 600,
              color: ACCENT,
            }}
          >
            <div style={{ width: 36, height: 4, backgroundColor: ACCENT }} />
            <span>Wonnymed</span>
          </div>
          <div
            style={{
              fontSize: 86,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: "90%",
            }}
          >
            {ogTitle}
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.35,
            maxWidth: "72%",
            color: MUTED,
            fontWeight: 400,
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    }
  );
}
