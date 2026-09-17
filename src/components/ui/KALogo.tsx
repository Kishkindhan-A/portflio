export function KALogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 2 44 13V35L24 46 4 35V13Z"
        stroke="url(#ka-grad)"
        strokeWidth="1.75"
        fill="rgba(16,185,129,0.06)"
      />
      <path
        d="M24 8 38 16V32L24 40 10 32V16Z"
        stroke="rgba(2,132,199,0.4)"
        strokeWidth="1"
        fill="none"
      />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="800"
        fontSize="15"
        fill="#0F172A"
      >
        KA
      </text>
      <defs>
        <linearGradient id="ka-grad" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
