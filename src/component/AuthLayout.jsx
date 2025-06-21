import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="auth-wrapper">
            <Outlet /> {/* сюда будет подставляться SignUp, Login */}
        </div>
    );
};

export default AuthLayout;
