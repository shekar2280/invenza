import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const categoryImage = {
  kitchen: "/kitchen.jpg",
  electronics: "/electronics.webp",
  groceries: "/groceries.jpg",
  health: "/health.jpg",
  household: "/household.avif",
  stationary: "/stationary.jpg",
};


const singleProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={categoryImage[product.cat] || "/no-product.png"} alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          
          <label>Color</label>
          <input type="text" name="color" placeholder={product.color} />
          
          <label>Category</label>
          <select name="cat" id="cat">
            {/* Placeholder option */}
            <option value="default" disabled selected={!product.cat}>
              {product.cat || "--- Select a Category ---"}
            </option>
            <option value="kitchen" selected={product.cat === 'Kitchen'}>
              Home and Kitchen
            </option>
            <option value="electronics" selected={product.cat === 'Electronics'}>
              Electronics
            </option>
            <option value="groceries" selected={product.cat === 'Groceries'}>
              Groceries
            </option>
            <option value="health" selected={product.cat === 'Health'}>
              Health and Personal Care
            </option>
            <option value="household" selected={product.cat === 'Household'}>
              Household Essentials
            </option>
            <option value="stationary" selected={product.cat === 'Stationary'}>
              Stationary
            </option>
          </select>

          <label>Expiry Date</label>
          <input 
            type="date" 
            name="expiryDate" 
            placeholder={product.expiryDate ? product.expiryDate.toISOString().split('T')[0] : 'YYYY-MM-DD'} 
          />
          
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={product.desc}
          ></textarea>
          <button>UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default singleProductPage;
