import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='text-2xl font-bold text-gray-800 dark:text-white'>
          <Link to='/'>GoalSetter</Link>
        </div>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <button
                onClick={toggleTheme}
                className='text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </li>
            {user ? (
              <li>
                <button
                  onClick={onLogout}
                  className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                >
                  <FaSignOutAlt className='mr-2' /> Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to='/login'
                    className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  >
                    <FaSignInAlt className='mr-2' /> Login
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register'
                    className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  >
                    <FaUser className='mr-2' /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
