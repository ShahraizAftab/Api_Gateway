import React from "react";
import { useNavigate } from "react-router-dom";

const DataDisplay = ({
  data,
  loading,
  error,
  onFetch,
  buttonText = "Fetch Data",
  title = "My Data",
  renderItem,
  emptyMessage = "No data available",
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "15px",
            }}
          >
            ← Back
          </button>
        )}
        <h1 style={{ margin: 0 }}>{title}</h1>
      </div>

      <button
        onClick={onFetch}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {data && data.length > 0
          ? data.map((item, index) => (
              <div key={index}>
                {renderItem ? (
                  renderItem(item, index)
                ) : (
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))
          : !loading && <p>{emptyMessage}</p>}
      </div>
    </div>
  );
};

export default DataDisplay;
