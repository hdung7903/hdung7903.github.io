import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import icon from "../../../constants/icon";

import "../input/input-global.css";

interface EmailInputProps {
  isRequired?: boolean;
  onChange?: (value: string) => void;
  value: string;
}

function EmailInput({ isRequired = false, onChange, value }: EmailInputProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailPattern = /^[a-zA-Z0-9]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (emailPattern.test(newValue)) {
      setError(t("auth.error.invalidEmail"));
    } else {
      setError(null);
    }

    onChange?.(newValue);
  };

  return (
    <div className="email-input-container">
      <Form.Label htmlFor="email-input" className="text-input-label">
        {t("auth.inputLabel.email")}
        {isRequired && <span className="required-asterisk"> *</span>}
      </Form.Label>
      <InputGroup
        className={`text-input ${isFocused ? "focused" : ""} ${
          error ? "error" : ""
        }`}
      >
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className="input-group-text"
        >
          <img
            src={icon.email}
            alt={t("auth.alt.emailIcon")}
            style={{
              filter: isFocused
                ? "invert(58%) sepia(94%) saturate(738%) hue-rotate(1deg) brightness(101%) contrast(101%)"
                : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(0%)",
            }}
          />
        </InputGroup.Text>
        <Form.Control
          id="email-input"
          className="text-input-control"
          type="email"
          value={value}
          onChange={handleEmailChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t("auth.placeholder.email")}
          aria-label={t("auth.inputLabel.email")}
          aria-describedby="email-addon"
          isInvalid={!!error}
          required={isRequired}
        />
      </InputGroup>
      {error && (
        <div className="real-time-error-alert" role="alert">
          <span className="alert-message">{error}</span>
        </div>
      )}
    </div>
  );
}

export default EmailInput;
