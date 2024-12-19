// src/App.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && password) {
      setMessage(`名前: ${name}, 合言葉: ${password}`);
      navigate(`/chat?name=${name}&password=${password}`);
    } else {
      setMessage("名前と合言葉を入力してください");
    }
  };

  return (
    <div>
      <h1>名前と合言葉</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>合言葉:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">送信</button>
      </form>
      <p>{message}</p>
    </div>
  );
};
