import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import UserSearch from "./pages/UserSearch";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import NavBar from "./components/NavBar";
import AuthRequiredModal from "./components/AuthRequiredModal";
import { useState } from "react";
import "./css/App.css";

function App() {
  const [authModal, setAuthModal] = useState({ open: false, title: "", message: "" });

  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/users/search" element={<UserSearch />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <AuthRequiredModal
          isOpen={authModal.open}
          onClose={() => setAuthModal({ open: false, title: "", message: "" })}
          title={authModal.title}
          message={authModal.message}
        />
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;