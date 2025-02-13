import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "../input/input-global.css";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: IconDefinition;
  isRequired?: boolean;
  value: string;
  onChange?: (value: string) => void;
}

function TextInput({
  label,
  placeholder,
  type = "text",
  icon,
  isRequired,
  value,
  onChange,
}: TextInputProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <>
      <Form.Label htmlFor="text-input" className="text-input-label">
        {t(label)}
        {isRequired && <span className="required-asterisk"> *</span>}
      </Form.Label>
      <InputGroup className={`text-input ${isFocused ? "focused" : ""}`}>
        {icon && (
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className={`input-group-text ${isFocused ? "focused" : ""}`}
          >
            <FontAwesomeIcon
              icon={icon}
              style={{
                color: isFocused ? "#fac211" : "#6c757d",
                transition: "color 0.3s",
              }}
            />
          </InputGroup.Text>
        )}
        <Form.Control
          className="text-input-control"
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t(placeholder)}
          aria-label={t(label)}
          aria-describedby="basic-addon1"
          required={isRequired}
        />
      </InputGroup>
    </>
  );
}

export default TextInput;
