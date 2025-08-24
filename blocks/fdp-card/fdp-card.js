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
  const planCode = localStorage.getItem('planCode') || 'Direct:LM';
  const [planFlow, planslabel] = planCode.split(':');
  const planObj = dataCfObj.filter((el) => planslabel === el.schcode);
  dataMapMoObj.CLASS_PREFIXES = ['compound-item', 'compound-sub-item', 'compound-inner-item'];
  dataMapMoObj.addIndexed(block);

  dataMapMoObj.CLASS_PREFIXES = ['item'];
  dataMapMoObj.addIndexed(block.closest('.fdp-card-container'));

  const cfObj = planObj;
  const fundsTaggingSection = cfObj[0].fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  const DirectPlanlistArr = cfObj[0].planList.filter(
    (el) => el.planName === planFlow,
  );
  cfObj[0].returns.forEach((ret) => {
    if (DirectPlanlistArr[0].groupedCode === (ret.plancode + ret.optioncode)) {
      [...Object.keys(ret)].forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
      finPlangrp.push(ret);
    }
  });
  fundsTaggingSection.push(DirectPlanlistArr[0].optionName);
  const navlistArr = cfObj[0].nav.filter(
    (el) => DirectPlanlistArr[0].groupedCode === (el.plancode + el.optioncode),
  );
  const initalDroptext = `${DirectPlanlistArr[0].planName} | ${DirectPlanlistArr[0].optionName}`;
  const mop = `MO_${cfObj[0].schcode}.svg`;
  const [firstReturnYear] = tempReturns;
  let selectedReturn;
  if (dataMapMoObj.selectreturns === '') {
    selectedReturn = '3 Years';
  } else { selectedReturn = dataMapMoObj.selectreturns;}
  const returnYear = tempReturns.includes(selectedReturn)
    ? selectedReturn
    : firstReturnYear;
  dataMapMoObj.gropcodevalue = DirectPlanlistArr[0].groupedCode;
  dataMapMoObj.fundManagerDetails = cfObj[0].fundManager;
  const navdatecss = navlistArr[0].nav_date === undefined ? 'none' : 'block';
  const navnotpresent = navlistArr[0].nav_date === undefined ? 'block' : 'none';
  const navlistArrDate = navlistArr[0]?.nav_date?.replaceAll('-', ' ') ?? '';
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
    }, returnValue.length !== 0 ? dataMapMoObj.selectreturns : ''));
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
    if (returnValue.length !== 0) {
      cagrValue.append(returnValue[0][dataMapMoObj.ObjTemp[returnYear]]);
      cagrValue.append(span({ class: 'percent' }, '%'));
    } else {
      cagrValue.append('NA');
    }

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
      navValue.append(Number(navlistarray[0].latnav).toFixed(2));
      navValue.append(span({ class: 'percent' }, '%'));
    } else {
      const navdiv = middlediv.querySelector('.nav-return-grp .nav-label');
      navdiv.innerHTML = '';
      navdiv.append('NAV');

      const navValue = middlediv.querySelector('.value-nav');
      navValue.innerHTML = '';
      navValue.append(Number(navlistarray[0].latnav).toFixed(2));
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
            cfObj[0].typeOfScheme,
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
                    valueCagr.append(finPlangrp[0][dataValue]);
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
                `${finPlangrp[0][dataMapMoObj.ObjTemp[returnYear]]}`,
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
                style: `display:${navdatecss}`,
              },
              'NAV as on ',
              span(
                {
                  class: 'nav-date',
                },
                navlistArrDate,
              ),
            ),
            p(
              {
                class: 'nav-label',
                style: `display:${navnotpresent}`,
              },
              'NAV',
            ),
            div(
              {
                class: 'nav-value-grp',
              },
              p(
                {
                  class: 'value-nav',
                },
                Number(navlistArr[0].latnav).toFixed(2),
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

  // document.querySelector('.item2 ul').classList.add('item2-ul');

  // document.querySelector('.item2 ul').classList.add('item2-ul');
  const ptag = p({ class: 'selectedtext-fdp' }, 'Performance');
  const item2Ul = block.closest('.section').querySelector('.item2 ul');
  const item2 = block.closest('.section').querySelector('.item2');
  item2Ul.classList.add('item2-ul');
  item2.prepend(ptag);
  block.innerHTML = '';
  block.append(cardContainer);

  const ptagtest = document.querySelector('.selectedtext-fdp');

  let currentSelectedText = '';

  item2Ul.addEventListener('click', (e) => {
    if (window.innerWidth < 786) {
      ptag.textContent = e.target.textContent;
      item2Ul.style.display = 'none';
    }
    if (window.innerWidth < 786 && e.target.tagName === 'A') {
      // changes for opstions
      const selectedText = e.target.textContent.trim();

      // Show previous selected item back (if any)
      if (currentSelectedText) {
        item2Ul.querySelectorAll('li').forEach((li) => {
          if (li.textContent.trim() === currentSelectedText) {
            li.style.display = '';
          }
        });
      }

      // Hide the newly selected item
      e.target.closest('li').style.display = 'none';

      // Update the current selected text
      currentSelectedText = selectedText;
      ptagtest.textContent = selectedText;
      item2Ul.style.display = 'none';
    }
  });

  ptag.addEventListener('click', () => {
    if (window.innerWidth < 786) {
      if (item2Ul.style.display === 'block') {
        item2Ul.style.display = 'none';
      } else {
        item2Ul.style.display = 'block';
      }
    }
  });

  document.querySelectorAll('.table-wrapper').forEach((el) => {
    document.querySelector('.item2').append(el);
  });
  // document.querySelectorAll('.section .item2 ul li a').forEach((link) => {
  //   link.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const targetId = link.getAttribute('href'); // scrollMap[];
  //     const target = document.querySelector(`.section[data-id="${targetId}"]`);
  //     target?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   });
  // });

  // document.querySelectorAll('.section .navlinks ul li a').forEach((link) => {
  //   link.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const targetId = link.getAttribute('href'); // scrollMap[];
  //     const target = document.querySelector(`.section[data-id="${targetId}"]`);
  //     target?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   });
  // });

  // chat  1

  (function () {
    // Function to calculate the correct header offset based on screen size
    function getHeaderOffset() {
      return window.innerWidth <= 768 ? 450 : 180;
    }

    // Smooth scroll setup with dynamic header offset
    function setupSmoothScroll(linkSelector) {
      document.querySelectorAll(linkSelector).forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const target = document.querySelector(`.section[data-id="${targetId}"]`);

          if (target) {
            const headerOffset = getHeaderOffset();
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        });
      });
    }

    // Apply to both link groups
    setupSmoothScroll('.item2-ul li a');
    setupSmoothScroll('.navlinks ul li a');

    // Optional: re-initialize on window resize (if layout changes)
    window.addEventListener('resize', () => {
      // No need to re-bind listeners, just let `getHeaderOffset()` always return current value
      // This works because the scroll is recalculated each click
    });
  }());

  // chat 2

  // debugger;
  //   (function () {
  //   document.querySelectorAll("ul.item2-ul > li > a").forEach((link) => {
  //     link.addEventListener("click", (e) => {
  //       e.preventDefault();

  //       const targetId = link.getAttribute("href");
  //       const target = document.querySelector(
  //         `.section[data-id="${targetId.trim()}"]`
  //       );
  //       const clickY = (e.currentTarget.getBoundingClientRect()).y + 40;

  //       if (target) {
  //         const targetRectY = (target.getBoundingClientRect()).y;
  //         const targetPosition = targetRectY - clickY;

  //         // Calculate intended final scroll position
  //         const finalScrollY = window.scrollY + targetPosition;

  //         // Check if we're already close enough (±2px to handle float errors)
  //         if (Math.abs(window.scrollY - finalScrollY) > 2) {
  //           window.scrollTo({
  //             top: finalScrollY,
  //             behavior: "smooth",
  //           });
  //         }
  //       }
  //     });
  //   });
  // })();

  document.addEventListener('click', (event) => {
    const dropdownmidle = block.querySelector('.dropdownmidle');
    const dropdown = block.querySelector('.dropdown');
    if (!dropdownmidle.contains(event.target)) {
      dropdownmidle.querySelector('.dropdownlist').classList.remove('dropdown-active');
    }
    if (!dropdown.contains(event.target)) {
      dropdown.querySelector('.dropdownlist').classList.remove('dropdown-active');
    }
  });
}
