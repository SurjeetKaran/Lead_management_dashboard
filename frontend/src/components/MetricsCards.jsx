export default function MetricsCards({ metrics }) {
  const total = metrics?.totalLeads || 0;
  const converted = metrics?.convertedLeads || 0;
  const conversionRate = total ? ((converted / total) * 100).toFixed(1) : 0;

  return (
    <div style={styles.grid}>
      <div style={styles.card}>
        <p style={styles.label}>Total Leads</p>
        <h2 style={styles.value}>{total}</h2>
      </div>

      <div style={styles.card}>
        <p style={styles.label}>Converted Leads</p>
        <h2 style={styles.value}>{converted}</h2>
      </div>

      <div style={styles.card}>
        <p style={styles.label}>Conversion Rate</p>
        <h2 style={styles.value}>{conversionRate}%</h2>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
    marginTop: "18px",
  },
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  label: { margin: 0, fontSize: "14px", color: "#666" },
  value: { margin: "10px 0 0", fontSize: "28px", color: "#243B55" },
};
