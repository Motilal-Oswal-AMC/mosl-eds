import {
  a,
  div,
  span,
  p,
  img,
} from '../../scripts/dom-helpers.js';

import objData from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  let fundManagers;
  if (dataMapMoObj.fundManagerDetails.length !== 0) {
    fundManagers = dataMapMoObj.fundManagerDetails;
  } else {
    fundManagers = objData[0].fundManager;
  }

  const fundTime = block.querySelectorAll('p')[0].textContent.trim();
  const aumText = block.querySelectorAll('p')[1].textContent.trim();
  const fundSvg = block.querySelectorAll('p')[2].firstChild.firstChild.src.trim();

  block.innerHTML = '';

  fundManagers.forEach((manager) => {
    const ourFunds = div(
      { class: 'funds-container' },
      div(
        { class: 'fund-wrapper' },
        div(
          { class: 'fund-manager' },
          div({ class: 'fund-manager-image' }, img({ src: `/icons/fund-managers/${manager.fundManagerName.toLowerCase().replace(/\s+/g, '-')}.svg` })), // src: manager.picture
          div(
            { class: 'fund-manager-detail' },
            p(manager.fundManagerName),
            p(manager.designation),
          ),
        ),
        div(
          { class: 'fund-list' },
          div(
            { class: 'funds-time' },
            p({ class: 'funds-time-text' }, fundTime),
            span({ class: 'funds-time-year' }, '2024'),
          ),
          div(
            { class: 'fund-aum' },
            img({ src: fundSvg }),
            p({ class: 'fund-aum-text' }, aumText),
            span({ class: 'fund-aum-rupee' }, '₹2,12,342 Cr'),
          ),
        ),
      ),
      div({ class: 'fund-links' }, a({ href: '#' }, 'View other funds managed by him')),
    );

    block.append(ourFunds);
  });
}
