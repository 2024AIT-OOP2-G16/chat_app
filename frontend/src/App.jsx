import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Chat } from "./Chat";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
