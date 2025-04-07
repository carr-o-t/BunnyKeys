export function Doodles() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="doodles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Bunny doodle */}
          <path d="M20 50 Q30 20 40 50 Q50 20 60 50" stroke="#FF99B4" fill="none" strokeWidth="2"/>
          {/* Carrot doodle */}
          <path d="M70 30 L80 40 L90 30 M80 40 L80 60" stroke="#FF99B4" fill="none" strokeWidth="2"/>
          {/* Heart doodle */}
          <path d="M20 70 Q20 60 30 60 T40 70 L30 80 Z" stroke="#FF99B4" fill="none" strokeWidth="2"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#doodles)"/>
      </svg>
    </div>
  );
}