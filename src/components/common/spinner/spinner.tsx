import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector } from '../../../redux/hooks';

const SpinnerComponent = (): JSX.Element | null => {
    const isLoading = useAppSelector((state) => state.loading.isLoading);

    if (!isLoading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(56, 55, 55, 0.8)',
                zIndex: 9999
            }}
        >
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default SpinnerComponent;