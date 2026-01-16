import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import MetricsCards from "../components/MetricsCards";
import LeadsTable from "../components/LeadsTable";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [source, setSource] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMetrics = async () => {
    const res = await api.get("/api/leads/metrics");
    setMetrics(res.data);
  };

  const fetchLeads = async () => {
    const res = await api.get("/api/leads", {
      params: { search, stage, source, page, limit, sortBy: "createdAt", sortOrder: "desc" },
    });

    setLeads(res.data.data);
    setTotalPages(res.data.meta.totalPages);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [search, stage, source, page]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, stage, source]);

  return (
    <div style={styles.wrapper}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Dashboard Overview</h2>

        <MetricsCards metrics={metrics} />

        {/* Filters */}
        <div style={styles.filters}>
          <input
            style={styles.input}
            placeholder="Search by name/email/phone/company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select style={styles.select} value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>

          <select style={styles.select} value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Ads">Ads</option>
            <option value="Cold Email">Cold Email</option>
            <option value="Other">Other</option>
          </select>

          <button
            style={styles.clearBtn}
            onClick={() => {
              setSearch("");
              setStage("");
              setSource("");
            }}
          >
            Clear
          </button>
        </div>

        <LeadsTable leads={leads} />

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", background: "#f5f7fb" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
  heading: { marginTop: "10px", color: "#243B55" },

  filters: {
    marginTop: "18px",
    display: "grid",
    gridTemplateColumns: "1fr 200px 200px 120px",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  clearBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "white",
    fontWeight: "bold",
  },
};
