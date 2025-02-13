import { Outlet, Navigate } from 'react-router-dom';
import HeaderComponent from '../../components/layout/header/Header';
import FooterComponent from '../../components/layout/footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProtectedLayouts: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);

    // if (!auth.user) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div className="auth-layout">
            <HeaderComponent />
            <div className="auth-layout__content">
                <Outlet />
            </div>
            <FooterComponent />
        </div>
    );
};

export default ProtectedLayouts;