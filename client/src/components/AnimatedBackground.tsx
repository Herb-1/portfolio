export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Large aurora blobs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[180px] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, hsl(250 85% 65%), hsl(200 90% 55%), transparent)",
          top: "-10%",
          left: "-10%",
          animation: "float-slow 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, hsl(330 85% 60%), hsl(250 85% 65%), transparent)",
          top: "30%",
          right: "-15%",
          animation: "float-slow 18s ease-in-out infinite 4s",
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(200 90% 55%), hsl(170 80% 50%), transparent)",
          bottom: "10%",
          left: "20%",
          animation: "float-slow 22s ease-in-out infinite 8s",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, hsl(280 80% 60%), hsl(330 85% 60%), transparent)",
          top: "60%",
          right: "30%",
          animation: "float-slow 16s ease-in-out infinite 12s",
        }}
      />

      {/* Morphing blob */}
      <div
        className="absolute w-[400px] h-[400px] opacity-[0.03]"
        style={{
          background: "linear-gradient(135deg, hsl(250 85% 65%), hsl(200 90% 55%), hsl(330 85% 60%))",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "blob-morph 15s ease-in-out infinite, float 20s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          animation: "aurora-shift 30s ease-in-out infinite",
        }}
      />

      {/* Floating light streaks */}
      <div
        className="absolute w-[2px] h-[200px] opacity-[0.05] rounded-full"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(250 85% 65% / 0.5), transparent)",
          top: "20%",
          left: "15%",
          animation: "float 8s ease-in-out infinite",
          transform: "rotate(15deg)",
        }}
      />
      <div
        className="absolute w-[2px] h-[300px] opacity-[0.04] rounded-full"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(200 90% 55% / 0.4), transparent)",
          top: "40%",
          right: "20%",
          animation: "float 10s ease-in-out infinite 2s",
          transform: "rotate(-10deg)",
        }}
      />
      <div
        className="absolute w-[1px] h-[150px] opacity-[0.06] rounded-full"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(330 85% 60% / 0.5), transparent)",
          bottom: "30%",
          left: "40%",
          animation: "float 7s ease-in-out infinite 5s",
          transform: "rotate(25deg)",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(230 25% 7% / 0.4) 100%)",
        }}
      />
    </div>
  );
}
