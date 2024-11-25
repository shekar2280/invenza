"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";
import styles from "./revenueCharts.module.css";

function RevenueChart() {
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const transactions = await response.json();

        // Group revenue by day
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

        // Group revenue by category
        const totalRevenue = transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        );
        const groupedCategoryData = transactions.reduce((acc, transaction) => {
          const existing = acc.find((item) => item.name === transaction.status);
          if (existing) {
            existing.value += transaction.amount;
          } else {
            acc.push({
              name: transaction.status,
              value: transaction.amount,
            });
          }
          return acc;
        }, []);

        const categoryDataWithPercentage = groupedCategoryData.map((item) => ({
          ...item,
          percentage: ((item.value / totalRevenue) * 100).toFixed(2),
        }));
        setCategoryData(categoryDataWithPercentage);

        // Group revenue by month
        const groupedMonthlyData = transactions.reduce((acc, transaction) => {
          const month = new Date(transaction.date).toLocaleString("default", {
            month: "short",
          });
          const existing = acc.find((item) => item.name === month);
          if (existing) {
            existing.actual += transaction.amount;
          } else {
            acc.push({
              name: month,
              actual: transaction.amount,
              target: 10000,
            });
          }
          return acc;
        }, []);

        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        groupedMonthlyData.sort(
          (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
        );
        setMonthlyData(groupedMonthlyData);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchRevenueData();
  }, []);

  return (
    <div className={styles.charts}>
      <div className={styles.rowOne}>
        <div className={styles.container}>
          <div className={styles.chartSection}>
            <h3 className={styles.subtitle}>Revenue Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ background: "white", border: "none" }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.chartSection}>
            <h3 className={styles.subtitle}>Revenue Breakdown by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  innerRadius={70}
                  fill="#8884d8"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className={styles.rowTwo}>
        <div className={styles.container}>
          <div className={styles.chartSection}>
            <h3 className={styles.subtitle}>Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="actual" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.chartSection}>
            <h3 className={styles.subtitle}>Category Contribution (Percentage)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={categoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value) => `${Number(value).toFixed(2)}%`}
                  contentStyle={{ background: "white", border: "none" }}
                />
                <Area
                  type="monotone"
                  dataKey="percentage"
                  stroke="#34d399"
                  fill="#6ee7b7"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;
