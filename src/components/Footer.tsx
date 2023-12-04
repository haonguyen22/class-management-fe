import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-4" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            {t('copyright')}
          </span>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t('about')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t('policy')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t('licensing')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t('contact')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
