import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return <div>{t('Footer')}</div>;
}

export default Footer;
