import {
  div,
  ul,
  li,
  h2,
  span,
  p,
  img,
  input,
  a,
} from '../../scripts/dom-helpers.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function decorate(block) {
  const mainBlock = block.closest('body');
  const whyFund = mainBlock.querySelector('main .why-fund');
  if (whyFund != null) {
    dataMapMoObj.CLASS_PREFIXES = [
      'whyfund-ol',
      'whyfund-li',
      'whyfund-inner-ol',
      'whyfund-inner-li',
      'whyfund-innertext-li',
    ];
  }
  dataMapMoObj.addIndexed(whyFund);
  const planCode = localStorage.getItem('planCode') || 'Direct:LM';
  const planslabel = planCode.split(':')[1];
  const planObj = dataCfObj.cfDataObjs.filter((el) => planslabel === el.schcode);
  dataMapMoObj.CLASS_PREFIXES = ['compound-item', 'compound-sub-item', 'compound-inner-item'];
  dataMapMoObj.addIndexed(block);

  const stky = mainBlock.querySelector('.fdp-sticky-nav');
  dataMapMoObj.CLASS_PREFIXES = ['sticky-item', 'sticky-sub-item', 'sticky-inner-item'];
  dataMapMoObj.addIndexed(stky);

  dataMapMoObj.CLASS_PREFIXES = ['item'];
  dataMapMoObj.addIndexed(block.closest('.fdp-card-container'));

  const cfObj = planObj;
  const fundsTaggingSection = cfObj[0].fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  const DirectPlanlistArr = cfObj[0].planList.filter(
    (el) => el.planName,
  );
  cfObj[0].returns.forEach((ret) => {
    if (DirectPlanlistArr[0].groupedCode === (ret.plancode + ret.optioncode)) {
      [...Object.keys(ret)].forEach((key) => {
        if (dataMapMoObj.ObjTempfdp[key]) {
          tempReturns.push(dataMapMoObj.ObjTempfdp[key]);
        }
      });
      finPlangrp.push(ret);
    }
  });
  // fundsTaggingSection.push(DirectPlanlistArr[0].optionName);
  const navlistArr = cfObj[0].nav.filter(
    (el) => DirectPlanlistArr[0].groupedCode === (el.plancode + el.optioncode),
  );
  const initalDroptext = `${DirectPlanlistArr[0].planName} | ${DirectPlanlistArr[0].optionName}`;
  const mop = `../../icons/iconfund/MO_${cfObj[0].schcode}.svg`;
  const [firstReturnYear] = tempReturns;
  let selectedReturn;
  if (dataMapMoObj.selectreturns === '') {
    selectedReturn = 'Since 3 years';
  } else { selectedReturn = `Since ${dataMapMoObj.selectreturns.toLocaleLowerCase()}`; }
  const returnYear = tempReturns.includes(selectedReturn)
    ? selectedReturn
    : firstReturnYear;
  let textvalret = selectedReturn;
  if (returnYear !== 'Since Inception') {
    textvalret = returnYear.replace('Since', '');
  }
  dataMapMoObj.gropcodevalue = DirectPlanlistArr[0].groupedCode;
  dataMapMoObj.fundManagerDetails = cfObj[0].fundManager;
  const navdatecss = navlistArr[0].nav_date === undefined ? 'none' : 'block';
  const navnotpresent = navlistArr[0].nav_date === undefined ? 'block' : 'none';
  const navlistArrDate = navlistArr[0]?.nav_date?.replaceAll('-', ' ') ?? '';

  function planGrpEvent(param) {
    const tempReturnsec = [];
    const returnValue = [];
    // const valueText = param.target.textContent.trim();
    // const planType = valueText.replace(' |', '');
    const plangrp = DirectPlanlistArr.filter((el) => el.groupedCode === param.target.getAttribute('datacode'));

    cfObj[0].returns.forEach((ret) => {
      if ((ret.plancode + ret.optioncode) === plangrp[0].groupedCode) {
        [...Object.keys(ret)].forEach((key) => {
          if (dataMapMoObj.ObjTempfdp[key]) {
            tempReturnsec.push(dataMapMoObj.ObjTempfdp[key]);
          }
        });
        returnValue.push(ret);
      }
    });
    const middlediv = param.target.closest('.middlediv');
    // const parentdiv = middlediv.closest('.card-wrapper');
    // const tagsgrp = parentdiv.querySelector('.tags-grp');
    // tagsgrp.querySelectorAll('.list-tag')[2].textContent = '';
    // tagsgrp.querySelectorAll('.list-tag')[2].textContent = planType;

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
        value: dataMapMoObj.ObjTempfdp[eloption],
      }, eloption)),
    );
    yrsdrp.append(drpyrs);

    // cagr-value
    const cagrValue = middlediv.querySelector('.nav-return-grp .value-cagr');
    cagrValue.innerHTML = '';
    if (returnValue.length !== 0) {
      cagrValue.append(returnValue[0][dataMapMoObj.ObjTempfdp[returnYear]]);
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

      const navper = middlediv.querySelector('.nav-percent');
      navper.textContent = '';
      navper.textContent = navlistarray[0].navchngper;
      navper.append(span({ class: 'navper' }, '%'));
    } else {
      const navdiv = middlediv.querySelector('.nav-return-grp .nav-label');
      navdiv.innerHTML = '';
      navdiv.append('NAV');

      const navValue = middlediv.querySelector('.value-nav');
      navValue.innerHTML = '';
      navValue.append(Number(navlistarray[0].latnav).toFixed(2));
      navValue.append(span({ class: 'percent' }, '%'));

      const navper = middlediv.querySelector('.nav-percent');
      navper.textContent = '';
      navper.textContent = navlistarray[0].navchngper;
      navper.append(span({ class: 'navper' }, '%'));
    }
  }

  const typeOfScheme = cfObj[0].typeOfScheme === undefined ? '' : cfObj[0].typeOfScheme;
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
              src: `${mop}`,
              alt: 'Img',
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
          div(
            {
              class: 'title title-logo',
            },
            h2(
              {
                class: 'fund-name-title',
                schcode: cfObj[0].schcode,
              },
              cfObj[0].schDetail.schemeName,
            ),
          ),
          span(
            {
              class: 'discription',
            },
            typeOfScheme,
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
                const targetVal = event.target;
                if (!targetVal.classList.contains('listval')) {
                  return;
                }
                const dropdownList = targetVal.parentElement;
                const allListItems = dropdownList.querySelectorAll('.listval');
                allListItems.forEach((item) => {
                  item.classList.remove('active');
                });
                targetVal.classList.add('active');
                const valueText = targetVal.textContent.trim();
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
                textvalret,
                // returnYear,
              ),
              ul(
                {
                  class: 'dropdownlist',
                  onclick: (event) => {
                    const valueText = event.target.textContent.trim();
                    const parentClosest = event.target.closest('.dropdown');
                    const ptext = parentClosest.querySelector('.selectedtext');
                    let textval = valueText;
                    if (textval !== 'Since Inception') {
                      textval = valueText.replace('Since', '');
                    }
                    ptext.innerText = '';
                    ptext.innerText = textval;

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
                  value: dataMapMoObj.ObjTempfdp[eloption],
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
                `${finPlangrp[0][dataMapMoObj.ObjTempfdp[returnYear]]}`,
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
                }),
              ),
              div(
                {
                  class: 'perecent-value',
                },
                img({
                  class: 'nav-img',
                  src: '../../icons/upperecent.svg',
                  alt: 'navalt',
                }),
                p(
                  {
                    class: 'nav-percent',
                  },
                  Number(navlistArr[0].navchngper),
                  span({
                    class: 'navper',
                  }, '%'),
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
            a(
              {
                class: 'submit ',
                type: 'submit',
                href: 'https://mosldev--eds-cloud--rupeshdept.aem.live/motilalfigma/modals/invest-now-homepage',
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

  const ptag = p({ class: 'selectedtext-fdp' }, 'Performance');
  const item2Ul = block.closest('.section').querySelector('.item2 ul');
  const item2 = block.closest('.section').querySelector('.item2');
  item2Ul.classList.add('item2-ul');
  item2.prepend(ptag);
  item2.querySelector('.item2-ul').classList.add('fdp-tab');
  // block.innerHTML = '';
  Array.from(block.children).forEach((elchild) => {
    elchild.style.display = 'none';
  });
  block.append(cardContainer);
  block.parentElement.parentElement.parentElement.querySelector('.breadcrumbs-fdp').classList.add('wrapper-fdp');

  dataMapMoObj.CLASS_PREFIXES = ['tab-li-item'];
  dataMapMoObj.addIndexed(item2Ul);

  const activecls = Array.from(item2Ul.children)[0].querySelector('a');
  activecls.classList.add('active');

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
        item2Ul.querySelectorAll('li').forEach((lielm) => {
          if (lielm.textContent.trim() === currentSelectedText) {
            lielm.style.display = '';
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
        item2Ul.parentNode.querySelector('.selectedtext-fdp').classList.remove('active');
        item2Ul.style.display = 'none';
      } else {
        item2Ul.parentNode.querySelector('.selectedtext-fdp').classList.add('active');
        item2Ul.style.display = 'block';
      }
    }
  });

  document.querySelectorAll('.table-wrapper').forEach((el) => {
    document.querySelector('.item2').append(el);
  });

  (function () {
    // Function to calculate the correct header offset based on screen size
    function getHeaderOffset() {
      return window.innerWidth <= 768 ? 1010 : 240;
    }

    // Smooth scroll setup with dynamic header offset
    function setupSmoothScroll(linkSelector) {
      if (window.innerWidth < 900) {
        Array.from(document.querySelectorAll(linkSelector)).forEach((el) => {
          el.classList.remove('active');
        });
        const act = Array.from(document.querySelectorAll(linkSelector))[0];
        if (act) {
          act.classList.add('active');
          act.parentElement.style.display = 'none';
        }
      }
      document.querySelectorAll(linkSelector).forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          Array.from(e.target.closest('.item2-ul').children).forEach((el) => {
            const linkclass = el.querySelector('a');
            linkclass.classList.remove('active');
            if (linkclass.style.display === 'none') {
              linkclass.style.display = 'block';
            }
          });
          const targetId = link.getAttribute('href');
          e.target.classList.add('active');
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

  document.addEventListener('click', (event) => {
    const dropdownmidle = block.querySelector('.dropdownmidle');
    const dropdown = block.querySelector('.dropdown');
    // const temp = block.closest('body').querySelector('.breadcrumbs-fdp');
    // const sharlist = temp.querySelector('.innerbreadcrb2');
    if (!dropdownmidle.contains(event.target)) {
      dropdownmidle.querySelector('.dropdownlist').classList.remove('dropdown-active');
    }
    if (!dropdown.contains(event.target)) {
      dropdown.querySelector('.dropdownlist').classList.remove('dropdown-active');
    }
    // if (!sharlist.contains(event.target)) {
    //   sharlist.querySelector('.breadcrbmain2').style.display = 'none';
    // }
  });

  // changes for given class ul li

  const ulElement = mainBlock.querySelector('.breadcrumbs-fdp');
  dataMapMoObj.CLASS_PREFIXES = ['mainbreadcrb', 'subbreadcrb', 'innerbreadcrb', 'breadcrbmain'];
  dataMapMoObj.addIndexed(ulElement);

  mainBlock.querySelector('.subbreadcrb2').addEventListener('click', () => {
    const breadcrumb = document.querySelector('.breadcrbmain2');
    if (breadcrumb.style.display === 'none' || breadcrumb.style.display === '') {
      breadcrumb.style.display = 'block';
    } else {
      breadcrumb.style.display = 'none';
    }
  });

  const imgAltmain = block.closest('main');
  dataMapMoObj.altFunction(imgAltmain.querySelector('.subbreadcrb1 img'), 'callback');
  dataMapMoObj.altFunction(imgAltmain.querySelector('.subbreadcrb3 img'), 'portfolio-sheet');
  dataMapMoObj.altFunction(imgAltmain.querySelector('.subbreadcrb4 img'), 'branded-page');
  dataMapMoObj.altFunction(imgAltmain.querySelector('.subbreadcrb4 img'), 'branded-page');

  // Select the parent container once
  const shareContainer = imgAltmain.querySelector('.subbreadcrb2 .breadcrbmain2');

  // Loop through children just to prepare them (e.g., remove href)
  Array.from(shareContainer.children).forEach((listItem) => {
    // Find the list item that contains the text 'Copy'
    if (listItem.textContent.trim().includes('Copy')) {
      const link = listItem.querySelector('a');
      if (link) {
        link.removeAttribute('href');
        // Add a class or data-attribute for easier targeting
        listItem.dataset.action = 'copy';
      }
    }
  });

  // Add ONE event listener to the parent container
  shareContainer.addEventListener('click', async (event) => {
    // Find the list item that was actually clicked
    const clickedItem = event.target.closest('[data-action="copy"]');

    // If the click wasn't on our copy button, do nothing
    if (!clickedItem) {
      return;
    }

    // Prevent default behavior, like navigating if the href wasn't removed
    event.preventDefault();

    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);

      // Provide feedback to the user!
      alert('URL copied to clipboard!');
    } catch (err) {
      // Catch potential errors and inform the user
      // console.error('Failed to copy URL: ', err);
      alert('Could not copy URL. Please make sure the window is focused.');
    }
  });
}
