import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastProps {
    status: 'success' | 'error' | 'warning';
    message: string;
    show: boolean;
    onClose: () => void;
}

const ToastComponent = ({ status, message, show, onClose }: ToastProps): JSX.Element => {

    const getIcon = (status: string): string => {
        switch (status) {
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            case 'success':
                return '✅';
            default:
                return '';
        }
    };


    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
            <Toast
                show={show}
                onClose={onClose}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">
                        {getIcon(status)} {status.charAt(0).toUpperCase() + status.slice(1)}
                    </strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastComponent;