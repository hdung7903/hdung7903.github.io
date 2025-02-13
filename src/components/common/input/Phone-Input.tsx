import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import "../input/input-global.css";

interface PhoneInputProps {
  isRequired?: boolean;
  value: string;
  onChange?: (value: string) => void;
}

function PhoneInput({ isRequired, value, onChange }: PhoneInputProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);

    const phonePattern = /^[0-9]{7,15}$/;
    if (!phonePattern.test(value)) {
      setError(t("auth.error.invalidPhone"));
    } else {
      setError(null);
    }
  };

  return (
    <div className="phone-input-container">
      <Form.Label htmlFor="phone-input" className="text-input-label">
        {t("auth.inputLabel.phone")}
      </Form.Label>
      {isRequired && <span className="required-asterisk"> *</span>}
      <InputGroup
        className={`text-input ${isFocused ? "focused" : ""} ${
          error ? "error" : ""
        }`}
      >
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className={`input-group-text ${isFocused ? "focused" : ""}`}
        >
          <FontAwesomeIcon
            icon={faPhone}
            style={{
              color: isFocused ? "#fac211" : "#6c757d",
              transition: "color 0.3s",
            }}
          />
        </InputGroup.Text>
        <Form.Control
          className={`text-input-control ${error ? "is-invalid" : ""}`}
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t("auth.placeholder.phone")}
          aria-label={t("auth.inputLabel.phone")}
          aria-describedby="basic-addon1"
          required={isRequired}
        />
      </InputGroup>
      {error && (
        <div className="real-time-error-alert">
          <span className="alert-message">{error}</span>
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
