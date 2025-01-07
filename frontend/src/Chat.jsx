import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// クエリパラメータを取得するためのカスタムフック
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Chat = () => {
  const query = useQuery();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  // クエリパラメータから名前と合言葉を取得
  const name = query.get("name");
  const password = query.get("password");

  const fetchChats = async () => {
    if (!name || !password) {
      setError("名前または合言葉が見つかりませんでした");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat?name=${encodeURIComponent(
          name
        )}&password=${encodeURIComponent(password)}`
      );
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();
      setChats(data);
      setError(null); // エラーが解消された場合にクリア
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [name, password]); // name と password が変わるたびに fetchChats を呼び出す

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Chat Room</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <strong>Username:</strong> {chat.username} <br />
              <strong>Keyword:</strong> {chat.keyword} <br />
              <strong>Content:</strong> {chat.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
