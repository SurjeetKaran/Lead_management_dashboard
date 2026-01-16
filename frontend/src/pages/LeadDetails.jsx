import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  const fetchLead = async () => {
    const res = await api.get(`/api/leads/${id}`);
    setLead(res.data);
  };

  useEffect(() => {
    fetchLead();
  }, []);

  if (!lead)
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.loader} />
        <p style={{ margin: 0 }}>Loading lead details...</p>
      </div>
    );

  const initials = lead?.name
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        {/* Top Bar */}
        <div style={styles.topRow}>
          <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>

          <div style={styles.actions}>
            <button
              style={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(lead.email)}
            >
              Copy Email
            </button>
            <button
              style={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(lead.phone)}
            >
              Copy Phone
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div style={styles.headerCard}>
          <div style={styles.avatar}>{initials || "LD"}</div>

          <div style={{ flex: 1 }}>
            <div style={styles.nameRow}>
              <h2 style={styles.name}>{lead.name}</h2>
              <span style={badge(lead.stage)}>{lead.stage}</span>
            </div>

            <p style={styles.sub}>
              {lead.company ? `🏢 ${lead.company}` : "🏢 No company"}
            </p>

            <div style={styles.metaRow}>
              <span style={styles.metaPill}>📌 Source: {lead.source}</span>
              <span style={styles.metaPill}>
                🕒 Created: {new Date(lead.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={styles.grid}>
          <div style={styles.infoCard}>
            <p style={styles.cardTitle}>Contact Information</p>

            <div style={styles.field}>
              <span style={styles.label}>Email</span>
              <span style={styles.value}>{lead.email}</span>
            </div>

            <div style={styles.field}>
              <span style={styles.label}>Phone</span>
              <span style={styles.value}>{lead.phone}</span>
            </div>
          </div>

          <div style={styles.infoCard}>
            <p style={styles.cardTitle}>Lead Details</p>

            <div style={styles.field}>
              <span style={styles.label}>Company</span>
              <span style={styles.value}>{lead.company || "N/A"}</span>
            </div>

            <div style={styles.field}>
              <span style={styles.label}>Stage</span>
              <span style={styles.value}>{lead.stage}</span>
            </div>

            <div style={styles.field}>
              <span style={styles.label}>Source</span>
              <span style={styles.value}>{lead.source}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={styles.notesCard}>
          <p style={styles.cardTitle}>Notes</p>
          <p style={styles.notes}>
            {lead.notes?.trim() ? lead.notes : "No notes available."}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Stage badge */
const badge = (stage) => ({
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 700,
  color: "white",
  background:
    stage === "Converted"
      ? "green"
      : stage === "Lost"
      ? "#e11d48"
      : stage === "Qualified"
      ? "#7c3aed"
      : stage === "Contacted"
      ? "#f59e0b"
      : "#243B55",
});

const styles = {
  page: { minHeight: "100vh", background: "#f5f7fb" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "20px" },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "14px",
  },

  backBtn: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #dbe4f0",
    cursor: "pointer",
    background: "white",
    color: "#243B55",
    fontWeight: 700,
  },

  actions: { display: "flex", gap: "10px", flexWrap: "wrap" },
  copyBtn: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#243B55",
    color: "white",
    fontWeight: 700,
  },

  headerCard: {
    display: "flex",
    gap: "16px",
    padding: "18px",
    borderRadius: "16px",
    background: "white",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    alignItems: "center",
  },

  avatar: {
    width: "62px",
    height: "62px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #141E30, #243B55)",
    color: "white",
    fontWeight: 900,
    fontSize: "20px",
  },

  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  name: { margin: 0, color: "#111", fontSize: "24px" },

  sub: { margin: "6px 0 0", color: "#555", fontSize: "14px" },

  metaRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  metaPill: {
    fontSize: "13px",
    background: "#eef4ff",
    padding: "8px 10px",
    borderRadius: "999px",
    color: "#243B55",
    border: "1px solid #dbeafe",
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "14px",
    marginTop: "16px",
  },

  infoCard: {
    background: "white",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },

  notesCard: {
    marginTop: "14px",
    background: "white",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    margin: "0 0 12px",
    color: "#243B55",
    fontWeight: 800,
    fontSize: "16px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "10px 0",
    borderBottom: "1px solid #f0f2f5",
  },

  label: { fontSize: "13px", color: "#777", fontWeight: 700 },
  value: { fontSize: "15px", color: "#111", fontWeight: 700 },

  notes: {
    margin: 0,
    fontSize: "14px",
    color: "#333",
    lineHeight: 1.6,
    background: "#f7fafc",
    border: "1px solid #e5e7eb",
    padding: "12px",
    borderRadius: "12px",
  },

  loadingWrap: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
    gap: "12px",
    fontWeight: 700,
    color: "#243B55",
  },
  loader: {
    width: "42px",
    height: "42px",
    borderRadius: "999px",
    border: "5px solid #cfe0ff",
    borderTop: "5px solid #243B55",
    animation: "spin 1s linear infinite",
  },
};
