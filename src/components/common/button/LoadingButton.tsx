import { Button, Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/loadingSlice';

interface LoadingButtonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => Promise<void> | void;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: string;
}

const LoadingButton = ({
    children,
    className,
    style,
    onClick,
    isLoading = false,
    disabled = false,
    variant = "primary"
}: LoadingButtonProps) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if (onClick) {
            dispatch(setLoading(true));
            try {
                await onClick();
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const spinnerStyle: React.CSSProperties = {
        marginRight: '8px',
        width: '1rem',
        height: '1rem'
    };

    return (
        <Button
            variant={variant}
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
            onClick={handleClick}
            disabled={isLoading || disabled}
        >
            {isLoading && (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={spinnerStyle}
                />
            )}
            {children}
        </Button>
    );
};

export default LoadingButton;