import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../routes/routes';

function Logo() {
  const isAuthenticate = useIsAuthenticated();
  const navigate = useNavigate();

  const handleClickHome = () => {
    if (isAuthenticate()) navigate(RouteList.home);
    else navigate(RouteList.login);
  };
  return (
    <button onClick={handleClickHome} className="flex items-center">
      <img
        src={'/images/logo.png'}
        className={'mr-3 h-6 sm:h-9'}
        alt={'Flowbite Logo'}
      />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ">
        Classroom
      </span>
    </button>
  );
}

export default Logo;
