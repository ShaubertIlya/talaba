import i18n from 'i18n-js';

import ru from '../locales/ru.json';
import en from '../locales/en.json';

i18n.defaultLocale = 'ru';
i18n.locale = 'ru';
i18n.fallbacks = true;
i18n.translations = { ru, en };

export default i18n;