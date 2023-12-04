import { Link } from 'react-router-dom';
import { RouteList } from '../../routes/routes';
import { useTranslation } from 'react-i18next';

function BackToHome() {
  const { t } = useTranslation();
  return (
    <Link
      to={RouteList.login}
      className="hover:text-blue-400 flex text-xl font-semibold item-center justify-center mt-8 "
    >
      <div className={'mr-2'}>← </div>
      <div>{t('backToLogin')}</div>
    </Link>
  );
}

export default BackToHome;
