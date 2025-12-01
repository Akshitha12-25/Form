import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import SummaryPage from "./components/SummaryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
