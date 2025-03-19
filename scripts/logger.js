import { CONSTS } from './constants.js';

/**
 * Custom logger.
 * @param {number} level 1: Error, 2: Warn, 3: Debug, 0: Disabled
 * @param {any} args Strings, variables to log to console.
 */
export function log(level, ...args) {
  // Special case for initialization before settings are loaded
  if (CONSTS.LOG_LEVEL === 0 && args[0] === 'Initializing Module') {
    console.debug(`${CONSTS.ID} |`, ...args);
    return;
  }

  if (CONSTS.LOG_LEVEL > 0 && level <= CONSTS.LOG_LEVEL) {
    switch (level) {
      case 1:
        console.error(`${CONSTS.ID} |`, ...args);
        break;
      case 2:
        console.warn(`${CONSTS.ID} |`, ...args);
        break;
      case 3:
      default:
        console.debug(`${CONSTS.ID} |`, ...args);
        break;
    }
  }
}
