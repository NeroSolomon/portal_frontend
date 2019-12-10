import cookie from 'js-cookie';
import {
  LANGUAGE_REQUEST,
  LANGUAGE_SUCCESS,
  LANGUAGE_FAILURE,
  LANGUAGE_REUSE
} from './../constants/action-type.js';

function requestLanguage() {
  return {
    type: LANGUAGE_REQUEST
  };
}

function receiveLanguage(appLocale) {
  const { key } = appLocale;
  let { hostname } = window.location;
  if (-1 < hostname.lastIndexOf('.')) {
    // get main domain
    hostname = hostname.substring(
      hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1)
    );
  }
  cookie.set('language', key, { expires: 365, domain: hostname });

  return {
    type: LANGUAGE_SUCCESS,
    locale: key,
    data: appLocale
  };
}

function rejectLanguage(error) {
  return {
    type: LANGUAGE_FAILURE,
    error
  };
}

function reuseLanguage(appLocale) {
  const { key } = appLocale;
  let { hostname } = window.location;
  if (-1 < hostname.lastIndexOf('.')) {
    // get main domain
    hostname = hostname.substring(
      hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1)
    );
  }
  cookie.set('language', key, { expires: 365, domain: hostname });

  return {
    type: LANGUAGE_REUSE,
    locale: key,
    data: appLocale
  };
}

export function changeLanguage(key) {
  return (dispatch, getState) => {
    const {
      language
    } = getState();
    const appLocale = language[key];
    if (appLocale) {
      // has loaded resource
      dispatch(reuseLanguage(appLocale));
    } else {
      dispatch(requestLanguage());

      if ('cn' == key) {
        require.ensure(
          [],
          () => {
            const appLocale = require('../locales/cn.js').default;
            dispatch(receiveLanguage(appLocale));
          },
          error => {
            dispatch(rejectLanguage(error));
          },
          'locale-cn'
        );
      } else {
        // default
        require.ensure(
          [],
          () => {
            const appLocale = require('../locales/en.js').default;
            dispatch(receiveLanguage(appLocale));
          },
          error => {
            dispatch(rejectLanguage(error));
          },
          'locale-en'
        );
      }
    }
  };
}
