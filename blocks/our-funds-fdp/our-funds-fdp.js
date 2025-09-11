import {
  a,
  div,
  span,
  p,
  img,
} from '../../scripts/dom-helpers.js';

import objData from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';
// import myAPI from '../../scripts/scripts.js';

export default async function decorate(block) {
  let fundManagers;
  if (dataMapMoObj.fundManagerDetails.length !== 0) {
    fundManagers = dataMapMoObj.fundManagerDetails;
  } else {
    fundManagers = objData[0].fundManager;
  }
  // const planCode = localStorage.getItem('planCode') || 'Direct:LM';
  // const planslabel = planCode.split(':')[1];
  // const request = {
  //   api_name: 'GetFundMangerBySchemeId',
  //   schcode: planslabel,
  // };
  // const apiResp = await myAPI('POST', 'https://www.motilaloswalmf.com/mutualfund/api/v1/GetFundMangerBySchemeId', request);
  // const { mangerDetails } = apiResp.data.response;
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
          div({ class: 'fund-manager-image' }, img({ src: `/icons/fund-managers/${manager.fundManagerName.toLowerCase().replace(/\s+/g, '-')}.svg`, alt: 'managerpic', loading: 'lazy' })),
          div(
            { class: 'fund-manager-detail' },
            p(manager.fundManagerName), // (manager.managerName),
            p(manager.designation), // (manager.managerDesignation),
          ),
        ),
        div(
          { class: 'fund-list' },
          div(
            { class: 'funds-time' },
            p({ class: 'funds-time-text' }, fundTime),
            span({ class: 'funds-time-year' }, '2024'), // mangerDetails[0].managingSince.split('-')[0]),
          ),
          div(
            { class: 'fund-aum' },
            img({ src: fundSvg }),
            p({ class: 'fund-aum-text' }, aumText),
            span({ class: 'fund-aum-rupee' }, '₹2,12,342 Cr'),
          ),
        ),
      ),
      div({ class: 'fund-links', data_id: manager.fundManagerName.trim().split(' ').join('')}, a({ class: 'fundlink', href: '/motilalfigma/modals/fm-portfolio' }, 'View other funds managed by him')),
    );

    block.append(ourFunds);
  });
}
