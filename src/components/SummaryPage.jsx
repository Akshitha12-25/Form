import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.formData;

  if (!data)
    return (
      <div className="form-wrapper">
        <h1>No Data Found</h1>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );

  return (
    <div className="form-wrapper">
      <h1>Submitted Details</h1>

      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default SummaryPage;
