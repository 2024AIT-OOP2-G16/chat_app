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
      const parsedMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, parsedMessage]);
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
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Chat Room</h1>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!error && (
          <div>
            {chats.map((chat) => (
              <div key={chat.id}>
                <div>Username:{chat.username} </div>
                <div>Content: {chat.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div>Username: {msg.username}</div>
            <div>Content: {msg.content}</div>
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
