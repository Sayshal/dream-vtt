import { CONSTS } from './constants.js';
import { getSetting } from './helpers.js';
import { log } from './logger.js';

export function registerSettings() {
  game.settings.register(CONSTS.ID, 'logLevel', {
    name: 'DREAM.Settings.LogLevel.Name',
    hint: 'DREAM.Settings.LogLevel.Hint',
    scope: 'client',
    config: true,
    type: Number,
    choices: {
      0: 'DREAM.Settings.LogLevel.Choices.0',
      1: 'DREAM.Settings.LogLevel.Choices.1',
      2: 'DREAM.Settings.LogLevel.Choices.2',
      3: 'DREAM.Settings.LogLevel.Choices.3'
    },
    default: 0,
    onChange: (value) => {
      CONSTS.LOG_LEVEL = value;
      log(2, `Log level changed to ${value}`);
    }
  });

  game.settings.register(CONSTS.ID, 'enableCompendiumBrowserKeybind', {
    name: 'DREAM.Settings.CompendiumBrowserKeybind.Name',
    hint: 'DREAM.Settings.CompendiumBrowserKeybind.Hint',
    scope: 'client',
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(CONSTS.ID, 'enableHighlightPreparedSpells', {
    name: 'DREAM.Settings.HighlightPreparedSpells.Name',
    hint: 'DREAM.Settings.HighlightPreparedSpells.Hint',
    scope: 'client',
    config: true,
    type: Boolean,
    default: false
  });

  // Currency visibility settings
  game.settings.register(CONSTS.ID, 'enableCustomCurrencies', {
    name: 'DREAM.Settings.EnableCustomCurrencies.Name',
    hint: 'DREAM.Settings.EnableCustomCurrencies.Hint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });

  // Hide currency settings
  ['PP', 'GP', 'EP', 'SP', 'CP'].forEach((currency) => {
    game.settings.register(CONSTS.ID, `hide${currency}`, {
      name: `DREAM.Settings.Hide${currency}.Name`,
      hint: `DREAM.Settings.Hide${currency}.Hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });
  });

  // Rename currency settings
  ['pp', 'gp', 'ep', 'sp', 'cp'].forEach((code) => {
    game.settings.register(CONSTS.ID, `${code}Name`, {
      name: `DREAM.Settings.${code.toUpperCase()}Name.Name`,
      hint: `DREAM.Settings.${code.toUpperCase()}Name.Hint`,
      scope: 'world',
      config: true,
      type: String,
      default: CONFIG.DND5E.currencies[code].label
    });

    game.settings.register(CONSTS.ID, `${code}Abbr`, {
      name: `DREAM.Settings.${code.toUpperCase()}Abbr.Name`,
      hint: `DREAM.Settings.${code.toUpperCase()}Abbr.Hint`,
      scope: 'world',
      config: true,
      type: String,
      default: CONFIG.DND5E.currencies[code].abbreviation
    });
  });

  // Standard currency settings
  game.settings.register(CONSTS.ID, 'useStandardCurrency', {
    name: 'DREAM.Settings.UseStandardCurrency.Name',
    hint: 'DREAM.Settings.UseStandardCurrency.Hint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(CONSTS.ID, 'standardCurrency', {
    name: 'DREAM.Settings.StandardCurrency.Name',
    hint: 'DREAM.Settings.StandardCurrency.Hint',
    scope: 'world',
    config: true,
    type: String,
    choices: {
      pp: 'Platinum',
      gp: 'Gold',
      ep: 'Electrum',
      sp: 'Silver',
      cp: 'Copper'
    },
    default: 'gp'
  });
}

// Initialize log level from settings during startup
export function initializeLogLevel() {
  CONSTS.LOG_LEVEL = parseInt(getSetting('logLevel'));
}
