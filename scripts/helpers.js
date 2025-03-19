import { CONSTS } from './constants.js';
import { log } from './logger.js';

// Utility functions
export function getSetting(key) {
  log(3, 'Utility getSetting Executed');
  return game.settings.get(CONSTS.ID, key);
}

export function setSetting(key, value) {
  log(3, 'Utility setSetting Executed');
  return game.settings.set(CONSTS.ID, key, value);
}
