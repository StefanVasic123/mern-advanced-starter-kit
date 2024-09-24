import { useState } from 'react';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
  FaLanguage,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, changeLanguage, translations } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='text-2xl font-bold text-gray-800 dark:text-white'>
          <Link to='/'>{translations.goalSetter}</Link>
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
            <li className='relative'>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className='text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center'
              >
                <FaLanguage className='mr-1' /> {language.toUpperCase()}
              </button>
              {showLanguageMenu && (
                <div className='absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-xl z-20'>
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        changeLanguage(option.code);
                        setShowLanguageMenu(false);
                      }}
                      className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left'
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
            {user ? (
              <li>
                <button
                  onClick={onLogout}
                  className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                >
                  <FaSignOutAlt className='mr-2' /> {translations.logout}
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to='/login'
                    className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  >
                    <FaSignInAlt className='mr-2' /> {translations.login}
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register'
                    className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  >
                    <FaUser className='mr-2' /> {translations.register}
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
