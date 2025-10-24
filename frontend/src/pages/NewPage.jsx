import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", plan: "free" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5010/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updatePlan = async () => {
    setLoading(true);
    try {
      const newPlan = user.plan === "free" ? "pro" : "free";
      await axios.patch(
        "http://localhost:5010/auth/plan",
        { plan: newPlan },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser({ ...user, plan: newPlan });
    } catch (error) {
      console.error("Error updating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const dashboardItems = [
    {
      title: "News",
      description: "Fetch and view latest news articles",
      buttonText: "View News",
      route: "/news",
      color: "#007bff",
    },
    {
      title: "Crypto Data",
      description: "View cryptocurrency market data",
      buttonText: "View Crypto",
      route: "/crypto",
      color: "#28a745",
    },
  ];

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px 20px",
          borderBottom: "1px solid #dee2e6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "500", color: "#007bff" }}>
          Welcome, {user.name}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={updatePlan}
            disabled={loading}
            style={{
              backgroundColor: user.plan === "pro" ? "#28a745" : "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {loading ? "Updating..." : `Plan: ${user.plan.toUpperCase()}`}
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#007bff",
          }}
        >
          Data Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "30px",
                textAlign: "center",
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate(item.route)}
            >
              <h2 style={{ color: item.color, marginBottom: "15px" }}>
                {item.title}
              </h2>
              <p
                style={{
                  color: "#666",
                  marginBottom: "25px",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>
              <button
                style={{
                  backgroundColor: item.color,
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor =
                    item.color === "#007bff" ? "#0056b3" : "#1e7e34";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = item.color;
                }}
              >
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
