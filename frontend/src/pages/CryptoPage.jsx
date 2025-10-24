import { useState } from "react";
import axios from "axios";
import DataDisplay from "../components/DataDisplay";

const CryptoPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCryptoData = async () => {
    setLoading(true);
    setError("");
    try {
      // You can replace this with your actual crypto API endpoint
      const response = await axios.get("http://localhost:5010/api/v1/crypto", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCryptoData(response.data);
    } catch (err) {
      setError("Failed to fetch crypto data.");
    } finally {
      setLoading(false);
    }
  };

  const renderCryptoItem = (crypto, index) => (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "15px",
        backgroundColor: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ color: "#28a745", marginBottom: "5px" }}>
            {crypto.name || crypto.symbol || `Crypto ${index + 1}`}
          </h3>
          <p style={{ color: "#666", margin: "0" }}>{crypto.symbol || "N/A"}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#28a745",
              margin: "0",
            }}
          >
            ${crypto.price || crypto.current_price || "N/A"}
          </p>
          <p
            style={{
              color: crypto.change_24h >= 0 ? "#28a745" : "#dc3545",
              margin: "0",
              fontSize: "14px",
            }}
          >
            {crypto.change_24h >= 0 ? "+" : ""}
            {crypto.change_24h || crypto.price_change_percentage_24h || "N/A"}%
          </p>
        </div>
      </div>
      {crypto.market_cap && (
        <div
          style={{
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px solid #eee",
          }}
        >
          <p style={{ color: "#666", margin: "0", fontSize: "14px" }}>
            Market Cap: ${crypto.market_cap?.toLocaleString() || "N/A"}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <DataDisplay
      data={cryptoData}
      loading={loading}
      error={error}
      onFetch={fetchCryptoData}
      buttonText="Fetch Crypto Data"
      title="Cryptocurrency Market"
      renderItem={renderCryptoItem}
      emptyMessage="No crypto data available"
    />
  );
};

export default CryptoPage;
