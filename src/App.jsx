import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserSearch from "./pages/UserSearch";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";

import NavBar from "./components/NavBar";
import AuthRequiredModal from "./components/AuthRequiredModal";

import { useState } from "react";

import "./css/App.css";

function App() {
  const [authModal, setAuthModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  return (
    <AuthProvider>
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/users/search" element={<UserSearch />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <AuthRequiredModal
        isOpen={authModal.open}
        onClose={() =>
          setAuthModal({
            open: false,
            title: "",
            message: "",
          })
        }
        title={authModal.title}
        message={authModal.message}
      />
    </AuthProvider>
  );
}

export default App;