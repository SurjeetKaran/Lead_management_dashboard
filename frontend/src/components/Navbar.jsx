import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <h2 style={{ margin: 0, color: "white" }}>Lead Dashboard</h2>
      </div>

      <div style={styles.right}>
        <span style={styles.user}>{user?.email}</span>
        <button style={styles.btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    padding: "12px 18px",
    background: "#243B55",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },
  left: {},
  right: { display: "flex", gap: "10px", alignItems: "center" },
  user: { color: "#eaeaea", fontSize: "14px" },
  btn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "white",
    fontWeight: "bold",
  },
};
