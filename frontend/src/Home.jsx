import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim inputs to avoid unnecessary spaces
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (trimmedName && trimmedPassword) {
      // If both inputs are valid, navigate to Chat page with query parameters
      navigate(
        `/chat?name=${encodeURIComponent(
          trimmedName
        )}&password=${encodeURIComponent(trimmedPassword)}`
      );
    } else {
      // Show error message
      setMessage("名前と合言葉を入力してください");
    }
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>名前と合言葉を入力してください</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">名前:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">合言葉:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "none",
            background: "#007BFF",
            color: "white",
          }}
        >
          送信
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "20px",
            color: message.includes("入力してください") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};
