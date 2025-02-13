import { MouseEventHandler } from "react";
import { Button, Spinner } from "react-bootstrap";

import "./custom-button.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  color?: string;
  title?: string;
  icon?: string;
  iconWidth?: string;
  iconHeight?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  marginTop?: string;
  onClick?: MouseEventHandler | undefined;
  isLoading?: boolean;
}

function CustomButton({
  type = "button",
  width,
  height,
  color,
  title,
  icon,
  border,
  borderRadius,
  marginTop,
  backgroundColor,
  iconWidth = "24px",
  iconHeight = "24px",
  isLoading = false,
  onClick,
}: ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    width: width || "100%",
    height: height || "48px",
    backgroundColor: backgroundColor || "#001568",
    color: color || "#ffffff",
    fontWeight: 600,
    marginTop: icon ? "0" : marginTop,
    border: border || "none",
    borderRadius: borderRadius || "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle: React.CSSProperties = {
    width: iconWidth,
    height: iconHeight,
    marginRight: "12px",
  };

  const spinnerStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
  };

  return (
    <Button
      type={type || "button"}
      onClick={onClick}
      style={buttonStyle}
      variant="primary"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={spinnerStyle}
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <img src={icon} alt="icon" style={iconStyle} />}
          {title ?? "Click Me"}
        </>
      )}
    </Button>
  );
}

export default CustomButton;
