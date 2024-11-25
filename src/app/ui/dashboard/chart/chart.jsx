"use client";

import { useEffect, useState } from "react";
import styles from "./chart.module.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Chart() {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch("/api/transactions");
        const transactions = await response.json();

        const groupedData = transactions.reduce((acc, transaction) => {
          const date = new Date(transaction.date).toLocaleDateString();
          const existing = acc.find((item) => item.name === date);
          if (existing) {
            existing.revenue += transaction.amount;
          } else {
            acc.push({ name: date, revenue: transaction.amount });
          }
          return acc;
        }, []);

        groupedData.sort((a, b) => new Date(a.name) - new Date(b.name));

        setRevenueData(groupedData);
      } catch (err) {
        console.error("Error fetching revenue data:", err);
      }
    };

    fetchRevenueData();
  }, []); // Dependency array ensures `useEffect` runs only once.

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={revenueData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "black", border: "none", color: "white" }} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
