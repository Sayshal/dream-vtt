// wisps/highlightPreparedSpells.js
import { log } from '../logger.js';

export function highlightPreparedSpells() {
  log(3, 'WISP Enabled: Highlight Prepared Spells');

  Hooks.on('renderActorSheet', (app, html, data) => {
    // Add CSS to highlight prepared spells
    const style = document.createElement('style');
    style.textContent = `
      .item-row[data-prepared="true"] {
        background: rgba(65, 205, 82, 0.15);
      }
    `;
    html[0].appendChild(style);

    // Add data attribute to prepared spell rows
    html.find('.item-row').each((i, el) => {
      const isPrepared = $(el).find('.item-control[data-action="prepare"].active').length > 0;
      if (isPrepared) {
        $(el).attr('data-prepared', 'true');
      }
    });
  });
}
