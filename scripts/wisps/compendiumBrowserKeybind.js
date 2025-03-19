import { CONSTS } from '../constants.js';
import { log } from '../logger.js';

export function compendiumBrowserKeybind() {
  log(3, 'WISP Enabled: Compendium Browser Keybind');

  game.keybindings.register(CONSTS.ID, 'openCompendiumBrowser', {
    name: 'DREAM.WISP.CompendiumBrowserKeybind.Name',
    hint: 'DREAM.WISP.CompendiumBrowserKeybind.Hint',
    editable: [
      {
        key: 'KeyC',
        modifiers: ['Alt']
      }
    ],
    onDown: () => {
      new dnd5e.applications.CompendiumBrowser().render({ force: true });
      return true;
    }
  });
}
