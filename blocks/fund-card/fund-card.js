import {
  button,
  div,
  label,
  span,
  ul,
  li,
  h2,
  p,
  img,
  a,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
import {
  getTimeLeft,
  evaluateByDays,
} from '../../scripts/scripts.js';

function planListEvent(param, block) { // Planlist onchange with changing cagr container
  const tempReturns = [];
  const codeTempArr = [];
  block.returns.forEach((el) => {
    codeTempArr.push((el.plancode + el.optioncode));
    if (param.target.getAttribute('value') === (el.plancode + el.optioncode)) {
      Object.keys(el).forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
    }
  });
  param.target.closest('.card-wrapper').querySelector('.cagr-container').innerHTML = '';
  if (codeTempArr.includes(param.target.getAttribute('value')) && tempReturns.length !== 0) {
    param.target.closest('.card-wrapper').querySelector('.cagr-container').classList.remove('not-provided');
    const dropdown = div(
      {
        class: 'cagr-dropdown',
      },
      label('Annualised'),
      div(
        {
          class: 'cagr-select-wrapper',
        },
        p({
          class: 'selectedtext',
          onclick: (event) => {
            event.target.nextElementSibling.classList.add('dropdown-active');
          },
        }, tempReturns[0]),
        ul(
          {
            class: 'dropdown-list',
          },
          ...tempReturns.map((eloption) => li(
            {
              class: 'returnyears',
              value: dataMapMoObj.ObjTemp[eloption],
              onclick: (event) => {
                const cgarValue = block.returns[0][event.target.getAttribute('value')];
                event.currentTarget.closest('.dropdown-list').classList.remove('dropdown-active');
                event.currentTarget.closest('.cagr-select-wrapper').querySelector('p').innerText = '';
                event.currentTarget.closest('.cagr-select-wrapper').querySelector('p').innerText = event.currentTarget.textContent.trim();
                event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = '';
                event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = `${cgarValue}`;
                event.target.closest('.cagr-container').querySelector('.cagr-value h2').append(span('%'));
              },
            },
            eloption,
          )),
        ),
      ),
    );
    const dropvalue = div(
      {
        class: 'cagr-value',
      },
      h2(
        `${block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]}`,
        span('%'),
      ),
      p({
        class: 'scheme-yet',
        style: 'display:none',
      }, 'Scheme is yet to complete 10 Years'),
      p({
        class: 'cagr-date',
      }, '15th Mar 2020'),
    );
    const droplessthan = div(
      {
        class: 'cagr-desc',
      },
      span('Return is not provided because thescheme has not completed 6 months'),
    );
    param.target.closest('.card-wrapper').querySelector('.cagr-container').append(dropdown, dropvalue, droplessthan);
  } else {
    param.target.closest('.card-wrapper').querySelector('.cagr-container').classList.remove('not-provided');
    const dropdown = div(
      {
        class: 'cagr-dropdown',
      },
      label('Return (Absolute)'),
    );
    const dropvalue = div(
      {
        class: 'cagr-value',
      },
      h2('NA'),
    );
    const droplessthan = div(
      {
        class: 'cagr-desc',
      },
      span('Return is not provided because thescheme has not completed 6 months'),
    );
    param.target.closest('.card-wrapper').querySelector('.cagr-container').append(dropdown, dropvalue, droplessthan);
  }
}

function wishlist() {
  const paramCount = document.querySelectorAll('.star-filled');
  const watchlistText = document.querySelector('.watchlisttext span');

  const count = paramCount.length;
  const formattedCount = count < 10 ? `0${count}` : count;

  watchlistText.textContent = `My Watchlist (${formattedCount})`;
}
function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
export default function decorate(block) {
  let planFlow = 'Direct';
  if (document.querySelector(".fund-toggle-wrap [type='checkbox']")) {
    planFlow = document.querySelector(".fund-toggle-wrap [type='checkbox']").checked ? 'Regular' : 'Direct';
  }
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  block.returns.forEach((ret, jind) => {
    if (jind === 0) {
      [...Object.keys(ret)].forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
    }
    finPlangrp.push((ret.plancode + ret.optioncode));
  });

  const DirectPlanlistArr = block.planList.filter(
    (el) => el.planName === planFlow && finPlangrp.includes(el.groupedCode),
  );

  const labelcagr = evaluateByDays(block.dateOfAllotment);
  const classplan = (DirectPlanlistArr.length !== 0 && tempReturns.length !== 0) ? '' : ' not-provided';
  const dropdowndot = DirectPlanlistArr.length !== 0 ? '' : 'no-planlist';
  const classdropdown = DirectPlanlistArr.length !== 0 ? 'flex' : 'none';
  const optionName = DirectPlanlistArr.length !== 0 ? DirectPlanlistArr[0].optionName : '';
  const returnYear = dataMapMoObj.selectreturns === '' ? tempReturns[0] : dataMapMoObj.selectreturns;
  const iconsvg = `${dataMapMoObj['icons-nfo'][block.risk.riskType.toLowerCase().replaceAll(' ', '-')]}.svg`;
  const starClass = dataMapMoObj.schstar.includes(block.schcode) ? 'star-filled' : '';
  if ([...block.fundsTaggingSection].includes('NFO')) {
    const nfosvg = `${dataMapMoObj['icons-nfo'][block.risk.riskType.toLowerCase().replaceAll(' ', '-')]}.svg`;
    const NfocardContainer = div(
      {
        class: 'nfo-card-container card-container',
      },
      div(
        {
          class: 'card-wrapper',
        },
        div(
          {
            class: 'card-upper-title',
          },
          div(
            {
              class: 'title-headLogo',
            },
            div(
              {
                class: 'title title-logo',
              },
              img({
                class: 'logoScheme',
                src: '../../icons/Group.svg',
                alt: 'BrandLogo',
              }),
            ),
            div(
              {
                class: `star ${starClass}`,
                onclick: (event) => {
                  if (
                    !Array.from(event.target.parentElement.classList).includes(
                      'star-filled',
                    )
                  ) {
                    event.target.parentElement.classList.add('star-filled');
                  } else {
                    event.target.parentElement.classList.remove('star-filled');
                  }
                  wishlist();
                },
                schcode: block.schcode,
              },
              img({
                class: 'star-icon',
                src: '../../icons/not-filled-star.svg',
                alt: 'star-icon',
              }),
              img({
                class: 'fillstar-icon',
                src: '../../icons/filled-star.svg',
                alt: 'fillstar-icon',
              }),
            ),
          ),
          div(
            {
              class: 'title-subtitle',
            },
            p('Motilal Oswal'),
            div(
              {
                class: 'title title-logo',
              },
              h2(block.schDetail.schemeName.replaceAll('Motilal Oswal', '')),
            ),
          ),
        ),
        div(
          { class: `card-category ${dropdowndot}` },
          div(
            {
              class: 'fund-tagging',
            },
            ul(
              { class: 'fundtagging-list' },
              ...fundsTaggingSection.map((eloption) => li(
                { class: 'fundtagging-list-name' },
                eloption
                  .replaceAll('motilal-oswal:', '')
                  .replaceAll('-', ' ')
                  .toUpperCase(),
              )),
            ),
          ),
          div(
            {
              class: 'planlist-dropdown',
              style: `display:${classdropdown}`,
            },
            p({
              class: 'selectedtext',
              onclick: (event) => {
                event.target.nextElementSibling.classList.add('dropdown-active');
              },
            }, optionName),
            ul(
              {
                class: 'dropdown-list',
              },
              Array.isArray(DirectPlanlistArr)
              && DirectPlanlistArr.map((el) => li({
                value: el.groupedCode,
                onclick: (event) => {
                  const dropdown = event.currentTarget.closest('.dropdown-list');
                  const dropdownP = event.currentTarget.closest('.planlist-dropdown')?.querySelector('p');

                  dropdown?.classList.remove('dropdown-active');

                  if (dropdownP) {
                    const name = event.currentTarget.textContent.trim();
                    dropdownP.innerText = name;
                  }

                  // planListEvent(event, block); // uncomment when ready
                },
              }, el.optionName)),
            ),
          ),
          div(
            {
              class: 'dis-investor',
            },
            img({
              class: 'riskfactor-icon',
              src: `../../icons/nfo-risk-icon/${nfosvg}`,
              alt: 'risk icon',
            }),
          ),
        ),
        div(
          {
            class: 'banner-timing-container ',
          },
          div(
            {
              class: 'banner-container',
            },
            img({
              src: '../../icons/banner-desk.png',
              alt: 'banner Image',
            }),
            span('Grab Them All'),
          ),
          div(
            {
              class: 'timing-nfo-value',
            },
            div(
              {
                class: 'nfo-container',
              },
              span({
                class: 'label-nfo',
              }, 'NFO'),
            ),
            div({
              class: 'timing-container',
            }, p(getTimeLeft(block.dateOfAllotment))),
          ),
        ),
        div(
          { class: 'button-container' },
          button(
            {
              class: 'know-more',
            },
            a({ href: 'https://www.motilaloswalmf.com/mutual-funds/motilal-oswal-special-opportunities-fund' }, 'Know More'),
          ),
          a(
            { href: '/motilalfigma/modals/invest-now-homepage' },
            button({ class: 'invest-now' }, 'Invest'),
          ),
        ),
      ),
    );
    return NfocardContainer;
  }
  const cardContainer = div(
    {
      class: 'card-container',
    },
    div(
      {
        class: 'card-wrapper',
      },
      div(
        {
          class: 'card-upper-title',
        },
        div(
          {
            class: 'title-headLogo',
          },
          div(
            {
              class: 'title title-logo',
            },
            img({
              class: 'logoScheme',
              src: '../../icons/Group.svg',
              alt: 'BrandLogo',
            }),
          ),
          div(
            {
              class: `star ${starClass}`,
              onclick: (event) => {
                if (
                  !Array.from(event.target.parentElement.classList).includes(
                    'star-filled',
                  )
                ) {
                  event.target.parentElement.classList.add('star-filled');
                } else {
                  event.target.parentElement.classList.remove('star-filled');
                }
                wishlist();
              },
              schcode: block.schcode,
            },
            img({
              class: 'star-icon',
              src: '../../icons/not-filled-star.svg',
              alt: 'star-icon',
            }),
            img({
              class: 'fillstar-icon',
              src: '../../icons/filled-star.svg',
              alt: 'fillstar-icon',
            }),
          ),
        ),
        div(
          {
            class: 'title-subtitle',
          },
          p('Motilal Oswal'),
          div(
            {
              class: 'title title-logo',
            },
            h2(block.schDetail.schemeName.replaceAll('Motilal Oswal', '')),
          ),
        ),
      ),
      div(
        {
          class: `card-category ${dropdowndot}`,
        },
        div(
          {
            class: 'fund-tagging',
          },
          ul(
            {
              class: 'fundtagging-list',
            },
            ...fundsTaggingSection.map((eloption) => li(
              toTitleCase(
                eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' '),
              ),
            )),
          ),
        ),
        div(
          {
            class: 'planlist-dropdown',
            style: `display:${classdropdown}`,
          },
          p({
            class: 'selectedtext',
            onclick: (event) => {
              event.target.nextElementSibling.classList.add('dropdown-active');
            },
          }, optionName),
          ul(
            {
              class: 'dropdown-list',
            },
            Array.isArray(DirectPlanlistArr)
            && DirectPlanlistArr.map((el) => li({
              value: el.groupedCode,
              onclick: (event) => {
                const dropdown = event.currentTarget.closest('.dropdown-list');
                const planList = event.currentTarget.closest('.planlist-dropdown').querySelector('p');
                dropdown?.classList.remove('dropdown-active');
                if (planList) {
                  planList.innerText = '';
                  planList.innerText = event.currentTarget.textContent.trim();
                }
                planListEvent(event, block);
              },
            }, el.optionName)),

          ),
        ),
      ),
      div(
        {
          class: `cagr-container ${classplan}`,
        },
        div(
          {
            class: 'cagr-dropdown',
          },
          label(labelcagr),
          div(
            {
              class: 'cagr-select-wrapper',
            },
            p({
              class: 'selectedtext',
              onclick: (event) => {
                event.target.nextElementSibling.classList.add('dropdown-active');
              },
            }, returnYear),
            ul(
              {
                class: 'dropdown-list',
              },
              ...tempReturns.map((eloption) => li(
                {
                  class: 'returnyears',
                  value: dataMapMoObj.ObjTemp[eloption],
                  onclick: (event) => {
                    const cgarValue = block.returns[0][event.target.getAttribute('value')];
                    event.currentTarget.closest('.dropdown-list').classList.remove('dropdown-active');
                    event.currentTarget.closest('.cagr-select-wrapper').querySelector('p').innerText = '';
                    event.currentTarget.closest('.cagr-select-wrapper').querySelector('p').innerText = event.currentTarget.textContent.trim();
                    event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = '';
                    event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = `${cgarValue}`;
                    event.target.closest('.cagr-container').querySelector('.cagr-value h2').append(span('%'));
                  },
                },
                eloption,
              )),
            ),
          ),
        ),
        div(
          {
            class: 'cagr-value',
          },
          h2(
            `${block.returns[0][dataMapMoObj.ObjTemp[returnYear]]}`,
            span('%'),
          ),
          p(
            {
              class: 'scheme-yet',
              style: 'display:none',
            },
            'Scheme is yet to complete 10 Years',
          ),
          p(
            {
              class: 'cagr-date',
            },
            '15th Mar 2020',
          ),
        ),
        div(
          {
            class: 'cagr-desc',
          },
          span(
            'Return is not provided because thescheme has not completed 6 months',
          ),
        ),
      ),
      div(
        {
          class: 'risk-container',
          style: 'display:none',
        },
        label('Risk Factor'),
        span(block.risk.riskType),
      ),
      div(
        {
          class: 'discription',
        },
        p(
          {
            class: 'dis-choosen',
          },
          // 'Chosen by ',
          div(
            {
              class: 'dis-investor',
            },
            img({
              class: 'icon person',
              src: '../../icons/Icon.svg',
              alt: 'person',
            }),
            span('2.7 lakh investors'),
          ),
          img({
            class: 'riskfactor-icon',
            src: `../../icons/risk-icon/${iconsvg}`,
            alt: 'risk icon',
          }),
        ),
      ),
      div(
        {
          class: 'button-container',
        },
        button(
          {
            class: 'know-more',
          },
          a({ href: 'https://www.motilaloswalmf.com/mutual-funds/motilal-oswal-special-opportunities-fund' }, 'Know More'),
        ),
        a(
          { href: '/motilalfigma/modals/invest-now-homepage' },
          button({ class: 'invest-now' }, 'Invest'),
        ),
      ),
    ),
  );
  return cardContainer;
}
