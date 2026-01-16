import { useNavigate } from "react-router-dom";

export default function LeadsTable({ leads }) {
  const navigate = useNavigate();

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.trHead}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Company</th>
            <th style={styles.th}>Source</th>
            <th style={styles.th}>Stage</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} style={styles.tr}>
              <td style={styles.td}>{lead.name}</td>
              <td style={styles.td}>{lead.email}</td>
              <td style={styles.td}>{lead.company}</td>
              <td style={styles.td}>{lead.source}</td>
              <td style={styles.td}>
                <span style={badge(lead.stage)}>{lead.stage}</span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.viewBtn}
                  onClick={() => navigate(`/lead/${lead._id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && (
        <p style={{ textAlign: "center", padding: "15px" }}>No leads found.</p>
      )}
    </div>
  );
}

const badge = (stage) => ({
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "13px",
  color: "white",
  background:
    stage === "Converted"
      ? "green"
      : stage === "Lost"
      ? "red"
      : stage === "Qualified"
      ? "#8a2be2"
      : stage === "Contacted"
      ? "#ff8c00"
      : "#243B55",
});

const styles = {
  tableWrap: {
    overflowX: "auto",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginTop: "14px",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "800px" },
  trHead: { background: "#243B55" },
  th: { color: "white", textAlign: "left", padding: "12px" },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "12px", fontSize: "14px" },
  viewBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#243B55",
    color: "white",
  },
};
