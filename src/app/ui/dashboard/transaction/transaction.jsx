"use client";

import { useEffect, useState } from "react";
import styles from "./transaction.module.css";

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead className={styles.heading}>
          <tr>
            <td>Date</td>
            <td>Amount</td>
            <td>Status</td>
            <td>Customer Type</td>
          </tr>
        </thead>
        <tbody className={styles.items}>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>
                <div className={styles.user}>
                  {new Date(transaction.date).toLocaleDateString()} 
                </div>
              </td>
              <td>₹{transaction.amount.toLocaleString()}</td> 
              <td>
                <span className={`${styles.status} ${styles[transaction.status]}`}>
                  {transaction.status}
                </span>
              </td>
              <td>{transaction.customer_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;