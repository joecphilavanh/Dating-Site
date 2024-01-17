import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate('/matches');
        return null;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg bg-white shadow-md text-center">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Welcome to Our Dating App</h2>
                <Link to="/login" className="block w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2">
                    Login
                </Link>
                <Link to="/register" className="block w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 mt-2">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
