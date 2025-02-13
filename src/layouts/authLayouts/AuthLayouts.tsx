import { Outlet } from 'react-router-dom';

const AuthLayouts: React.FC = () => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__content">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayouts;