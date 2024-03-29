/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import i18n from '../i18n';

const defaultLocale = {
  locale: i18n.language,
  setLocale: (_: string) => {},
};

export default createContext(defaultLocale);
