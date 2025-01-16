import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.css";

// クエリパラメータを取得するためのカスタムフック
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Chat = () => {
  const query = useQuery();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  //メッセージを入力する関数
  const [input, setInput] = useState("");
  //メッセージを受け取る関数
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  // クエリパラメータから名前と合言葉を取得
  const name = query.get("name");
  const roomId = query.get("roomId");

  const fetchChats = async () => {
    if (!name || !roomId) {
      setError("名前または合言葉が見つかりませんでした");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat?name=${encodeURIComponent(
          name
        )}&password=${encodeURIComponent(roomId)}`
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
    const URL = `ws://127.0.0.1:8000/ws/${roomId}`;
    //webSocketでの受け取り
    ws.current = new WebSocket(URL);
    //メッセージの取得
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [name, roomId]); // name と password が変わるたびに fetchChats を呼び出す

  //メッセージの送る関数
  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // JSONデータを作成して送信
      const message = {
        username: name, // ユーザー名を追加
        content: input, // 入力されたメッセージ
      };
      ws.current.send(JSON.stringify(message)); // JSON文字列に変換して送信
      setInput(""); //メッセージを空にする
    } else {
      console.error("WebSocket connection is not open");
    }
  };
  return (
    <>
    <link href="https://fonts.googleapis.com/earlyaccess/kokoro.css" rel="stylesheet"></link>
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
      <h1>メッセージの表示</h1>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </>
  );
};
