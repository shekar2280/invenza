import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

function AddUserPage() {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" name="username" placeholder="username" required />
        <input type="email" name="email" placeholder="email" required />
        <input type="password" name="password" placeholder="password" required />
        <input type="phone" name="phone" placeholder="phone" required />
        <select name="isAdmin" id="isAdmin">
          <option value={false}>Is Admin?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea name="address" id="address" rows="16" placeholder="Address"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUserPage;
