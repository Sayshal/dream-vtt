import { getSetting } from './helpers.js';
import { log } from './logger.js';
import { initializeLogLevel, registerSettings } from './settings.js';
import { compendiumBrowserKeybind } from './wisps/compendiumBrowserKeybind.js';
import { customCurrencies } from './wisps/customCurrencies.js';
import { highlightPreparedSpells } from './wisps/highlightPreparedSpells.js';

export class DREAM {
  static initialize() {
    log(3, 'Initializing Module');
    this._registerSettings();
    this._registerHooks();
  }

  static _registerSettings() {
    registerSettings();
    initializeLogLevel();
  }

  static _registerHooks() {
    if (getSetting('enableCompendiumBrowserKeybind')) {
      Hooks.once('init', compendiumBrowserKeybind());
    }

    if (getSetting('enableHighlightPreparedSpells')) {
      Hooks.once('ready', () => highlightPreparedSpells());
    }

    if (getSetting('enableCustomCurrencies')) {
      Hooks.once('init', () => customCurrencies());
    }
  }
}

Hooks.once('init', () => {
  DREAM.initialize();
});
