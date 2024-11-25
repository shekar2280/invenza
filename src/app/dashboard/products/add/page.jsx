import { addProduct } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

function AddProductPage() {

  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" name="title" placeholder="title" required />
        <select name="cat" id="cat" required>
          <option value="default">--- Select a Category ---</option>
          <option value="kitchen">Home and Kitchen</option>
          <option value="electronics">Electronics</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health and Personal Care</option>
          <option value="household">Household Essentials</option>
          <option value="stationary">Stationary</option>
        </select>
        <input type="number" name="price" placeholder="price" required />
        <input type="number" name="stock" placeholder="stock" required />
        <input type="text" name="color" placeholder="color" />
        <input type="date" name="expiryDate" placeholder="expiryDate" required />
        <textarea name="desc" id="desc" rows="16" placeholder="Description" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProductPage;
