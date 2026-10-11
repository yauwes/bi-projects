import React, { useState } from "react";
import { Globe, MapPin, ChevronDown, Sparkles } from "lucide-react";
import styles from "./ColdChainGlobe.module.css";

interface LocationPin {
  id: string;
  name: string;
  role: string;
  x: number; // percentage in SVG viewBox
  y: number;
  color: string;
  orders: string;
  volume: string;
}

const DISTRIBUTION_PINS: LocationPin[] = [
  {
    id: "pin-jkt",
    name: "Hub Utama Jabodetabek",
    role: "Pusat Cold Storage & Armada Distribusi",
    x: 44,
    y: 42,
    color: "#6366f1", // Indigo
    orders: "2.410 Nota",
    volume: "7.850 Dus",
  },
  {
    id: "pin-sutar",
    name: "Pak Sutarmuji (Sentra Grosir)",
    role: "Pembeli Borongan Terbesar (400 Dus)",
    x: 32,
    y: 36,
    color: "#8b5cf6", // Purple
    orders: "Rp 126,4 Jt",
    volume: "400 Dus Otak-Otak",
  },
  {
    id: "pin-bdg",
    name: "Depo Jawa Barat (Bandung)",
    role: "Jaringan Mitra & Agen Retail",
    x: 52,
    y: 52,
    color: "#06b6d4", // Cyan
    orders: "1.180 Nota",
    volume: "3.420 Dus",
  },
  {
    id: "pin-rohmat",
    name: "Mas Rohmat (Distributor Mitra)",
    role: "Pembeli Partai Besar (150 Dus)",
    x: 62,
    y: 34,
    color: "#10b981", // Emerald
    orders: "Rp 45,75 Jt",
    volume: "150 Dus",
  },
  {
    id: "pin-sby",
    name: "Hub Jawa Timur (Surabaya)",
    role: "Cold Storage Regional Timur & Bali",
    x: 68,
    y: 58,
    color: "#3b82f6", // Blue
    orders: "1.640 Nota",
    volume: "5.120 Dus",
  },
  {
    id: "pin-citarasa",
    name: "Toko Cita Rasa Baru",
    role: "Langganan Toko Mitra Utama",
    x: 46,
    y: 64,
    color: "#f59e0b", // Amber
    orders: "Rp 32,4 Jt",
    volume: "128 Dus",
  },
];

