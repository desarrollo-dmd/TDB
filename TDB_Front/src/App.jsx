import { useState } from "react";
import { Layout } from "./components/Layout/Layout.jsx";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {/* Renderiza el Navbar solo si no estamos en la página de Login */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/"element={<Layout/>}  />
      </Routes>
    </div>
  );
};
function App() {
  return (
      <Router>
        <AppContent />
      </Router>
  );
}

export default App;
