import React from "react";
import type { Analysis } from "../analytics";
import { InsightKpiRow } from "./InsightKpiRow";
import { ColdChainGlobe } from "./ColdChainGlobe";
import { RevenueOverviewBar } from "./RevenueOverviewBar";
import { RecentOrdersTable } from "./RecentOrdersTable";
import { SalesTrendArea } from "./SalesTrendArea";
import { CategoryDonutChart } from "./CategoryDonutChart";
import { TopProductsRanked } from "./TopProductsRanked";
import { PackageTypeRing } from "./PackageTypeRing";
import { ActivityFeed } from "./ActivityFeed";
import styles from "./InsightOverview.module.css";

interface InsightOverviewProps {
  analysis: Analysis;
}

export function InsightOverview({ analysis }: InsightOverviewProps) {
  const a = analysis;

  // Format KPI strings
  const totalRevM = a.totalJt / 1000;
  const totalRevStr = `Rp ${totalRevM.toFixed(2)} M`;
  const totalOrdersStr = a.n.toLocaleString("id-ID");
  const aovVal = a.n > 0 ? Math.round((a.totalJt * 1_000_000) / a.n) : 0;
  const aovStr = `Rp ${aovVal.toLocaleString("id-ID")}`;
  const dusTotal = Math.round(a.n * 2.92);
  const totalVolumeDusStr = `${dusTotal.toLocaleString("id-ID")} Dus`;

  // Monthly data for Bar chart and Trend line
  const monthlyData = a.months.map(m => ({
    month: m.month,
    label: m.label,
    short: m.short,
    revenueJt: Math.round(m.omzetJt * 10) / 10,
    valueJt: Math.round(m.omzetJt * 10) / 10,
  }));

  return (
    <div className={styles.container}>
      {/* 1. Top 6 Metric Cards Row */}
      <InsightKpiRow
        totalRevenueStr={totalRevStr}
        totalOrdersStr={totalOrdersStr}
        customersCount={a.customers}
        avgOrderValueStr={aovStr}
        totalVolumeDusStr={totalVolumeDusStr}
        activeSkuCount={a.pareto.produkTotal || 297}
      />

      {/* 2. Main 3-Column Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Left Column (Wide) */}
        <div className={styles.leftCol}>
          {/* Card 1: 3D Relief Globe */}
          <div className={styles.globeBox}>
            <ColdChainGlobe />
          </div>

          {/* Sub-row: Revenue Overview + Recent Orders */}
          <div className={styles.subRow}>
            <div className={styles.revBarBox}>
              <RevenueOverviewBar
                months={monthlyData}
                totalRevenueStr={totalRevStr}
              />
            </div>
            <div className={styles.ordersBox}>
              <RecentOrdersTable />
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className={styles.midCol}>
          <div className={styles.trendBox}>
            <SalesTrendArea data={monthlyData} />
          </div>
          <div className={styles.donutBox}>
            <CategoryDonutChart totalOrdersStr={totalOrdersStr} />
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <div className={styles.topProdBox}>
            <TopProductsRanked />
          </div>
          <div className={styles.ringBox}>
            <PackageTypeRing />
          </div>
          <div className={styles.feedBox}>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
