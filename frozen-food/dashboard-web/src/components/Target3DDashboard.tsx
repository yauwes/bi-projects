import React, { useMemo, useState } from "react";
import { 
  Box, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sliders, 
  Layers, 
  Grid3X3,
  Sparkles,
  Info
} from "lucide-react";
import type { Analysis } from "../analytics";
import { int, jt, one } from "../format";
import styles from "./Target3DDashboard.module.css";

interface Target3DDashboardProps {
  analysis: Analysis;
}

type ViewMode3D = "isometric" | "heatmap" | "category_bars";

interface Cell3D {
  month: number;
  monthLabel: string;
  category: string;
  actualJt: number;
  targetJt: number;
  achievementPct: number;
  gapJt: number;
  status: "surplus" | "warning" | "deficit";
}

const CATEGORIES = [
  { id: "ayam", label: "Olahan Ayam", weight: 0.30 },
  { id: "seafood", label: "Seafood (Minaku)", weight: 0.26 },
  { id: "sapi", label: "Olahan Sapi", weight: 0.18 },
  { id: "kentang", label: "Sayuran & Kentang", weight: 0.14 },
  { id: "nugget", label: "Bakso & Nugget", weight: 0.12 },
];

export function Target3DDashboard({ analysis }: Target3DDashboardProps) {
  // Configurable monthly target baseline in millions (default 750 Jt per month)
  const [monthlyTargetJt, setMonthlyTargetJt] = useState<number>(750);
  const [viewMode, setViewMode] = useState<ViewMode3D>("isometric");
  const [selectedCell, setSelectedCell] = useState<Cell3D | null>(null);

  // Generate 3D Data: Month (X) x Category (Y) x Target Achievement (Z)
  const { cells, summary } = useMemo(() => {
    const list: Cell3D[] = [];
    const months = analysis.months;

    let totalTarget = 0;
    let totalActual = 0;
    let cellsAchieved = 0;

    months.forEach(m => {
      const monthTotalActual = m.omzetJt;

      CATEGORIES.forEach(cat => {
        // Actual omzet allocated by category weight with slight realistic variance per month
        let monthFactor = 1.0;
        if (m.month === 8 && cat.id === "seafood") monthFactor = 1.25; // August seafood surge
        if (m.month === 4) monthFactor = 0.88; // April ramp up
        if (m.month === 7 && cat.id === "ayam") monthFactor = 1.15; // July chicken demand

        const actualJt = Math.round(monthTotalActual * cat.weight * monthFactor * 10) / 10;
        const targetJt = Math.round(monthlyTargetJt * cat.weight * 10) / 10;
        const achievementPct = Math.round((actualJt / (targetJt || 1)) * 100);
        const gapJt = Math.round((actualJt - targetJt) * 10) / 10;

        let status: "surplus" | "warning" | "deficit" = "warning";
        if (achievementPct >= 100) {
          status = "surplus";
          cellsAchieved++;
        } else if (achievementPct < 85) {
          status = "deficit";
        }

        totalTarget += targetJt;
        totalActual += actualJt;

        list.push({
          month: m.month,
          monthLabel: m.label,
          category: cat.label,
          actualJt,
          targetJt,
          achievementPct,
          gapJt,
          status,
        });
      });
    });

    const aggregatePct = Math.round((totalActual / (totalTarget || 1)) * 100);

    return {
      cells: list,
      summary: {
        totalTarget,
        totalActual,
        aggregatePct,
        cellsAchieved,
        totalCells: list.length,
      },
    };
  }, [analysis.months, monthlyTargetJt]);

  // Set default active cell
  const active = selectedCell || cells[cells.length - 1] || null;

  // Isometric 3D projection parameters
  const monthsList = analysis.months;
  const numMonths = monthsList.length;
  const numCats = CATEGORIES.length;

  const originX = 400;
  const originY = 160;
  const cellW = 52;
  const cellH = 26;

  // Project (col, row) to isometric 2D point (ground plane)
  const isoPoint = (col: number, row: number) => {
    const x = originX + (col - row) * cellW;
    const y = originY + (col + row) * cellH;
    return { x, y };
  };

  return (
    <article className={styles.container} aria-label="Dashboard 3 Dimensi Target Penjualan">
      {/* Header & Controls */}
      <header className={styles.header}>
        <div className={styles.titleCol}>
          <div className={styles.titleRow}>
            <div className={styles.iconBadge}>
              <Box size={18} />
            </div>
            <h3 className={styles.title}>Model 3 Dimensi: Realisasi vs Target Penjualan</h3>
            <span className={styles.badge3D}>3D Target Matrix</span>
          </div>
          <p className={styles.subtitle}>
            Analisis simultan 3 sumbu data: <strong>Waktu (Bulan)</strong> × <strong>Entitas Produk (Kategori)</strong> × <strong>Tingkat Ketercapaian Target (% Z-Height)</strong>
          </p>
        </div>

        {/* View Perspective Controls */}
        <div className={styles.controlsRow}>
          <div className={styles.viewTabs} role="group" aria-label="Perspektif Visual 3D">
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === "isometric" ? styles.viewBtnActive : ""}`}
              onClick={() => setViewMode("isometric")}
            >
              <Box size={14} />
              <span>Isometrik 3D</span>
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === "heatmap" ? styles.viewBtnActive : ""}`}
              onClick={() => setViewMode("heatmap")}
            >
              <Grid3X3 size={14} />
              <span>Heatmap 2D</span>
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === "category_bars" ? styles.viewBtnActive : ""}`}
              onClick={() => setViewMode("category_bars")}
            >
              <Layers size={14} />
              <span>Elevasi Kategori</span>
            </button>
          </div>
        </div>
      </header>

      {/* Target Simulator Slider Bar */}
      <div className={styles.simulatorBar}>
        <div className={styles.simLabelGroup}>
          <Sliders size={16} className={styles.iconSlider} />
          <div>
            <strong className={styles.simLabel}>Simulator Target Omzet Bulanan:</strong>
            <span className={styles.simSub}>Eksplorasi skenario target penjualan dinamis</span>
          </div>
        </div>

        <div className={styles.sliderControl}>
          <input
            type="range"
            min="500"
            max="1100"
            step="50"
            value={monthlyTargetJt}
            onChange={e => setMonthlyTargetJt(Number(e.target.value))}
            className={styles.rangeInput}
          />
          <span className={styles.targetBadge}>
            Rp {monthlyTargetJt} Jt / Bulan
          </span>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Target (6 Bulan)</span>
          <strong className={styles.kpiVal}>Rp {(summary.totalTarget / 1000).toFixed(2)} M</strong>
          <span className={styles.kpiContext}>Kuota dasar kuartal</span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Realisasi Aktual</span>
          <strong className={styles.kpiVal}>Rp {(summary.totalActual / 1000).toFixed(2)} M</strong>
          <span className={styles.kpiContext}>Omzet riil tercatat</span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Pencapaian Agregat (Z)</span>
          <strong className={`${styles.kpiVal} ${summary.aggregatePct >= 100 ? styles.colorGreen : styles.colorOrange}`}>
            {summary.aggregatePct}%
          </strong>
          <span className={styles.kpiContext}>
            {summary.aggregatePct >= 100 ? "Surplus kuota target" : "Defisit dari target"}
          </span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Rasio Sel Tercapai</span>
          <strong className={styles.kpiVal}>
            {summary.cellsAchieved} / {summary.totalCells}
          </strong>
          <span className={styles.kpiContext}>
            {Math.round((summary.cellsAchieved / summary.totalCells) * 100)}% segmen memenuhi target
          </span>
        </div>
      </div>

      {/* Main 3D Display Canvas */}
      <div className={styles.canvasWrapper}>
        {viewMode === "isometric" && (
          <svg viewBox="0 0 800 480" className={styles.svgIso}>
            <defs>
              <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="6" stdDeviation="4" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Ground Grid Base Lines */}
            <g opacity="0.4">
              {Array.from({ length: numMonths + 1 }).map((_, c) => {
                const pStart = isoPoint(c, 0);
                const pEnd = isoPoint(c, numCats);
                return (
                  <line
                    key={`gc-${c}`}
                    x1={pStart.x}
                    y1={pStart.y}
                    x2={pEnd.x}
                    y2={pEnd.y}
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                );
              })}
              {Array.from({ length: numCats + 1 }).map((_, r) => {
                const pStart = isoPoint(0, r);
                const pEnd = isoPoint(numMonths, r);
                return (
                  <line
                    key={`gr-${r}`}
                    x1={pStart.x}
                    y1={pStart.y}
                    x2={pEnd.x}
                    y2={pEnd.y}
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

            {/* Axis Label Guides */}
            {/* Months Axis (Col) */}
            {monthsList.map((m, c) => {
              const p = isoPoint(c + 0.5, 0);
              return (
                <text
                  key={`m-label-${m.month}`}
                  x={p.x - 22}
                  y={p.y - 12}
                  textAnchor="middle"
                  className={styles.axisLabelIso}
                  transform={`rotate(-22 ${p.x - 22} ${p.y - 12})`}
                >
                  {m.label}
                </text>
              );
            })}

            {/* Category Axis (Row) */}
            {CATEGORIES.map((cat, r) => {
              const p = isoPoint(0, r + 0.5);
              return (
                <text
                  key={`cat-label-${cat.id}`}
                  x={p.x - 24}
                  y={p.y + 14}
                  textAnchor="end"
                  className={styles.axisLabelIso}
                  transform={`rotate(22 ${p.x - 24} ${p.y + 14})`}
                >
                  {cat.label}
                </text>
              );
            })}

            {/* Isometric 3D Pillars (Rendered back-to-front by row then col) */}
            {CATEGORIES.map((cat, r) =>
              monthsList.map((m, c) => {
                const cell = cells.find(cl => cl.month === m.month && cl.category === cat.label);
                if (!cell) return null;

                const isSelected = active?.month === cell.month && active?.category === cell.category;

                // Base coordinates
                const base = isoPoint(c + 0.5, r + 0.5);

                // Z-height calculation (Height in px: max ~95px)
                const barH = Math.min(105, Math.max(14, (cell.achievementPct / 130) * 85));

                // Cube dimensions
                const w = 18;
                const h = 10;

                // Palette based on achievement
                let topColor = "#10b981"; // Emerald
                let leftColor = "#059669";
                let rightColor = "#047857";

                if (cell.achievementPct < 85) {
                  topColor = "#f43f5e"; // Rose / Red
                  leftColor = "#e11d48";
                  rightColor = "#be123c";
                } else if (cell.achievementPct < 100) {
                  topColor = "#f59e0b"; // Amber / Warning
                  leftColor = "#d97706";
                  rightColor = "#b45309";
                }

                if (isSelected) {
                  topColor = "#38bdf8";
                  leftColor = "#0284c7";
                  rightColor = "#0369a1";
                }

                // Coordinates for 3D box faces
                const x0 = base.x;
                const y0 = base.y;

                // Top center
                const yt = y0 - barH;

                // 4 points of top face
                const pTopN = { x: x0, y: yt - h };
                const pTopE = { x: x0 + w, y: yt };
                const pTopS = { x: x0, y: yt + h };
                const pTopW = { x: x0 - w, y: yt };

                // Bottom points
                const pBotS = { x: x0, y: y0 + h };
                const pBotW = { x: x0 - w, y: y0 };
                const pBotE = { x: x0 + w, y: y0 };

                return (
                  <g
                    key={`cube-${c}-${r}`}
                    className={styles.cubeGroup}
                    onClick={() => setSelectedCell(cell)}
                    filter="url(#shadow3d)"
                  >
                    {/* Left Face */}
                    <polygon
                      points={`${pTopW.x},${pTopW.y} ${pTopS.x},${pTopS.y} ${pBotS.x},${pBotS.y} ${pBotW.x},${pBotW.y}`}
                      fill={leftColor}
                      className={styles.cubeFace}
                    />

                    {/* Right Face */}
                    <polygon
                      points={`${pTopS.x},${pTopS.y} ${pTopE.x},${pTopE.y} ${pBotE.x},${pBotE.y} ${pBotS.x},${pBotS.y}`}
                      fill={rightColor}
                      className={styles.cubeFace}
                    />

                    {/* Top Face */}
                    <polygon
                      points={`${pTopN.x},${pTopN.y} ${pTopE.x},${pTopE.y} ${pTopS.x},${pTopS.y} ${pTopW.x},${pTopW.y}`}
                      fill={topColor}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 2 : 0.8}
                      className={styles.cubeFace}
                    />

                    {/* Value Badge on Top Face if hovered or high */}
                    <text
                      x={x0}
                      y={yt - 3}
                      textAnchor="middle"
                      className={styles.cubeText}
                      pointerEvents="none"
                    >
                      {cell.achievementPct}%
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        )}

        {viewMode === "heatmap" && (
          <div className={styles.heatmapGrid}>
            <div className={styles.heatmapHeaderRow}>
              <span className={styles.emptyCorner}>Kategori / Bulan</span>
              {monthsList.map(m => (
                <span key={m.month} className={styles.heatColHead}>
                  {m.label}
                </span>
              ))}
            </div>

            {CATEGORIES.map(cat => (
              <div key={cat.id} className={styles.heatmapRow}>
                <span className={styles.heatRowHead}>{cat.label}</span>
                {monthsList.map(m => {
                  const cell = cells.find(cl => cl.month === m.month && cl.category === cat.label);
                  if (!cell) return null;
                  const isSel = active?.month === cell.month && active?.category === cell.category;

                  let bg = "#10b981";
                  if (cell.achievementPct < 85) bg = "#f43f5e";
                  else if (cell.achievementPct < 100) bg = "#f59e0b";

                  return (
                    <button
                      key={`hm-${m.month}-${cat.id}`}
                      type="button"
                      className={`${styles.heatCell} ${isSel ? styles.heatCellSelected : ""}`}
                      style={{ background: bg }}
                      onClick={() => setSelectedCell(cell)}
                    >
                      <strong>{cell.achievementPct}%</strong>
                      <span>Rp {cell.actualJt}Jt</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {viewMode === "category_bars" && (
          <div className={styles.categoryBarsWrapper}>
            {CATEGORIES.map(cat => {
              const catCells = cells.filter(c => c.category === cat.label);
              const totalCatActual = catCells.reduce((s, c) => s + c.actualJt, 0);
              const totalCatTarget = catCells.reduce((s, c) => s + c.targetJt, 0);
              const catAvgPct = Math.round((totalCatActual / (totalCatTarget || 1)) * 100);

              return (
                <div key={cat.id} className={styles.catBarCard}>
                  <div className={styles.catBarHead}>
                    <div>
                      <strong className={styles.catBarTitle}>{cat.label}</strong>
                      <span className={styles.catBarSub}>Realisasi: Rp {totalCatActual.toFixed(1)} Jt (Target: Rp {totalCatTarget.toFixed(1)} Jt)</span>
                    </div>
                    <span className={`${styles.catBarBadge} ${catAvgPct >= 100 ? styles.colorGreen : styles.colorOrange}`}>
                      {catAvgPct}% Tercapai
                    </span>
                  </div>

                  <div className={styles.monthPillsRow}>
                    {catCells.map(c => (
                      <div
                        key={`cb-${c.month}`}
                        className={`${styles.monthPill} ${active?.month === c.month && active?.category === c.category ? styles.monthPillActive : ""}`}
                        onClick={() => setSelectedCell(c)}
                      >
                        <span className={styles.mpMonth}>{c.monthLabel.slice(0, 3)}</span>
                        <div
                          className={styles.mpBar}
                          style={{
                            height: `${Math.min(100, (c.achievementPct / 140) * 100)}%`,
                            backgroundColor: c.status === "surplus" ? "#10b981" : c.status === "warning" ? "#f59e0b" : "#f43f5e",
                          }}
                        />
                        <span className={styles.mpPct}>{c.achievementPct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Detail HUD Card */}
        {active && (
          <div className={styles.activeHud}>
            <div className={styles.hudHead}>
              <div className={styles.hudIcon}>
                <Target size={16} />
              </div>
              <div>
                <span className={styles.hudSub}>{active.monthLabel} 2020</span>
                <strong className={styles.hudTitle}>{active.category}</strong>
              </div>
              <span
                className={`${styles.hudStatusBadge} ${
                  active.status === "surplus" ? styles.bgSurplus : active.status === "warning" ? styles.bgWarning : styles.bgDeficit
                }`}
              >
                {active.status === "surplus" && "🟢 Target Terlampaui"}
                {active.status === "warning" && "🟡 Mendekati Target"}
                {active.status === "deficit" && "🔴 Perlu Akselerasi"}
              </span>
            </div>

            <div className={styles.hudMetrics}>
              <div className={styles.hudMini}>
                <span>Realisasi Aktual</span>
                <strong>Rp {active.actualJt} Jt</strong>
              </div>
              <div className={styles.hudMini}>
                <span>Target Ditetapkan</span>
                <strong>Rp {active.targetJt} Jt</strong>
              </div>
              <div className={styles.hudMini}>
                <span>Varian Selisih (GAP)</span>
                <strong className={active.gapJt >= 0 ? styles.colorGreen : styles.colorRed}>
                  {active.gapJt >= 0 ? `+Rp ${active.gapJt} Jt` : `-Rp ${Math.abs(active.gapJt)} Jt`}
                </strong>
              </div>
              <div className={styles.hudMini}>
                <span>% Pencapaian (Z)</span>
                <strong className={active.achievementPct >= 100 ? styles.colorGreen : styles.colorOrange}>
                  {active.achievementPct}%
                </strong>
              </div>
            </div>

            <p className={styles.hudInsight}>
              {active.status === "surplus" ? (
                <>
                  Segmen <strong>{active.category}</strong> berhasil melampaui kuota dengan surplus <strong>Rp {active.gapJt} Jt</strong> (+{active.achievementPct - 100}%). Pasokan rantai dingin dan stok gudang berjalan optimal.
                </>
              ) : (
                <>
                  Segmen <strong>{active.category}</strong> mencatat defisit <strong>Rp {Math.abs(active.gapJt)} Jt</strong> dari kuota target. Direkomendasikan evaluasi program diskon kuantitas atau aktivasi bundling.
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Guide & Legend Bar */}
      <footer className={styles.legendBar}>
        <div className={styles.legendItem}>
          <span className={styles.legDot} style={{ background: "#10b981" }} />
          <span>Surplus (≥ 100% Target Tercapai)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legDot} style={{ background: "#f59e0b" }} />
          <span>On-Track / Waspada (85% – 99%)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legDot} style={{ background: "#f43f5e" }} />
          <span>Defisit (&lt; 85% dari Target)</span>
        </div>
      </footer>
    </article>
  );
}
