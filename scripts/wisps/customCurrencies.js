import { getSetting } from '../helpers.js';
import { log } from '../logger.js';

export function customCurrencies() {
  log(3, 'WISP Enabled: Custom Currencies');

  // Initialize when Foundry is ready
  Hooks.on('ready', () => {
    patchCurrencySystem();
  });

  // Modify character sheets when rendered
  Hooks.on('renderActorSheet5e', (app, html, data) => {
    applyCurrencyChanges(html);
  });
}

// Update D&D5e currency system with our custom settings
function patchCurrencySystem() {
  const currencyConfig = CONFIG.DND5E.currencies;

  // Apply currency name changes
  for (const [key, currency] of Object.entries(currencyConfig)) {
    const newName = getSetting(`${key}Name`);
    const newAbbr = getSetting(`${key}Abbr`);

    if (newName) {
      currency.label = newName;
      game.i18n.translations.DND5E[`Currency${key.toUpperCase()}`] = newName;
    }

    if (newAbbr) {
      currency.abbreviation = newAbbr;
      game.i18n.translations.DND5E[`CurrencyAbbr${key.toUpperCase()}`] = newAbbr;
    }
  }

  // Apply standard currency conversions
  const standard = getSetting('standardCurrency');
  if (standard && standard !== 'gp') {
    const standardRate = currencyConfig[standard].conversion;
    for (const currency of Object.values(currencyConfig)) {
      currency.conversion = currency.conversion / standardRate;
    }
  }

  log(3, 'Currency system updated');
}

// Hide currencies and update display on character sheets
function applyCurrencyChanges(html) {
  // Hide currencies based on settings
  ['pp', 'gp', 'ep', 'sp', 'cp'].forEach((code) => {
    if (getSetting(`hide${code.toUpperCase()}`)) {
      html.find(`.currency-item.${code}`).remove();
      html.find(`.currency.${code}`).remove();
      html.find(`input[name="system.currency.${code}"]`).closest('.form-group').remove();
    }
  });

  // Update item prices to use standard currency
  if (getSetting('useStandardCurrency')) {
    const standard = getSetting('standardCurrency');
    const standardSymbol = CONFIG.DND5E.currencies[standard].abbreviation;
    html.find('.item-price').each((i, el) => {
      const price = parseFloat(el.textContent);
      if (!isNaN(price)) {
        const convertedPrice = price * CONFIG.DND5E.currencies[standard].conversion;
        el.textContent = `${convertedPrice} ${standardSymbol}`;
      }
    });
  }
}
