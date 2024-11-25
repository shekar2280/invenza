import styles from "@/app/ui/dashboard/revenue/revenue.module.css"
import RevenueChart from "@/app/ui/dashboard/revenueCharts/revenueCharts"

function Revenue() {
  return (
    <div className={styles.container}>
      <RevenueChart />
    </div>
  )
}

export default Revenue
