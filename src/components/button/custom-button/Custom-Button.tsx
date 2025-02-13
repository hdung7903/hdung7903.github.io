import { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';

interface ButtonProps {
    width?: string;
    height?: string;
    color?: string;
    title?: string;
    icon?: string;
    iconWidth?: string;
    iconHeight?: string;
    backgroundColor?: string;
    border?: string;
    marginTop?: string;
    onClick?: MouseEventHandler | undefined;
}

function CustomButton({
    width,
    height,
    color,
    title,
    icon,
    border,
    marginTop,
    backgroundColor,
    iconWidth = '24px',
    iconHeight = '24px',
    onClick,
}: ButtonProps) {
    const buttonStyle: React.CSSProperties = {
        width: width || '100%',
        height: height || '48px',
        backgroundColor: backgroundColor || '#001568',
        color: color || '#ffffff',
        fontWeight: 600,
        marginTop: icon ? '0' : marginTop,
        border: border || 'none',
    };

    const iconStyle: React.CSSProperties = {
        width: iconWidth,
        height: iconHeight,
        marginRight: '12px',
    };

    return (
        <Button onClick={onClick} style={buttonStyle} variant="primary">
            {icon && <img src={icon} alt="icon" style={iconStyle} />}
            {title || 'Click Me'}
        </Button>
    );
}

export default CustomButton;
