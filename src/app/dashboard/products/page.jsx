import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";

const ProductsPage = async (props) => {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  // Function to check if expiry date is within the next 7 days
  const isExpirySoon = (expiryDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - currentDate;
    const daysRemaining = timeDifference / (1000 * 3600 * 24); 
    return daysRemaining <= 7 && daysRemaining >= 0; 
  };

  const categoryImage = {
    kitchen: "/kitchen.jpg",
    electronics: "/electronics.webp",
    groceries: "/groceries.jpg",
    health: "/health.jpg",
    household: "/household.avif",
    stationary: "/stationary.jpg",
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for products..." />
        <div>
          <Link href="/dashboard/products/import">
            <button className={styles.csvButton}>Import Using CSV</button>
          </Link>
          <Link href="/dashboard/products/add">
            <button className={styles.addButton}>Add New Products</button>
          </Link>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.heading}>
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Price</td>
            <td>Expiry Date</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className={styles.items}>
          {products.map((product) => {
            const expirySoon = isExpirySoon(product.expiryDate);

            return (
              <tr
                key={product.id}
                className={expirySoon ? styles.expirySoon : ""}
              >
                <td>
                  <div className={styles.product}>
                    <Image
                      src={categoryImage[product.cat] || "/no-products.png"}
                      alt={product.title}
                      width={40}
                      height={40}
                      className={styles.productImage}
                    />
                    <div className={styles.title}>{product.title}</div>
                  </div>
                </td>
                <td className={styles.category}>{product.cat}</td>
                <td>{product.price}</td>
                <td>{product.expiryDate?.toString().slice(4, 16)}</td>
                <td>{product.stock}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/products/${product.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form method="POST" action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <button
                        type="submit"
                        className={`${styles.button} ${styles.delete}`}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
