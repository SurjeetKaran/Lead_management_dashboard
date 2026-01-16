export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div style={styles.wrapper}>
      <button
        style={styles.btn}
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </button>

      <span style={styles.info}>
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        style={styles.btn}
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    margin: "15px 0",
    flexWrap: "wrap",
  },
  btn: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#243B55",
    color: "white",
    fontWeight: "bold",
  },
  info: { fontSize: "14px" },
};
