import styles from "./card.module.css";
import Image from "next/image";

function Card({ title, icon, count, change }) {
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <div className={styles.heading}>
          <span className={styles.title}>{title}</span>
          <Image className={styles.image} src={icon} width={56} height={56} alt={`${title} icon`} />
        </div>
        <span className={styles.number}>
          {count !== undefined ? count.toLocaleString() : "Loading..."}
        </span>
        <span className={styles.detail}>
          {change !== undefined ? (
            <span
              className={change > 0 ? styles.positive : styles.negative}
            >
              {change}% more than previous week
            </span>
          ) : (
            "Loading..."
          )}
        </span>
      </div>
    </div>
  );
}

export default Card;
