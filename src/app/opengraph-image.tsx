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
          padding: "60px 80px",
          color: "#F3EEE4",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
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
                marginRight: "16px",
              }}
            >
              K
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: "22px", fontWeight: "bold" }}>
                KARKA AI ACADEMY
              </div>
              <div style={{ display: "flex", fontSize: "13px", color: "#A9B0BD", letterSpacing: "2px" }}>
                TECH ACADEMY • NAGERCOIL
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(123, 224, 173, 0.15)",
              border: "1px solid rgba(123, 224, 173, 0.4)",
              color: "#7BE0AD",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Pay After Placement (Rs. 0 Upfront)
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: "bold",
              lineHeight: 1.15,
              color: "#F3EEE4",
              marginBottom: "16px",
            }}
          >
            Launch Your AI & Tech Career from Nagercoil
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#A9B0BD",
              lineHeight: 1.4,
              maxWidth: "950px",
            }}
          >
            Master Full-Stack, Generative AI, and Data Science with live commercial sprints at Agile Tribers.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {["Rs. 0 Upfront Tuition", "30 hrs/wk Live Mentorship", "Agile Tribers Client Sprints", "Physical Lab in Nagercoil"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "14px",
                  color: "#F3EEE4",
                  fontWeight: "600",
                  marginRight: "16px",
                }}
              >
                {badge}
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
