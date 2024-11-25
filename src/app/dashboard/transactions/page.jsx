import { fetchTransactions } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import ExportButton from "@/app/ui/dashboard/transaction/export/export";
import styles from "@/app/ui/dashboard/transactions/transactions.module.css";
import Link from "next/link";

const TransactionsPage = async (props) => {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const { count, transactions } = await fetchTransactions(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Enter Transaction ID..." />
        <ExportButton /> {/* Use the export button */}
        <Link href="/dashboard/transactions/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className={styles.heading}>
          <tr>
            <td>Date</td>
            <td>Customer Type</td>
            <td>Transaction ID</td>
            <td>Amount</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody className={styles.items}>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className={styles.transaction}>
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </td>
              <td className={styles.customer_type}>{transaction.customer_type}</td>
              <td className={styles.category}>{transaction.transaction_id}</td>
              <td>{transaction.amount}</td>
              <td
                className={`${styles.status} ${styles[
                  transaction.status.toLowerCase()
                ]}`}
              >
                {transaction.status}
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/transactions/${transaction.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default TransactionsPage;
