import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  countryCode: "+91",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhaar: "",
};

function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "First name is required";

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Last name is required";

    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Username is required";

    if ("email" in fieldValues) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!fieldValues.email) temp.email = "Email is required";
      else if (!emailRegex.test(fieldValues.email))
        temp.email = "Enter a valid email";
      else temp.email = "";
    }

    if ("password" in fieldValues) {
      if (!fieldValues.password) temp.password = "Password is required";
      else if (fieldValues.password.length < 6)
        temp.password = "Password must be at least 6 characters";
      else temp.password = "";
    }

    if ("countryCode" in fieldValues)
      temp.countryCode = fieldValues.countryCode ? "" : "Required";

    if ("phone" in fieldValues) {
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!fieldValues.phone) temp.phone = "Phone number is required";
      else if (!phoneRegex.test(fieldValues.phone))
        temp.phone = "Phone must be 7–15 digits";
      else temp.phone = "";
    }

    if ("country" in fieldValues)
      temp.country = fieldValues.country ? "" : "Country is required";

    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "City is required";

    if ("pan" in fieldValues) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
      if (!fieldValues.pan) temp.pan = "PAN is required";
      else if (!panRegex.test(fieldValues.pan)) temp.pan = "Invalid PAN format";
      else temp.pan = "";
    }

    if ("aadhaar" in fieldValues) {
      const aadhaarRegex = /^[0-9]{12}$/;
      if (!fieldValues.aadhaar) temp.aadhaar = "Aadhaar is required";
      else if (!aadhaarRegex.test(fieldValues.aadhaar))
        temp.aadhaar = "Aadhaar must be 12 digits";
      else temp.aadhaar = "";
    }

    setErrors(temp);
  };

  useEffect(() => {
    validate(values);
  }, [values]);

  useEffect(() => {
    const noErrors = Object.values(errors).every((x) => x === "");
    const allFilled = Object.values(values).every((x) => x !== "");
    setIsFormValid(noErrors && allFilled);
  }, [errors, values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    validate(values);

    if (isFormValid)
      navigate("/summary", { state: { formData: values } });
  };

  const renderError = (field) =>
    touched[field] && errors[field] ? (
      <span className="error-text">{errors[field]}</span>
    ) : null;

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Registration Form</h1>

      <form className="form" onSubmit={handleSubmit} noValidate>
        
        <div className="form-control">
          <label>First Name *</label>
          <input
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName && touched.firstName ? "invalid" : ""}
          />
          {renderError("firstName")}
        </div>

        <div className="form-control">
          <label>Last Name *</label>
          <input
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName && touched.lastName ? "invalid" : ""}
          />
          {renderError("lastName")}
        </div>

        <div className="form-control">
          <label>Username *</label>
          <input
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "invalid" : ""}
          />
          {renderError("username")}
        </div>

        <div className="form-control">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "invalid" : ""}
          />
          {renderError("email")}
        </div>

        <div className="form-control">
          <label>Password *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "invalid" : ""}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {renderError("password")}
        </div>

        <div className="form-control">
          <label>Phone Number *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <select
              name="countryCode"
              value={values.countryCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.countryCode && touched.countryCode ? "invalid" : ""
              }
              style={{ width: "35%" }}
            >
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
            </select>

            <input
              name="phone"
              placeholder="Phone Number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone && touched.phone ? "invalid" : ""}
              style={{ flex: 1 }}
            />
          </div>
          {renderError("phone")}
        </div>

        <div className="form-control">
          <label>Country *</label>
          <input
            name="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.country && touched.country ? "invalid" : ""}
          />
          {renderError("country")}
        </div>

        <div className="form-control">
          <label>City *</label>
          <input
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.city && touched.city ? "invalid" : ""}
          />
          {renderError("city")}
        </div>

        <div className="form-control">
          <label>PAN *</label>
          <input
            name="pan"
            value={values.pan}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.pan && touched.pan ? "invalid" : ""}
            placeholder="ABCDE1234F"
          />
          {renderError("pan")}
        </div>

        <div className="form-control">
          <label>Aadhaar *</label>
          <input
            name="aadhaar"
            value={values.aadhaar}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.aadhaar && touched.aadhaar ? "invalid" : ""}
            placeholder="12 digits"
          />
          {renderError("aadhaar")}
        </div>

        <button disabled={!isFormValid} className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
