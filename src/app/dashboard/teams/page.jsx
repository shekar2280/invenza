import Link from "next/link";
import styles from "@/app/ui/dashboard/teams/teams.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchAdmins } from "@/app/lib/data";
import { deleteUser } from "@/app/lib/actions";

const TeamsPage = async (props) => {
  const searchParams = props.searchParams || {};
  const q = searchParams.q || "";
  const page = parseInt(searchParams.page, 10) || 1;

  // Fetch admin users
  const { count, admins } = await fetchAdmins(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for team members..." />
      </div>
      <table className={styles.table}>
        <thead className={styles.heading}>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className={styles.items}>
          {admins.map((admin) => {
            const adminStatus = admin.isActive ? "At Work" : "On Leave";
            return (
              <tr key={admin.id}>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>{admin.phone || "N/A"}</td>
                <td>{adminStatus}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/teams/${admin.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>View</button>
                    </Link>
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={admin.id} />
                      <button className={`${styles.button} ${styles.delete}`}>Delete</button>
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

export default TeamsPage;
