import { Outlet } from 'react-router-dom';

const TestLayouts: React.FC = () => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__content">
                <Outlet />
            </div>
        </div>
    );
};

export default TestLayouts;