"use client"

import { useEffect, useState } from "react";
import styles from "../ui/dashboard/dashboard.module.css";
import Card from "../ui/dashboard/card/card";
import Transactions from "../ui/dashboard/transaction/transaction";
import Chart from "../ui/dashboard/chart/chart";
import RightBar from "../ui/dashboard/rightbar/rightbar";

function Dashboard() {
  const [data, setData] = useState({
    userCount: 0,
    productCount: 0,
    transactionCount: 0,
    userChange: 0,
    productChange: 0,
    transactionChange: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch("/api/totalUsers");
      const userResult = await userResponse.json();
      console.log(userResult);

      const productResponse = await fetch("/api/totalProducts");
      const productResult = await productResponse.json();
      console.log(productResult);
      
      const transactionResponse = await fetch("/api/totalTransactions");
      const transactionResult = await transactionResponse.json();
      console.log(transactionResult);

      setData({
        currentUserCount: userResult.currentUserCount,
        currentProductCount: productResult.currentProductCount,
        currentTransactionCount: transactionResult.currentTransactionCount,
        userChange: userResult.userChange,
        productChange: productResult.productChange,
        transactionChange: transactionResult.transactionChange,
      });
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card
            title="Total Users"
            icon="/users_icon.png"
            count={data.currentUserCount}
            change={data.userChange}
          />
          <Card
            title="Total Products"
            icon="/products_icon.png"
            count={data.currentProductCount}
            change={data.productChange}
          />
          <Card
            title="Total Transactions"
            icon="/transactions_icon.png"
            count={data.currentTransactionCount}
            change={data.transactionChange}
          />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  );
}

export default Dashboard;
