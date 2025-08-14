import {
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
  wishlist,
} from '../../scripts/scripts.js';
function planListEvent(param, block) {
  // Planlist onchange with changing cagr container
  const tempReturns = [];
  const codeTempArr = [];
  block.returns.forEach((el) => {
    codeTempArr.push(el.plancode + el.optioncode);
    if (param.target.getAttribute('value') === el.plancode + el.optioncode) {
      for (const key in el) {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      }
    }
  });
  param.target
    .closest('.card-wrapper')
    .querySelector('.cagr-container').innerHTML = '';
  if (
    codeTempArr.includes(param.target.getAttribute('value')) &&
    tempReturns.length !== 0
  ) {
    param.target
      .closest('.card-wrapper')
      .querySelector('.cagr-container')
      .classList.remove('not-provided');
    let dropdown = div(
      {
        class: 'cagr-dropdown',
      },
      span({class:'cagr-txt'},'Annualised'),
      div(
        {
          class: 'cagr-select-wrapper',
        },
        p(
          {
            class: 'selectedtext',
            onclick: (event) => {
              event.target.nextElementSibling.classList.add('dropdown-active');
            },
          },
          tempReturns[0]
        ),
        ul(
          { class: 'dropdown-list', schcode: block.schcode },
          ...tempReturns.map((eloption) =>
            li(
              {
                class: 'returnyears',
                value: dataMapMoObj.ObjTemp[eloption],
                onclick: (event) => {
                  const cgarValue =
                    block.returns[0][event.target.getAttribute('value')];
                  event.currentTarget
                    .closest('.dropdown-list')
                    .classList.remove('dropdown-active');
                  event.currentTarget
                    .closest('.cagr-select-wrapper')
                    .querySelector('p').innerText = '';
                  event.currentTarget
                    .closest('.cagr-select-wrapper')
                    .querySelector('p').innerText =
                    event.currentTarget.textContent.trim();
                  event.target
                    .closest('.cagr-container')
                    .querySelector('.cagr-value h2').textContent = '';
                  event.target
                    .closest('.cagr-container')
                    .querySelector(
                      '.cagr-value h2'
                    ).textContent = `${cgarValue}`;
                  event.target
                    .closest('.cagr-container')
                    .querySelector('.cagr-value h2')
                    .append(span('%'));
                },
              },
              eloption
            )
          )
        )
      )
    );
    let dropvalue = div(
      {
        class: 'cagr-value',
      },
      h2(
        `${block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]}`,
        span('%')
      ),
      p(
        {
          class: 'scheme-yet',
          style: 'display:none',
        },
        'Scheme is yet to complete 10 Years'
      ),
      p(
        {
          class: 'cagr-date',
        },
        '15th Mar 2020'
      )
    );
    const droplessthan = div(
      {
        class: 'cagr-desc',
      },
      span(
        'Return is not provided because thescheme has not completed 6 months'
      )
    );
    param.target
      .closest('.card-wrapper')
      .querySelector('.cagr-container')
      .append(dropdown, dropvalue, droplessthan);
  } else {
    param.target
      .closest('.card-wrapper')
      .querySelector('.cagr-container')
      .classList.remove('not-provided');
    const dropdown = div(
      {
        class: 'cagr-dropdown',
      },
      span({class:'cagr-txt'},'Return (Absolute)')
    );
    const dropvalue = div(
      {
        class: 'cagr-value',
      },
      h2('NA')
    );
    const droplessthan = div(
      {
        class: 'cagr-desc',
      },
      span(
        'Return is not provided because thescheme has not completed 6 months'
      )
    );
    param.target
      .closest('.card-wrapper')
      .querySelector('.cagr-container')
      .append(dropdown, dropvalue, droplessthan);
  }
}

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
export default function decorate(block) {
  let planFlow = 'Direct';
  if (document.querySelector('.fund-toggle-wrap [type="checkbox"]')) {
    planFlow = document.querySelector('.fund-toggle-wrap [type="checkbox"]')
      .checked
      ? 'Regular'
      : 'Direct';
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
    finPlangrp.push(ret.plancode + ret.optioncode);
  });

  const DirectPlanlistArr = block.planList.filter((el) => {
    if (el.planName === planFlow && finPlangrp.includes(el.groupedCode)) {
      return el;
    }
  });

  const labelcagr = evaluateByDays(block.dateOfAllotment);
  const classplan = DirectPlanlistArr.length !== 0 && tempReturns.length !== 0 ? '' : ' not-provided';
  let dropdowndot = DirectPlanlistArr.length !== 0 ? '' : 'no-planlist';
  let classdropdown = DirectPlanlistArr.length !== 0 ? 'flex' : 'none';
  let optionName =
    DirectPlanlistArr.length !== 0 ? DirectPlanlistArr[0].optionName : '';
  let returnYear =
    dataMapMoObj['selectreturns'] === ''
      ? tempReturns[0]
      : dataMapMoObj['selectreturns'];
  let iconsvg =
    dataMapMoObj['iconsNfo'][
      block.risk.riskType.toLowerCase().replaceAll(' ', '-')
    ] + '.svg';
  let starClass = dataMapMoObj.schstar.includes(block.schcode)
    ? 'star-filled'
    : '';
  let mop = 'MO_'+block.schcode+'.svg';
    // block.fundIcon !== undefined
    //   ? block.fundIcon.split('/').at(-1)
    //   : 'MO_Midcap_Fund.png';
  // let mopsec = mop.split('.');
  // let mopthree = mopsec[0] + '.svg';
  if ([...block.fundsTaggingSection].includes('NFO')) {
    let nfosvg =
      dataMapMoObj['iconsNfo'][
        block.risk.riskType.toLowerCase().replaceAll(' ', '-')
      ] + '.svg';
    const NfocardContainer = div(
      { class: 'nfo-card-container card-container' },
      div(
        { class: 'card-wrapper' },
        div(
          { class: 'card-upper-title' },
          div(
            { class: 'title-headLogo' },
            div(
              { class: 'title title-logo' },
              img({
                class: 'logoscheme',
                src: '../../icons/iconfund/' + mop,
                alt: 'BrandLogo',
              })
            ),
            div(
              {
                class: 'star ' + starClass,
                onclick: (event) => {
                  if (
                    !Array.from(event.target.parentElement.classList).includes(
                      'star-filled'
                    )
                  ) {
                    event.target.parentElement.classList.add('star-filled');
                  } else {
                    event.target.parentElement.classList.remove('star-filled');
                  }
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
              })
            )
          ),
          div(
            { class: 'title-subtitle' },
            p({class:'brand-name-text'},'Motilal Oswal'),
            div(
              { class: 'title title-logo' },
              h2({class:'fund-name-title'},block.schDetail.schemeName.replaceAll('Motilal Oswal', ''))
            )
          )
        ),
        div(
          { class: 'card-category ' + dropdowndot },
          div(
            { class: 'fund-tagging' },
            ul(
              { class: 'fundtagging-list' },
              ...fundsTaggingSection.map((eloption) =>
                li(
                  { class: 'fundtagging-list-name' },
                  eloption
                    .replaceAll('motilal-oswal:', '')
                    .replaceAll('-', ' ')
                    .toUpperCase()
                )
              )
            )
          ),
          div(
            { class: 'planlist-dropdown', style: 'display:' + classdropdown },
            p(
              {
                class: 'selectedtext',
                onclick: (event) => {
                  console.log(event.target);
                  event.target.nextElementSibling.classList.add(
                    'dropdown-active'
                  );
                },
              },
              optionName
            ),
            ul(
              { class: 'dropdown-list' },
              ...DirectPlanlistArr?.map((el, index) => {
                return li(
                  {
                    value: el.groupedCode,
                    onclick: (event) => {
                      event.currentTarget
                        .closest('.dropdown-list')
                        .classList.remove('dropdown-active');
                      let name = event.currentTarget.textContent.trim();
                      event.currentTarget
                        .closest('.planlist-dropdown')
                        .querySelector('p').innerText = '';
                      event.currentTarget
                        .closest('.planlist-dropdown')
                        .querySelector('p').innerText = name;
                      // planListEvent(event,block)
                    },
                  },
                  el.optionName
                );
              })
            )
          ),
          div(
            { class: 'dis-investor' },
            img({
              class: 'riskfactor-icon',
              src: '../../icons/nfo-risk-icon/' + nfosvg,
              alt: 'risk icon',
            })
          )
        ),
        div(
          { class: 'banner-timing-container ' },
          div(
            { class: 'banner-container' },
            img({
              class: 'nfo-img',
              src: '../../icons/nfo-img.png',
              alt: 'NFO Image',
            }),
            span('Grab Them All')
          ),
          div(
            { class: 'timing-nfo-value' },
            div(
              { class: 'nfo-container' },
              span({ class: 'label-nfo' }, 'NFO')
            ),
            div(
              { class: 'timing-container' },
              p({ class: 'timing-text' }, getTimeLeft(block.dateOfAllotment))
            )
          )
        ),
        div(
          { class: 'button-container' },
          a(
            {
              href: 'https://www.motilaloswalmf.com/mutual-funds/motilal-oswal-special-opportunities-fund',
              class: 'know-more card-btn',
            },
            'Know More'
          ),
          a({href: '/motilalfigma/modals/invest-now-homepage', class: 'invest-now card-btn',}, 'Invest')
        )
      )
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
              class: 'logoscheme',
              src: '../../icons/iconfund/' + mop,
              alt: 'BrandLogo',
            })
          ),
          div(
            {
              class: 'star ' + starClass,
              onclick: (event) => {
                if (
                  !Array.from(event.target.parentElement.classList).includes(
                    'star-filled'
                  )
                ) {
                  event.target.parentElement.classList.add('star-filled');
                } else {
                  event.target.parentElement.classList.remove('star-filled');
                }
                wishlist(block);
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
            })
          )
        ),
        div(
          {
            class: 'title-subtitle',
          },
          p({class:'brand-name-text'},'Motilal Oswal'),
          div(
            {
              class: 'title title-logo',
            },
            h2({class:'fund-name-title'},block.schDetail.schemeName.replaceAll('Motilal Oswal', ''))
          )
        )
      ),
      div(
        {
          class: 'card-category ' + dropdowndot,
        },
        div(
          {
            class: 'fund-tagging',
          },
          ul(
            {
              class: 'fundtagging-list',
            },
            ...fundsTaggingSection.map((eloption) =>
              li(
                { class: 'fundtagging-list-name' },
                toTitleCase(
                  eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ')
                )
              )
            )
          )
        ),
        div(
          { class: 'planlist-dropdown', style: 'display:' + classdropdown },
          p(
            {
              class: 'selectedtext',
              onclick: (event) => {
                console.log(event.target);
                event.target.nextElementSibling.classList.add(
                  'dropdown-active'
                );
              },
            },
            optionName
          ),
          ul(
            { class: 'dropdown-list' },
            ...DirectPlanlistArr?.map((el, index) => {
              return li(
                {
                  value: el.groupedCode,
                  onclick: (event) => {
                    event.currentTarget
                      .closest('.dropdown-list')
                      .classList.remove('dropdown-active');
                    event.currentTarget
                      .closest('.planlist-dropdown')
                      .querySelector('p').innerText = '';
                    event.currentTarget
                      .closest('.planlist-dropdown')
                      .querySelector('p').innerText =
                      event.currentTarget.textContent.trim();
                    planListEvent(event, block);
                  },
                },
                el.optionName
              );
            })
          )
        )
      ),
      div(
        {
          class: 'cagr-container ' + classplan,
        },
        div(
          {
            class: 'cagr-dropdown',
          },
          span({class:'cagr-txt'},labelcagr),
          div(
            {
              class: 'cagr-select-wrapper',
            },
            p(
              {
                class: 'selectedtext',
                onclick: (event) => {
                  event.target.nextElementSibling.classList.add(
                    'dropdown-active'
                  );
                },
              },
              returnYear
            ),
            ul(
              { class: 'dropdown-list' },
              ...tempReturns.map((eloption) =>
                li(
                  {
                    class: 'returnyears',
                    value: dataMapMoObj.ObjTemp[eloption],
                    onclick: (event) => {
                      const cgarValue =
                        block.returns[0][event.target.getAttribute('value')];
                      event.currentTarget
                        .closest('.dropdown-list')
                        .classList.remove('dropdown-active');
                      event.currentTarget
                        .closest('.cagr-select-wrapper')
                        .querySelector('p').innerText = '';
                      event.currentTarget
                        .closest('.cagr-select-wrapper')
                        .querySelector('p').innerText =
                        event.currentTarget.textContent.trim();
                      event.target
                        .closest('.cagr-container')
                        .querySelector('.cagr-value h2').textContent = '';
                      event.target
                        .closest('.cagr-container')
                        .querySelector(
                          '.cagr-value h2'
                        ).textContent = `${cgarValue}`;
                      event.target
                        .closest('.cagr-container')
                        .querySelector('.cagr-value h2')
                        .append(span('%'));
                    },
                  },
                  eloption
                )
              )
            )
          )
        ),
        div(
          {
            class: 'cagr-value',
          },
          h2(
            `${block.returns[0][dataMapMoObj.ObjTemp[returnYear]]}`,
            span('%')
          ),
          p(
            {
              class: 'scheme-yet',
              style: 'display:none',
            },
            'Scheme is yet to complete 10 Years'
          ),
          p(
            {
              class: 'cagr-date',
            },
            '15th Mar 2020'
          )
        ),
        div(
          {
            class: 'cagr-desc',
          },
          span(
            'Return is not provided because thescheme has not completed 6 months'
          )
        )
      ),
      div(
        {
          class: 'risk-container',
          style: 'display:none',
        },
        label('Risk Factor'),
        span(block.risk.riskType)
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
            span({class:'investor-txt'},'2.7 lakh investors')
          ),
          a(
            { href: '/motilalfigma/modals/risk-o-meter' },
            img({
              class: 'riskfactor-icon',
              src: '../../icons/risk-icon/' + iconsvg,
              alt: 'risk icon',
            })
          )
        )
      ),
      div(
          { class: 'button-container' },
          a(
            {
              href: 'https://mosldev--eds-cloud--rupeshdept.aem.page/motilalfigma/funds-details-page',
              class: 'know-more card-btn',
            },
            'Know More'
          ),
          a({href: '/motilalfigma/modals/invest-now-homepage', class: 'invest-now card-btn',}, 'Invest')
        )
    )
  );
  return cardContainer;
}