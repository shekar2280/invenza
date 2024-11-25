"use client";

import Image from "next/image";
import styles from "./rightbar.module.css";
import { useRouter } from "next/navigation";
import { MdArrowUpward } from "react-icons/md";

function RightBar() {
  const router = useRouter();

  const handleChange = () => {
    router.push("/dashboard/transactions"); 
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="./dashboard.svg" alt="" fill className={styles.bg} />
        </div>
        <div className={styles.texts}>
          <span className={styles.notifications}>🔥 Avaiable Now</span>
          <h3 className={styles.title}>Weekly Profit Summary</h3>
          <span className={styles.subtitle}><span className={styles.arrow}><MdArrowUpward/></span> +15% Increase</span>
          <p className={styles.desc}>
            This week saw a 15% increase in profits compared to last week,
            indicating strong sales growth and improved revenue streams. Keep up
            the momentum!
          </p>
          <button className={styles.button} onClick={handleChange}>
            Check Transactions
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.texts}>
          <span className={styles.notifications}>Coming Soon...</span>
          <h3 className={styles.title}>Weekly Profit Summary</h3>
          <span className={styles.subtitle}><span className={styles.arrow}><MdArrowUpward/></span> +15% Increase</span>
          <p className={styles.desc}>
            This week saw a 15% increase in profits compared to last week,
            indicating strong sales growth and improved revenue streams. Keep up
            the momentum!
          </p>
          <button className={styles.button} onClick={handleChange}>
            Check Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
