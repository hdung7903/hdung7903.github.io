import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { CustomLinkProps } from '../../../types/data.interfaces';

const LoadingLink = ({ to, children, className, style }: CustomLinkProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(setLoading(true));

        setTimeout(() => {
            navigate(to);
            dispatch(setLoading(false));
        }, 1000);
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            className={`${className ?? ''} text-decoration-none`}
            style={{ ...style, cursor: 'pointer', width: '100%' }}
        >
            {children}
        </Link>
    );
};

export default LoadingLink;