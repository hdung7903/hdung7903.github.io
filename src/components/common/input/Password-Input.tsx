import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import icon from "../../../constants/icon";

import "../input/input-global.css";

interface PasswordInputProps {
  isRequired?: boolean;
  onChange?: (value: string) => void;
  value: string;
}

function PasswordInput({
  isRequired = false,
  onChange,
  value,
}: PasswordInputProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string): string[] => {
    const validationErrors: string[] = [];

    // Only show errors if there's any input
    if (password.length > 0) {
      if (password.length < 8) {
        validationErrors.push(t("auth.error.passwordLength"));
      }
      if (!/[A-Z]/.test(password)) {
        validationErrors.push(t("auth.error.passwordUppercase"));
      }
      if (!/[0-9]/.test(password)) {
        validationErrors.push(t("auth.error.passwordNumber"));
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        validationErrors.push(t("auth.error.passwordSpecial"));
      }
    }

    return validationErrors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newErrors = validatePassword(newValue);
    setErrors(newErrors);
    onChange?.(newValue);
  };

  return (
    <div className="password-input-container">
      <Form.Label htmlFor="password-input" className="text-input-label">
        {t("auth.inputLabel.password")}
        {isRequired && <span className="required-asterisk"> *</span>}
      </Form.Label>
      <InputGroup
        className={`text-input ${isFocused ? "focused" : ""} ${errors.length > 0 ? "error" : ""
          }`}
      >
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className="input-group-text"
        >
          <img
            src={icon.lock}
            alt={t("auth.alt.passwordIcon")}
            style={{
              filter: isFocused
                ? "invert(58%) sepia(94%) saturate(738%) hue-rotate(1deg) brightness(101%) contrast(101%)"
                : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(0%)",
            }}
          />
        </InputGroup.Text>
        <Form.Control
          id="password-input"
          className="text-input-control"
          type="password"
          value={value}
          onChange={handlePasswordChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t("auth.placeholder.password")}
          aria-label={t("auth.inputLabel.password")}
          isInvalid={errors.length > 0}
          required={isRequired}
        />
      </InputGroup>
      {errors.length > 0 && (
        <div className="real-time-error-alert">
          {errors.map((error, index) => (
            <span key={index} className="alert-message" role="alert">
              {error}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;