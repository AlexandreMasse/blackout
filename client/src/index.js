import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import MobileApp from './mobile/components/MobileApp';
import DesktopApp from './desktop/components/DesktopApp';
import * as serviceWorker from './serviceWorker';
import { isXs, isMobile } from './utils';
import { IntlProvider, addLocaleData } from 'react-intl';
import {} from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_fr from 'react-intl/locale-data/fr';
import messages_fr from './desktop/translations/fr.json';
import messages_en from './desktop/translations/en.json';

import mobile_messages_fr from './mobile/translations/fr.json';
import mobile_messages_en from './mobile/translations/en.json';

addLocaleData([...locale_en, ...locale_fr]);
const messages = {
  fr: messages_fr,
  en: messages_en
};

const mobileMessages = {
  fr: mobile_messages_fr,
  en: mobile_messages_en
};

const language = navigator.language.split(/[-_]/)[0]; // language without region code

const urlParams = new URLSearchParams(window.location.search)
const langParam = urlParams.get('lang')

const App =
  isXs() && isMobile() ? (
    <IntlProvider locale={langParam || language} messages={mobileMessages[langParam || language]}>
      <MobileApp />
    </IntlProvider>
  ) : (
    <IntlProvider locale={langParam || language} messages={messages[langParam || language]}>
      <DesktopApp />
    </IntlProvider>
  );

ReactDOM.render(App, document.getElementById('root'));

serviceWorker.unregister();
