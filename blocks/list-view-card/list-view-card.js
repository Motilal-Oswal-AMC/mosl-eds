import {
  button,
  div,
  span,
  p,
  img,
  label,
  a,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
import {
  getTimeLeft,
  evaluateByDays,
  wishlist,
} from '../../scripts/scripts.js';

export default function decorate(block) {
  let planFlow = 'Direct';
  if (document.querySelector('.fund-toggle-wrap [type="checkbox"]')) {
    planFlow = document.querySelector('.fund-toggle-wrap [type="checkbox"]')
      .checked
      ? 'Regular'
      : 'Direct';
  }
  const iconsvg = `${
    dataMapMoObj.iconsNfo[
      block.risk.riskType.toLowerCase().replaceAll(' ', '-')
    ]
  }.svg`;
  const labelcagr = evaluateByDays(block.dateOfAllotment);
  const finPlangrp = [];
  const tempReturns = [];
  // initallize
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

  const DirectPlanlistArr = block.planList.filter(
    (el) => el.planName === planFlow && finPlangrp.includes(el.groupedCode),
  );

  // Get the code to match ONCE. If DirectPlanlistArr is empty, this will be undefined.
  const groupedCodeToMatch = DirectPlanlistArr[0]?.groupedCode;

  // Now filter. The comparison will fail safely if groupedCodeToMatch is undefined.
  const cagrValve = block.returns.filter(
    (el) => el.plancode + el.optioncode === groupedCodeToMatch,
  );
  const cagrval = cagrValve.length !== 0 ? cagrValve[0].inception_Ret : 'N/A';
  const stylecagrval = cagrval === 'N/A' ? 'none' : 'flex';

  const starClass = dataMapMoObj.schstar.includes(block.schcode)
    ? 'star-filled'
    : '';
  if ([...block.fundsTaggingSection].includes('NFO')) {
    const nfosvg = `${
      dataMapMoObj.iconsNfo[
        block.risk.riskType.toLowerCase().replaceAll(' ', '-')
      ]
    }.svg`;
    const mop = block.fundIcon !== undefined
      ? block.fundIcon.split('/').at(-1)
      : 'MO_Midcap_Fund.png';
    const mopsec = mop.split('.');
    const mopthree = `${mopsec[0]}.svg`;

    const listcontainer = div(
      { class: 'nfo-list-container list-view-container' },
      div(
        { class: 'list-wrapper' },
        div(
          { class: 'fund-name-wrapper', schcode: block.schcode },
          div(
            { class: 'fund-inner-wrapper' },
            div(
              { class: 'logo-container' },
              img({
                class: 'logoScheme',
                src: `../../icons/fundicon/${mopthree}`,
                alt: 'BrandLogo',
              }),
            ),
            div(
              { class: 'fund-name-container' },
              p('Motilal Oswal'),
              label(block.schDetail.schemeName.replaceAll('Motilal Oswal', '')),
            ),
            img({
              class: 'logoScheme',
              src: '../../icons/nfo-righticon.svg',
              alt: 'Direction Right',
            }),
          ),
          div(
            { class: 'timing-nfo-value' },
            div(
              { class: 'nfo-container' },
              span({ class: 'label-nfo' }, 'NFO'),
            ),
            div(
              { class: 'timing-container' },
              p(getTimeLeft(block.dateOfAllotment)),
            ),
          ),
        ),
        div(
          { class: 'cagr-return' },
          div({ class: 'cagr-value' }, 'N/A'),
          p({ class: 'cagr-text' }, 'CAGR'),
        ),
        div(
          { class: 'risk-star-icon' },
          a(
            { href: '/motilalfigma/modals/risk-o-meter' },
            img({
              class: 'riskfactor-icon',
              src: `../../icons/nfo-risk-icon/${nfosvg}`,
              alt: 'risk icon',
            }),
          ),
        ),
        div(
          {
            class: `star ${starClass}`,
            schcode: block.schcode,
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
        div({ class: 'btn-invest' }, button('Invest')),
      ),
    );
    return listcontainer;
  }
  const mop = block.fundIcon !== undefined
    ? block.fundIcon.split('/').at(-1)
    : 'MO_Midcap_Fund.png';
  const mopsec = mop.split('.');
  const mopfour = `${mopsec[0]}.svg`;
  const listcontainer = div(
    { class: 'list-view-container' },
    div(
      { class: 'list-wrapper' },
      div(
        { class: 'fund-name-wrapper', schcode: block.schcode },
        div(
          { class: 'logo-container' },
          img({ class: 'logoScheme', src: `../../icons/fundicon/${mopfour}`, alt: 'BrandLogo' }),
        ),
        div(
          { class: 'fund-name-container' },
          p('Motilal Oswal'),
          label(block.schDetail.schemeName.replaceAll('Motilal Oswal', '')),
        ),
        img({
          class: 'logoScheme',
          src: '../../icons/direction-right.svg',
          alt: 'Direction Right',
        }),
      ),
      div(
        { class: 'cagr-return' },
        div(
          { class: 'cagr-value' },
          `${cagrval}`,
          span({ style: `display:${stylecagrval}` }, '%'),
        ),

        p({ class: 'cagr-text' }, labelcagr),
      ),
      div(
        { class: 'risk-star-icon' },
        a(
          { href: '/motilalfigma/modals/risk-o-meter' },
          img({
            class: 'riskfactor-icon',
            src: `../../icons/risk-icon/${iconsvg}`,
            alt: 'risk icon',
          }),
        ),
      ),
      div(
        {
          class: `star ${starClass}`,
          schcode: block.schcode,
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
      div({ class: 'btn-invest' }, button('Invest')),
    ),
  );
  return listcontainer;
}
