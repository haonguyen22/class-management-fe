import { useContext } from 'react';
import localeContext from '../../context/localeContext';
import i18n from '../../i18n';

function Header() {
  const { locale } = useContext(localeContext);

  return (
    <div>
      <select
        value={locale}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="vi">Vietnamese</option>
      </select>
    </div>
  );
}

export default Header;
