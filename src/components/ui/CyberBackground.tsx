/**
 * Modern Ambient Mesh Background for human-crafted UI/UX:
 * Warm, calming porcelain canvas with soft, diffused luminous accents.
 */
export function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FAFCFF] pointer-events-none">
      {/* Top Left - Soft Emerald Aura */}
      <div
        className="absolute -top-32 -left-32 h-[680px] w-[680px] rounded-full opacity-60 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(250, 252, 255, 0) 70%)',
        }}
      />
      {/* Right - Subtle Electric Sky Aura */}
      <div
        className="absolute top-1/4 -right-32 h-[640px] w-[640px] rounded-full opacity-50 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.07) 0%, rgba(250, 252, 255, 0) 70%)',
        }}
      />
      {/* Bottom Center - Gentle Jade Aura */}
      <div
        className="absolute -bottom-40 left-1/3 h-[580px] w-[580px] rounded-full opacity-45 blur-[160px]"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(250, 252, 255, 0) 70%)',
        }}
      />
    </div>
  );
}
