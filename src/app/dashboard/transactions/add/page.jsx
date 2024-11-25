import { addTransaction } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/transactions/addTransactions/addTransactions.module.css";

function AddTransactionPage() {

  return (
    <div className={styles.container}>
      <form action={addTransaction} className={styles.form}>
        <input type="date" name="date" placeholder="Transaction Date" required />
        <input type="text" name="transaction_id" placeholder="Transaction ID" required />
        <input type="number" name="amount" placeholder="Amount" required />
        <select name="category" id="category" required>
          <option value="default">Select Transaction Type</option>
          <option value="sale">Sale</option>
          <option value="refund">Refund</option>
        </select>
        <select name="status" id="status" required>
          <option value="default">Transaction Status</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select name="customer_type" id="customer_type" required>
          <option value="default">You are a ?</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
        <textarea name="desc" id="desc" rows="16" placeholder="Description" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTransactionPage;