export function ColdChainGlobe() {
  const [activePin, setActivePin] = useState<LocationPin | null>(DISTRIBUTION_PINS[0]);
  const [regionFilter, setRegionFilter] = useState("Semua Wilayah");

  return (
    <div className={styles.card} aria-label="Peta Distribusi Global Overview">
      {/* Card Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.globeBadge}>
            <Globe size={15} />
          </span>
          <div>
            <h3 className={styles.title}>Global Overview</h3>
            <span className={styles.subtitle}>Jaringan Distribusi & Pelanggan Utama</span>
          </div>
        </div>

        <div className={styles.regionSelectWrap}>
          <button type="button" className={styles.regionBtn}>
            <span>{regionFilter}</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* 3D Realistic Globe Visualization */}
      <div className={styles.globeWrapper}>
        <svg viewBox="0 0 420 340" className={styles.globeSvg}>
          <defs>
            {/* Sphere 3D Radial Lighting */}
            <radialGradient id="globeShade" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f3f4f8" />
              <stop offset="75%" stopColor="#dbe0ea" />
              <stop offset="95%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>

            {/* Atmosphere Ambient Glow */}
            <radialGradient id="atmoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#e0e7ff" stopOpacity="0" />
              <stop offset="96%" stopColor="#c7d2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.65" />
            </radialGradient>

            {/* Sphere Drop Shadow */}
            <filter id="globeDropShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#1e1b4b" floodOpacity="0.14" />
            </filter>

            {/* Pin Ripple Filter */}
            <filter id="pinGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Bottom Ground Shadow Ellipse */}
          <ellipse cx="210" cy="290" rx="135" ry="18" fill="rgba(30, 27, 75, 0.08)" filter="blur(8px)" />

          {/* Main 3D Sphere Base */}
          <circle
            cx="210"
            cy="165"
            r="125"
            fill="url(#globeShade)"
            filter="url(#globeDropShadow)"
          />

          {/* Atmospheric Edge Ring */}
          <circle
            cx="210"
            cy="165"
            r="125"
            fill="url(#atmoGlow)"
            pointerEvents="none"
          />

          {/* Stylized Continents / Relief Shading */}
          <g className={styles.continentsLayer} opacity="0.85">
            {/* Asia & Nusantara Landmass Relief */}
            <path
              d="M 140 120 Q 165 95 195 105 Q 225 110 245 95 Q 270 90 280 115 Q 295 135 275 155 Q 260 170 235 160 Q 215 155 195 170 Q 170 175 155 155 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
            {/* Island Chain (Sumatra, Jawa, Kalimantan, Sulawesi, Bali) */}
            <path
              d="M 160 170 Q 185 178 215 182 Q 245 186 270 188 Q 285 190 295 195 Q 280 205 250 200 Q 210 196 175 190 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <path
              d="M 220 135 Q 240 128 255 142 Q 245 158 228 152 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <path
              d="M 265 145 Q 285 148 280 168 Q 268 165 262 155 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            {/* Australia North Coast Relief */}
            <path
              d="M 240 220 Q 275 210 305 225 Q 315 245 285 260 Q 255 255 240 235 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          </g>

          {/* 3D Latitude / Longitude Elliptical Grid Lines */}
          <g className={styles.gridLines} opacity="0.28" stroke="#94a3b8" fill="none">
            {/* Equator & Parallels */}
            <ellipse cx="210" cy="165" rx="125" ry="34" strokeWidth="0.8" strokeDasharray="3 3" />
            <ellipse cx="210" cy="130" rx="118" ry="28" strokeWidth="0.8" />
            <ellipse cx="210" cy="200" rx="118" ry="28" strokeWidth="0.8" />
            {/* Meridians */}
            <ellipse cx="210" cy="165" rx="45" ry="125" strokeWidth="0.8" />
            <ellipse cx="210" cy="165" rx="90" ry="125" strokeWidth="0.8" strokeDasharray="4 2" />
          </g>

          {/* Interactive Floating Location Pins */}
          {DISTRIBUTION_PINS.map(pin => {
            const px = 110 + (pin.x / 100) * 200;
            const py = 65 + (pin.y / 100) * 180;
            const isSelected = activePin?.id === pin.id;

            return (
              <g
                key={pin.id}
                className={styles.pinGroup}
                onClick={() => setActivePin(pin)}
                cursor="pointer"
              >
                {/* Ripple Pulse Rings */}
                <circle
                  cx={px}
                  cy={py}
                  r={isSelected ? 16 : 10}
                  fill="none"
                  stroke={pin.color}
                  strokeWidth="1.5"
                  opacity={isSelected ? "0.8" : "0.35"}
                  className={styles.pulseRing}
                />
                <circle
                  cx={px}
                  cy={py}
                  r={isSelected ? 10 : 6}
                  fill={pin.color}
                  opacity="0.2"
                />

                {/* Pin Shadow */}
                <ellipse cx={px} cy={py + 5} rx="6" ry="2" fill="rgba(0,0,0,0.2)" />

                {/* Pin Outer Badge (Solid White with Colored Border) */}
                <circle
                  cx={px}
                  cy={py}
                  r="7.5"
                  fill="#ffffff"
                  stroke={pin.color}
                  strokeWidth="2.5"
                  filter="url(#pinGlow)"
                />

                {/* Center Core Dot */}
                <circle
                  cx={px}
                  cy={py}
                  r="3.2"
                  fill={pin.color}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Detail Badge on Bottom Left */}
        {activePin && (
          <div className={styles.pinHud}>
            <div className={styles.hudHead}>
              <span className={styles.hudDot} style={{ background: activePin.color }} />
              <div>
                <strong className={styles.hudTitle}>{activePin.name}</strong>
                <span className={styles.hudRole}>{activePin.role}</span>
              </div>
            </div>
            <div className={styles.hudStats}>
              <div className={styles.hudStatItem}>
                <span>Akumulasi Pesanan:</span>
                <strong>{activePin.orders}</strong>
              </div>
              <div className={styles.hudStatItem}>
                <span>Kapasitas/Volume:</span>
                <strong>{activePin.volume}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
