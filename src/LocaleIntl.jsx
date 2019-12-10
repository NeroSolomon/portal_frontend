import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { changeLanguage } from './actions/language.js';

class LocaleIntl extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      language: { locale },
      dispatch
    } = this.props;
    dispatch(changeLanguage(locale))
  }

  render() {
    const {
      language,
      language: { locale, isFetching }
    } = this.props;
    let result = null;
    if (isFetching && !language[locale]) {
      // loading language resource
      result = (
        <div className="m-loading">
          loading
        </div>
      );
    } else {
      // show content
      const appLocale = language[locale];
      addLocaleData(appLocale.data);

      result = (
        <IntlProvider locale={appLocale.locale} messages={appLocale.msg}>
          {this.props.children}
        </IntlProvider>
      );
    }

    return result;
  }
}

function mapStateToProps(state) {
  const { language } = state;
  return {
    language
  };
}

export default connect(mapStateToProps)(LocaleIntl);
