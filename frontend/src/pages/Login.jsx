import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  // ✅ No prefilled credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <form onSubmit={handleLogin} style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.logo}>LD</div>
          <div>
            <h2 style={styles.heading}>Lead Dashboard</h2>
            <p style={styles.subHeading}>Sign in to manage your leads</p>
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
          />
        </div>

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={styles.demoBox}>
          <p style={styles.demoTitle}>Demo Credentials</p>
          <p style={styles.demoText}>
            Email: <b>admin@gmail.com</b>
          </p>
          <p style={styles.demoText}>
            Password: <b>admin123</b>
          </p>
        </div>

        <p style={styles.footer}>Mini CRM • Lead Management Dashboard</p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "20px",
  },

  blob1: {
    position: "absolute",
    width: "420px",
    height: "420px",
    background: "rgba(59,130,246,0.25)",
    filter: "blur(60px)",
    top: "-100px",
    left: "-120px",
    borderRadius: "50%",
  },
  blob2: {
    position: "absolute",
    width: "460px",
    height: "460px",
    background: "rgba(168,85,247,0.25)",
    filter: "blur(70px)",
    bottom: "-140px",
    right: "-160px",
    borderRadius: "50%",
  },

  card: {
    width: "420px",
    padding: "26px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.96)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "relative",
    zIndex: 10,
  },

  brand: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "6px",
  },

  logo: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 900,
    color: "white",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    boxShadow: "0 6px 18px rgba(37,99,235,0.35)",
  },

  heading: {
    margin: 0,
    fontSize: "22px",
    color: "#0f172a",
    fontWeight: 900,
  },

  subHeading: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#475569",
    fontWeight: 600,
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    color: "#334155",
    fontWeight: 700,
  },

  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    fontSize: "15px",
    fontWeight: 900,
    marginTop: "6px",
    boxShadow: "0 10px 22px rgba(37,99,235,0.25)",
    opacity: 1,
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px 12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 700,
    margin: 0,
  },

  demoBox: {
    marginTop: "4px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "12px",
    borderRadius: "14px",
  },

  demoTitle: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 900,
    color: "#0f172a",
  },

  demoText: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#334155",
    fontWeight: 600,
  },

  footer: {
    margin: "8px 0 0",
    textAlign: "center",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 700,
  },
};
