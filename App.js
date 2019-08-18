// TODO CLEAR PROJECT
// TODO LANGUAGES
// TODO SCROLLVIEW TOUCH
// TODO УДАЛЕНИЕ ДОСТИЖЕНИЯ
// TODO ADMISSION DATE

// TODO Разобраться что это за бред
require('./plugins/symbol');
require('./plugins/firebase');

import Navigator from "./src/navigator";

import React, { Component } from 'react';
import {
  StatusBar,
  AsyncStorage,
  NativeModules
} from 'react-native';

import i18n from './plugins/i18n';

//TODO make this class as short as possible
export default class Class extends Component {
  constructor(props) {
    super(props);

    this.start();
  }

  //TODO make it short
  async start() {
    i18n.locale = await this.getLocale();
  }

  async getLocale() {
    try {
      const value = await AsyncStorage.getItem('locale');

      if (value !== null) return value;
      else return await this.getDeviceLocale();
    }
    catch (error) {
      console.log(error);
    }
  }

  async getDeviceLocale() {
    try {
      // TODO ADD IOS CURRENT DEVICE LOCALE
      // TODO Do not forget that it comes with en_US, so it should be splited
      // const locale = NativeModules.SettingsManager.settings.AppleLocale
      const locale = NativeModules.I18nManager.localeIdentifier.split('_')[0];

      await AsyncStorage.setItem('locale', locale);

      return locale;
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return [
      <Navigator key="navigator"/>,
      <StatusBar
        key="statusbar"
        barStyle="dark-content"
        backgroundColor="rgb(255, 255, 255)"
      />
    ];
  }
}