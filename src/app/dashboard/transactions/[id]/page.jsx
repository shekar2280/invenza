import { updateTransaction } from "@/app/lib/actions";
import { fetchTransaction } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/transactions/singleTransactions/singleTransactions.module.css";

const singleTransactionsPage = async ({ params }) => {
  const { id } = params;
  const transaction = await fetchTransaction(id);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateTransaction} className={styles.form}>
          <input type="hidden" name="id" value={transaction.id} />

          <label>Transaction Date</label>
          <input type="date" name="date" placeholder={transaction.date} />

          <label>Transaction ID</label>
          <input
            type="text"
            name="transaction_id"
            placeholder={transaction.transaction_id}
          />

          <label>Transaction Amount</label>
          <input type="number" name="amount" placeholder={transaction.amount} />

          <label>Transaction Type</label>
          <select name="category" id="category">
            <option value="default" disabled selected={!transaction.category}>
              {transaction.category || "--- Select Transaction Type ---"}
            </option>
            <option value="sale" selected={transaction.category === "Sale"}>
              Sale
            </option>
            <option value="refund" selected={transaction.categoy === "Refund"}>
              Refund
            </option>
          </select>

          <label>Status</label>
          <select name="status" id="status">
            <option value="default" disabled selected={!transaction.status}>
              {transaction.status || "--- Select a Category ---"}
            </option>
            <option value="pending" selected={transaction.status === "Pending"}>
              Pending
            </option>
            <option value="done" selected={transaction.status === "Done"}>
              Done
            </option>
            <option
              value="cancelled"
              selected={transaction.status === "Cancelled"}
            >
              Cancelled
            </option>
          </select>
          <label>Customer Type</label>
          <select name="customer_type" id="customer_type">
            <option
              value="default"
              disabled
              selected={!transaction.customer_type}
            >
              {transaction.customer_type || "You are a ? "}
            </option>
            <option
              value="customer"
              selected={transaction.customer_type === "Customer"}
            >
              Customer
            </option>
            <option
              value="vendor"
              selected={transaction.customer_type === "Vendor"}
            >
              Vendor
            </option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={transaction.desc}
          ></textarea>
          <button>UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default singleTransactionsPage;
