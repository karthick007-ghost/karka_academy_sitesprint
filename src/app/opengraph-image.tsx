import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Karka AI & Tech Academy — Learn First. Pay When Hired.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0F14",
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255, 106, 43, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(15, 61, 46, 0.4) 0%, transparent 60%)",
          padding: "60px 80px",
          color: "#F3EEE4",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#0F3D2E",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "bold",
                color: "#FF6A2B",
              }}
            >
              க
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" }}>
                KARKA <span style={{ color: "#7BE0AD" }}>AI</span>
              </span>
              <span style={{ fontSize: "13px", color: "#A9B0BD", letterSpacing: "2px", textTransform: "uppercase" }}>
                Tech Academy • Nagercoil
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(123, 224, 173, 0.15)",
              border: "1px solid rgba(123, 224, 173, 0.4)",
              color: "#7BE0AD",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Pay After Placement (₹0 Upfront)
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Launch Your <span style={{ color: "#FF6A2B" }}>AI & Tech Career</span> from Nagercoil.
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#A9B0BD",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Master Full-Stack, Generative AI, and Data Science with live commercial sprints at Agile Tribers.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["₹0 Upfront Tuition", "30 hrs/wk Live Mentorship", "Agile Tribers Client Sprints", "Physical Lab in Nagercoil"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: "10px 18px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "14px",
                  color: "#F3EEE4",
                  fontWeight: "600",
                }}
              >
                ✓ {badge}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
