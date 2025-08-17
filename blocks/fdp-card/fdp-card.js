import {
  div,
  ul,
  li,
  h2,
  span,
  p,
  img,
  button,
  input,
} from '../../scripts/dom-helpers.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [];
  dataMapMoObj.CLASS_PREFIXES = ['compound-item', 'compound-sub-item', 'compound-inner-item'];
  dataMapMoObj.addIndexed(block);

  dataMapMoObj.CLASS_PREFIXES = [];
  dataMapMoObj.CLASS_PREFIXES = ['item'];
  dataMapMoObj.addIndexed(block.closest('.fdp-card-container'));

  const cfObj = dataCfObj.slice(0, 1);
  const fundsTaggingSection = cfObj[0].fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  cfObj[0].returns.forEach((ret, jind) => {
    if (jind === 0) {
      [...Object.keys(ret)].forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
    }
    finPlangrp.push(ret.plancode + ret.optioncode);
  });

  const DirectPlanlistArr = cfObj[0].planList.filter(
    (el) => el.planName === 'Direct' && finPlangrp.includes(el.groupedCode),
  );
  fundsTaggingSection.push(DirectPlanlistArr[0].optionName);
  const navlistArr = cfObj[0].nav.filter(
    (el) => DirectPlanlistArr[0].groupedCode === (el.plancode + el.optioncode),
  );
  const initalDroptext = `${DirectPlanlistArr[0].planName} | ${DirectPlanlistArr[0].optionName}`;
  const mop = `MO_${cfObj[0].schcode}.svg`;
  const returnYear = dataMapMoObj.selectreturns === '' ? tempReturns[0] : dataMapMoObj.selectreturns;

  function planGrpEvent(param) {
    const tempReturnsec = [];
    const returnValue = [];
    const valueText = param.target.textContent.trim();
    const planType = valueText.split('|')[1].trim();
    const plangrp = DirectPlanlistArr.filter((el) => el.optionName === planType);

    cfObj[0].returns.forEach((ret) => {
      if ((ret.plancode + ret.optioncode) === plangrp[0].groupedCode) {
        [...Object.keys(ret)].forEach((key) => {
          if (dataMapMoObj.ObjTemp[key]) {
            tempReturnsec.push(dataMapMoObj.ObjTemp[key]);
          }
        });
        returnValue.push(ret);
      }
    });
    const middlediv = param.target.closest('.middlediv');
    const parentdiv = middlediv.closest('.card-wrapper');
    const tagsgrp = parentdiv.querySelector('.tags-grp');
    tagsgrp.querySelectorAll('.list-tag')[2].textContent = '';
    tagsgrp.querySelectorAll('.list-tag')[2].textContent = planType;

    // year
    const yrsdrp = middlediv.querySelector('.nav-return-grp .dropdown');
    yrsdrp.innerHTML = '';
    yrsdrp.append(p({
      class: 'selectedtext',
      onclick: (event) => {
        const toggle = event.target.closest('.dropdown');
        const droplist = toggle.querySelector('.dropdownlist').classList;
        if (!Array.from(droplist).includes('dropdown-active')) {
          droplist.add('dropdown-active');
        } else {
          droplist.remove('dropdown-active');
        }
      },
    }, dataMapMoObj.selectreturns));
    const drpyrs = ul(
      {
        class: 'dropdownlist',
        onclick: (event) => {
          const valueTextsec = event.target.textContent.trim();
          const parentClosest = event.target.closest('.dropdown');
          const ptext = parentClosest.querySelector('.selectedtext');
          ptext.innerText = '';
          ptext.innerText = valueTextsec;
          const returnClass = event.target.closest('.return-grp');
          const valueCagr = returnClass.querySelector('.value-cagr');
          const dataValue = event.target.getAttribute('value');
          valueCagr.innerHTML = '';
          valueCagr.append(returnValue[0][dataValue]);
          valueCagr.append(span({ class: 'percent' }, '%'));
          const parentElem = event.target.parentElement.classList;
          parentElem.remove('dropdown-active');
        },
      },
      ...tempReturnsec.map((eloption) => li({
        class: 'listval',
        value: dataMapMoObj.ObjTemp[eloption],
      }, eloption)),
    );
    yrsdrp.append(drpyrs);

    // cagr-value
    const cagrValue = middlediv.querySelector('.nav-return-grp .value-cagr');
    cagrValue.innerHTML = '';
    cagrValue.append(returnValue[0][dataMapMoObj.ObjTemp[returnYear]]);
    cagrValue.append(span({ class: 'percent' }, '%'));

    // nav
    const navlistarray = cfObj[0].nav.filter(
      (el) => plangrp[0].groupedCode === (el.plancode + el.optioncode),
    );

    if (navlistarray[0].nav_date !== undefined) {
      const navdiv = middlediv.querySelector('.nav-return-grp .nav-label');
      navdiv.innerHTML = '';
      navdiv.append('NAV as on ');
      navdiv.append(span({ class: 'nav-date' }, navlistarray[0].nav_date.replaceAll('-', ' ')));

      const navValue = middlediv.querySelector('.value-nav');
      navValue.innerHTML = '';
      navValue.append(navlistarray[0].latnav);
      navValue.append(span({ class: 'percent' }, '%'));
    } else {
      const navdiv = middlediv.querySelector('.nav-return-grp .nav-label');
      navdiv.innerHTML = '';
      navdiv.append('NAV');

      const navValue = middlediv.querySelector('.value-nav');
      navValue.innerHTML = '';
      navValue.append(navlistarray[0].latnav);
      navValue.append(span({ class: 'percent' }, '%'));
    }
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
          class: 'upperdiv',
        },
        div(
          {
            class: 'brandlogo-callicons',
          },
          div(
            {
              class: 'brand-logo',
            },
            img({
              class: 'logoscheme',
              src: `../../icons/iconfund/${mop}`,
              alt: 'BrandLogo',
            }),
          ),
          div(
            {
              class: 'contanct-share-icon',
            },
            div(
              {
                class: 'contactus-icon',
              },
              img({
                src: '../../icons/call_back.svg',
                alt: 'callback',
                class: 'icon-callback',
              }),
              span(
                {
                  class: 'icon-text',
                },
                'Call back',
              ),
            ),
            div(
              {
                class: 'share-icon',
              },
              img({
                src: '../../icons/share.svg',
                alt: 'callback',
                class: 'icon-callback',
              }),
              span(
                {
                  class: 'icon-text',
                },
                'Share',
              ),
            ),
          ),
        ),
        div(
          {
            class: 'title-discrption',
          },
          p(
            {
              class: 'brand-name-text',
            },
            'Motilal Oswal',
          ),
          div(
            {
              class: 'title title-logo',
            },
            h2(
              {
                class: 'fund-name-title',
              },
              cfObj[0].schDetail.schemeName.replace('Motilal Oswal', ''),
            ),
          ),
          span(
            {
              class: 'discription',
            },
            'An open-ended fund investing in passive funds.',
          ),
        ),
        div(
          {
            class: 'fundtagging-grp',
          },
          ul(
            {
              class: 'tags-grp',
            },
            ...fundsTaggingSection.map((eloption) => li(
              {
                class: 'list-tag',
              },
              toTitleCase(eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ')),
            )),
          ),
        ),
      ),
      div(
        {
          class: 'middlediv',
        },
        div(
          {
            class: 'dropdownmidle',
          },
          div(
            {
              class: 'label-text',
            },
            p(
              {
                class: 'selecttext',
                onclick: (event) => {
                  const toggle = event.target.closest('.dropdownmidle');
                  const droplist = toggle.querySelector('.dropdownlist').classList;
                  if (!Array.from(droplist).includes('dropdown-active')) {
                    droplist.add('dropdown-active');
                  } else {
                    droplist.remove('dropdown-active');
                  }
                },
                dataattr: DirectPlanlistArr[0].groupedCode,
              },
              initalDroptext,
            ),
          ),
          ul(
            {
              class: 'dropdownlist',
              onclick: (event) => {
                const valueText = event.target.textContent.trim();
                const parentClosest = event.target.closest('.dropdownmidle');
                const ptext = parentClosest.querySelector('.selecttext');
                ptext.innerText = '';
                ptext.innerText = valueText;

                const parentElem = event.target.parentElement.classList;
                parentElem.remove('dropdown-active');
                planGrpEvent(event);
              },
            },
            ...DirectPlanlistArr.map((eloption) => li({
              class: 'listval',
              datacode: eloption.groupedCode,
            }, `${eloption.planName} | ${eloption.optionName}`)),
          ),
        ),
        div(
          {
            class: 'nav-return-grp',
          },
          div(
            {
              class: 'return-grp',
            },
            span({
              class: 'return-text',
            }, 'Return'),
            div(
              {
                class: 'dropdown',
              },
              p(
                {
                  class: 'selectedtext',
                  onclick: (event) => {
                    const toggle = event.target.closest('.dropdown');
                    const droplist = toggle.querySelector('.dropdownlist').classList;
                    if (!Array.from(droplist).includes('dropdown-active')) {
                      droplist.add('dropdown-active');
                    } else {
                      droplist.remove('dropdown-active');
                    }
                  },
                },
                returnYear,
              ),
              ul(
                {
                  class: 'dropdownlist',
                  onclick: (event) => {
                    const valueText = event.target.textContent.trim();
                    const parentClosest = event.target.closest('.dropdown');
                    const ptext = parentClosest.querySelector('.selectedtext');
                    ptext.innerText = '';
                    ptext.innerText = valueText;

                    const returnClass = event.target.closest('.return-grp');
                    const valueCagr = returnClass.querySelector('.value-cagr');
                    const dataValue = event.target.getAttribute('value');
                    valueCagr.innerHTML = '';
                    valueCagr.append(cfObj[0].returns[0][dataValue]);
                    valueCagr.append(span({
                      class: 'percent',
                    }, '%'));
                    const parentElem = event.target.parentElement.classList;
                    parentElem.remove('dropdown-active');
                  },
                },
                ...tempReturns.map((eloption) => li({
                  class: 'listval',
                  value: dataMapMoObj.ObjTemp[eloption],
                }, eloption)),
              ),
            ),
            div(
              {
                class: 'return-cagr',
              },
              p(
                {
                  class: 'value-cagr',
                },
                `${cfObj[0].returns[0][dataMapMoObj.ObjTemp[returnYear]]}`,
                span({
                  class: 'percent',
                }, '%'),
              ),
            ),
          ),
          div(
            {
              class: 'nav-grp',
            },
            p(
              {
                class: 'nav-label',
              },
              'NAV as on ',
              span(
                {
                  class: 'nav-date',
                },
                navlistArr[0].nav_date.replaceAll('-', ' '),
              ),
            ),
            div(
              {
                class: 'nav-value-grp',
              },
              p(
                {
                  class: 'value-nav',
                },
                navlistArr[0].latnav,
                span({
                  class: 'percent',
                }, '%'),
              ),
              div(
                {
                  class: 'perecent-value',
                },
                img({
                  class: 'nav-img',
                  src: '../icons/upperecent.svg',
                  alt: 'navalt',
                }),
                p(
                  {
                    class: 'nav-percent',
                  },
                  '0.41%',
                ),
              ),
            ),
          ),
        ),
      ),
      div(
        {
          class: 'lowerdiv',
        },
        div(
          {
            class: 'form-wrapper',
          },
          div(
            {
              class: 'input-wrapper',
            },
            input({
              placeholder: 'Enter PAN details',
              type: 'text',
            }),
            span(
              {
                class: 'error-span',
              },
              'Enter Valid Pan Number',
            ),
          ),
          div(
            {
              class: 'btn-wrapper',
            },
            button(
              {
                class: 'submit',
                type: 'submit',
              },
              'Invest Now',
            ),
          ),
        ),
        div(
          {
            class: 'notify-discription',
          },
          img({
            class: 'icon-person',
            src: '../../icons/Icon.svg',
            alt: 'person',
          }),
          p(
            {
              class: 'notify-dis',
            },
            '88.87K have invested in this fund as on 1 Jul 2025',
          ),
        ),
      ),
    ),
  );

  document.querySelector('.item2 ul').classList.add('item2-ul');

  block.innerHTML = '';
  block.append(cardContainer);

  document.querySelectorAll('.table-wrapper').forEach((el) => {
    document.querySelector('.item2').append(el);
  });
  document.querySelectorAll('.section .item2 ul li a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href'); // scrollMap[];
      const target = document.querySelector(`.section[data-id="${targetId}"]`);
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  document.querySelectorAll('.section .navlinks ul li a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href'); // scrollMap[];
      const target = document.querySelector(`.section[data-id="${targetId}"]`);
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}
