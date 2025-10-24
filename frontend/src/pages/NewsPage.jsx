import { useState } from "react";
import axios from "axios";
import DataDisplay from "../components/DataDisplay";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5010/api/v1/news", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNews(response.data.articles);
    } catch (err) {
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = (article, index) => (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        />
      )}
      <h3 style={{ color: "#007bff", marginBottom: "10px" }}>
        {article.title}
      </h3>
      <p style={{ color: "#666", marginBottom: "15px", lineHeight: "1.5" }}>
        {article.description}
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#007bff",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Read more →
      </a>
    </div>
  );

  return (
    <DataDisplay
      data={news}
      loading={loading}
      error={error}
      onFetch={fetchNews}
      buttonText="Fetch News"
      title="Latest News"
      renderItem={renderNewsItem}
      emptyMessage="No news articles available"
    />
  );
};

export default NewsPage;
