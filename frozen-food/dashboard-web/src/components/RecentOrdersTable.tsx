import React from "react";
import styles from "./RecentOrdersTable.module.css";

interface OrderRow {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Completed" | "Processing" | "Pending";
  date: string;
}

const RECENT_ORDERS: OrderRow[] = [
  {
    id: "#ORD-10458",
    customer: "Pak Sutarmuji",
    product: "Minaku Otak-Otak 500g (200 Dus)",
    amount: "Rp 63.200.000",
    status: "Completed",
    date: "13 Agu 2020",
  },
  {
    id: "#ORD-10457",
    customer: "Pak Sutarmuji",
    product: "Minaku Otak-Otak 500g (200 Dus)",
    amount: "Rp 63.200.000",
    status: "Completed",
    date: "03 Agu 2020",
  },
  {
    id: "#ORD-10456",
    customer: "Mas Rohmat",
    product: "Minaku Otak-Otak 500g (150 Dus)",
    amount: "Rp 45.750.000",
    status: "Completed",
    date: "03 Agu 2020",
  },
  {
    id: "#ORD-10455",
    customer: "Toko Cita Rasa Baru",
    product: "Okey Sosis Ayam 500g (20 Dus)",
    amount: "Rp 12.800.000",
    status: "Completed",
    date: "28 Sep 2020",
  },
  {
    id: "#ORD-10454",
    customer: "Graha Sandeni",
    product: "Jofrans Nugget Ayam (15 Dus)",
    amount: "Rp 8.950.000",
    status: "Processing",
    date: "25 Sep 2020",
  },
  {
    id: "#ORD-10453",
    customer: "Anton Frozen",
    product: "Belfoods Sosis Sapi (12 Dus)",
    amount: "Rp 7.200.000",
    status: "Completed",
    date: "20 Sep 2020",
  },
];

export function RecentOrdersTable() {
  return (
    <div className={styles.card} aria-label="Tabel Pesanan Terbaru">
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Orders</h3>
        <span className={styles.subtitle}>Transaksi Pembelian Terverifikasi</span>
      </div>

      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map(order => (
              <tr key={order.id} className={styles.row}>
                <td className={styles.orderId}>{order.id}</td>
                <td className={styles.customerName}>
                  <strong>{order.customer}</strong>
                </td>
                <td className={styles.productName}>{order.product}</td>
                <td className={styles.amountVal}>{order.amount}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      order.status === "Completed"
                        ? styles.statusCompleted
                        : styles.statusProcessing
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className={styles.dateCol}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
