import { toClassName } from '../../scripts/aem.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import fundCardblock from '../fund-card/fund-card.js';
import {
  button, a, div, input, ul, li, img, table, thead, tbody, tr, th, td,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
// import moEdge from './popular-acticles.js';

export default async function decorate(block) {
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const tabbtn = document.createElement('button');
    tabbtn.className = 'tabs-tab';
    tabbtn.id = `tab-${id}`;
    tabbtn.innerHTML = tab.innerHTML;
    tabbtn.setAttribute('aria-controls', `tabpanel-${id}`);
    tabbtn.setAttribute('aria-selected', !i);
    tabbtn.setAttribute('role', 'tab');
    tabbtn.setAttribute('type', 'button');
    tabbtn.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      tabbtn.setAttribute('aria-selected', true);
    });
    tablist.append(tabbtn);
    tab.remove();
  });

  block.prepend(tablist);
  Array.from(block.querySelectorAll('.tabs-panel')).forEach((el, index) => {
    el.classList.add(`tabpanel${index + 1}`);
  });
  if (block.closest('.our-popular-funds')) {
    block.closest('.our-popular-funds').classList.add('fund-tab');
    let dataCf = dataCfObj.cfDataObjs.slice(0, 4);

    Array.from(tablist.children).forEach((element) => {
      element.addEventListener('click', (event) => {
        block.querySelectorAll('.tabs-panel').forEach((el) => {
          el.style.display = 'none';
        });

        if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-trending-funds') {
          const shcodeArr = dataCfObj.trendingFunds.map((elmap) => elmap.split(':')[1]);
          dataCf = dataCfObj.cfDataObjs.filter((data) => shcodeArr.includes(data.schcode));
          if (dataCf.length > 4) {
            dataCf = dataCf.slice(0, 4);
          }
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-most-searched-funds') {
          const shcodeArr = dataCfObj.mostSearchedFunds.map((elmap) => elmap.split(':')[1]);
          dataCf = dataCfObj.cfDataObjs.filter((data) => shcodeArr.includes(data.schcode));
          if (dataCf.length > 4) {
            dataCf = dataCf.slice(0, 4);
          }
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-most-bought-funds') {
          const shcodeArr = dataCfObj.mostBoughtFunds.map((elmap) => elmap.split(':')[1]);
          dataCf = dataCfObj.cfDataObjs.filter((data) => shcodeArr.includes(data.schcode));
          if (dataCf.length > 4) {
            dataCf = dataCf.slice(0, 4);
          }
        }
        block.querySelector(`#${event.currentTarget.getAttribute('aria-controls')}`).innerHTML = '';
        dataCf.map((elementfunds) => block.querySelector(`#${event.currentTarget.getAttribute('aria-controls')}`).append(fundCardblock(elementfunds)));
        block.querySelector(`#${event.currentTarget.getAttribute('aria-controls')}`).style.display = 'flex';
      });
    });

    const wrapperTablist = document.createElement('div');
    wrapperTablist.classList.add('wrappertablist');
    wrapperTablist.append(block.querySelector('.tabs-list'));
    wrapperTablist.append(
      button(
        { class: 'btndesk' },
        a(
          { href: block.closest('.section').querySelector('.button-container a').getAttribute('href') },
          block.closest('.section').querySelector('.button-container a').textContent.trim(),
        ),
      ),
    );
    block.closest('.section').querySelector('.button-container').classList.add('btnmob');
    const tabspanel = block.querySelectorAll('.tabs-panel');
    block.innerHTML = '';
    block.append(wrapperTablist);
    tabspanel.forEach((el) => {
      block.append(el);
    });
    tablist.children[0].click();
  }
  if (block.closest('.known-our-funds')) {
    block.closest('.known-our-funds').classList.add('fund-tab');
    let dataCf = dataCfObj.cfDataObjs.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:indian-equity-') ? elem : ''));
    dataCf = dataCf.filter((el) => el);
    dataCf = dataCf.slice(0, 4);
    Array.from(tablist.children).forEach((element) => {
      element.addEventListener('click', (event) => {
        block.querySelectorAll('.tabs-panel').forEach((el) => {
          el.style.display = 'none';
        });

        if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-indian-equity') {
          dataCf = dataCfObj.cfDataObjs.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:indian-equity-') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(0, 4);
          dataMapMoObj.selectviewFunds = 'indian-equity';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-international-equity') {
          dataCf = dataCfObj.cfDataObjs.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:international-equity') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataMapMoObj.selectviewFunds = 'international-equity';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-hybrid-balanced') { // tabpanel-index
          dataCf = dataCfObj.cfDataObjs.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:hybrid-&-balanced') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataMapMoObj.selectviewFunds = 'hybrid-&-balanced';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-index') {
          dataCf = dataCfObj.cfDataObjs.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:index-funds') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
          dataMapMoObj.selectviewFunds = 'index-funds';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-etfs') {
          dataCf = dataCfObj.cfDataObjs.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:etf') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
          dataMapMoObj.selectviewFunds = 'etf';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-others') {
          dataCf = dataCfObj.map((elem) => (elem.sebiSubCategory === 'Other ETF' ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
          dataMapMoObj.selectviewFunds = 'OtherFund';
        }
        block.querySelector(`#${event.currentTarget.getAttribute('aria-controls')}`).innerHTML = '';
        dataCf.map((knowfunds) => block.querySelector(`#${event.currentTarget.getAttribute('aria-controls')}`).append(fundCardblock(knowfunds)));
        block.querySelector(`#${event.currentTarget.getAttribute('aria-controls')}`).style.display = 'flex';
      });
    });

    const wrapperTablist = document.createElement('div');
    wrapperTablist.classList.add('wrappertablist');
    wrapperTablist.append(block.querySelector('.tabs-list'));
    wrapperTablist.append(
      button(
        { class: 'btndesk' },
        a(
          {
            class: 'bthref',
            linkattr: block.closest('.section').querySelector('.button-container a').getAttribute('href'),
            onclick: () => {
              const closer = block.closest('.section');
              const pathname = closer.querySelector('.bthref').getAttribute('linkattr');
              localStorage.setItem('viewmark', dataMapMoObj.selectviewFunds);
              window.location.href = `${window.location.origin}${pathname}`;
            },
          },
          block.closest('.section').querySelector('.button-container a').textContent.trim(),
        ),
      ),
    );
    block.closest('.section').querySelector('.button-container').classList.add('btnmob');
    const tabspanel = block.querySelectorAll('.tabs-panel');
    block.innerHTML = '';
    block.append(wrapperTablist);
    tabspanel.forEach((el) => {
      block.append(el);
    });

    tablist.children[0].click();
  }

  /// ///ak 06-08-25//

  if (block.closest('.periodicreturn')) {
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('tab-btn');
    const container = block.closest('.periodicreturn');
    const defaultwrapper = container.querySelectorAll('.default-content-wrapper');
    const btnwrapper = container.querySelectorAll('.tabs-tab');
    const mopAttr = ['_Ret', '_marketValue'];
    btnwrapper.forEach((el, index) => {
      divWrapper.appendChild(el);
      el.setAttribute('dataattr', mopAttr[index]);
    });
    const listwrapper = container.querySelector('.tabs-list');
    listwrapper.innerHTML = '';
    defaultwrapper.forEach((el, index) => (index === 0 ? listwrapper.appendChild(el) : ''));
    listwrapper.appendChild(divWrapper);
    dataMapMoObj.CLASS_PREFIXES = ['headgrp', 'headlist'];
    dataMapMoObj.addIndexed(defaultwrapper[1]);
    const headtitle = defaultwrapper[1].querySelector('.headgrp1').cloneNode(true);
    headtitle.prepend(th({ class: 'comthst', style: 'visibility   : hidden;' }, ''));
    const headstring = headtitle.outerHTML;
    const strhead = headstring.replaceAll('ul', 'tr').replaceAll('li', 'th');

    defaultwrapper[1].querySelector('.headgrp1').style.display = 'none';
    Array.from(headtitle.children).forEach((el) => {
      el.classList.add('data-name');
    });
    const formatReturn = (value) => {
      const numericValue = Number(value);

      // Use Number.isNaN() and check BEFORE calling .toFixed()
      if (Number.isNaN(numericValue)) {
        return 'NA';
      }
      if (dataMapMoObj.attr === '_Ret') {
        return `${numericValue.toFixed(2)}%`;
      } if (dataMapMoObj.attr === '_marketValue') {
        return `₹${Math.floor(numericValue)}`;
      }
      return numericValue;
    };

    const tablegrp = (param) => {
      const returnValue = [];
      dataMapMoObj.attr = param;
      const planCode = localStorage.getItem('planCode') || 'Direct:LM';
      const planslabel = planCode.split(':')[1];
      const planObj = dataCfObj.cfDataObjs.filter((el) => planslabel === el.schcode);
      const cfObj = planObj;
      cfObj[0].returns.forEach((ret) => {
        if (ret.plancode + ret.optioncode === dataMapMoObj.gropcodevalue) {
          returnValue.push(ret);
        }
      });
      const divret = tbody(
        { class: 'fund-data-table' },
        tr(
          { class: 'fund-name-value return-funds' },
          td({ class: 'fund-name' }, cfObj[0].schDetail.schemeName),
          // ul(
          //   { class: 'fund-data-list' },
          td({ class: 'fund-data' }, formatReturn((returnValue[0][`oneYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((returnValue[0][`threeYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((returnValue[0][`fiveYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((returnValue[0][`sevenYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((returnValue[0][`tenYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((returnValue[0][`inception${param}`]))),
          // ),
        ),
        ...cfObj[0].benchmarkreturns.map((el) => tr(
          { class: 'fund-name-value benchmark-funds' },
          td({ class: 'fund-name' }, el.groupName),
          // ul(
          //   { class: 'fund-data-list' },
          td({ class: 'fund-data' }, formatReturn((el[`oneYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((el[`threeYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((el[`fiveYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((el[`sevenYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((el[`tenYear${param}`]))),
          td({ class: 'fund-data' }, formatReturn((el[`inception${param}`]))),
          // ),
        )),
      );
      const tabmo = table(
        { class: 'periodic-returns' },
        thead(
          { class: 'fund-data-title' },
        ),
        divret,
      );
      tabmo.querySelector('.fund-data-title').innerHTML = strhead;
      if (param === '_Ret') {
        block.querySelector('.tabpanel1').innerHTML = '';
        block.querySelector('.tabpanel1').append(tabmo);
      } else {
        block.querySelector('.tabpanel2').innerHTML = '';
        block.querySelector('.tabpanel2').append(tabmo);
      }
    };

    // defaultwrapper[1].style.display = 'none';
    dataMapMoObj.attr = '_Ret';
    tablegrp('_Ret');

    btnwrapper.forEach((elbtn) => {
      elbtn.addEventListener('click', (event) => {
        const dataattr = event.currentTarget.getAttribute('dataattr');
        tablegrp(dataattr);
      });
    });
  }
  /// //////////////////////first Tab ////////////////////////////
  function generateBarChart(data) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('chart-wrapper');
    data.forEach((item) => {
      const row = document.createElement('div');
      row.classList.add('bar-row');

      // Left label
      const leftLabel = document.createElement('div');
      leftLabel.classList.add('bar-label-left');
      leftLabel.textContent = item.sector;
      // Bar graph wrapper
      const barWrapper = document.createElement('div');
      barWrapper.classList.add('bar-graph-wrapper');

      const barFill = document.createElement('div');
      barFill.classList.add('bar-fill');
      barFill.style.width = item.percentage;

      barWrapper.appendChild(barFill);

      // Right label
      const rightLabel = document.createElement('div');
      rightLabel.classList.add('bar-label-right');
      rightLabel.textContent = item.percentage;

      // Append all to row
      row.appendChild(leftLabel);
      row.appendChild(barWrapper);
      row.appendChild(rightLabel);

      // Append row to wrapper
      wrapper.appendChild(row);
    });
    const tabblock = document.querySelector('.tabdiv');
    const tabpanelone = tabblock.querySelector('.tabpanel1');
    tabpanelone.appendChild(wrapper);
    return wrapper;
  }
  function generateBarChartHoldings(data) {
    //   const wrapper = createEl('div', { class: 'chart-wrapper' });
    const wrapper = document.createElement('div');
    wrapper.classList.add('chart-wrapper');
    data.forEach((item) => {
      const row = document.createElement('div');
      row.classList.add('bar-row');
      const leftLabel = document.createElement('div');
      leftLabel.classList.add('bar-label-left');
      leftLabel.textContent = item.nameOfSecurity;
      const barWrapper = document.createElement('div');
      barWrapper.classList.add('bar-graph-wrapper');

      const barFill = document.createElement('div');
      barFill.classList.add('bar-fill');
      barFill.style.width = item.percentToNAV;

      barWrapper.appendChild(barFill);
      const rightLabel = document.createElement('div');
      rightLabel.classList.add('bar-label-right');
      rightLabel.textContent = item.percentToNAV;
      row.appendChild(leftLabel);
      row.appendChild(barWrapper);
      row.appendChild(rightLabel);
      wrapper.appendChild(row);
    });
    const tabblock = document.querySelector('.tabdiv');
    const tabpaneltwo = tabblock.querySelector('.tabpanel2');
    tabpaneltwo.appendChild(wrapper);
    return wrapper;
  }
  const planCode = localStorage.getItem('planCode') || 'Direct:LM';
  const planslabel = planCode.split(':')[1];
  const planObj = dataCfObj.cfDataObjs.filter((el) => planslabel === el.schcode);
  if (block.parentElement.parentElement.classList.contains('tabdiv')) {
    dataMapMoObj.scheme = planObj;
    generateBarChart(planObj[0].sector);
  }
  const tabButtons = document.querySelectorAll('.tabs-tab');
  tabButtons.forEach((tabBtn) => {
    const tabIddata = tabBtn.id.replace('tab-', '');
    if (tabIddata === 'sector-holdings' && planObj[0].sector === undefined) {
      tabBtn.style.display = 'none';
    }
    if (tabIddata === 'stock-holdings' && planObj[0].holdings === undefined) {
      tabBtn.style.display = 'none';
    }
    tabBtn.addEventListener('click', () => {
      const tabId = tabBtn.id.replace('tab-', '');
      const panel = document.getElementById(`tabpanel-${tabId}`);
      if (tabId === 'sector-holdings') {
        if (panel && !panel.querySelector('.chart-wrapper')) {
          const chart = generateBarChart(dataMapMoObj.scheme[0].sector);
          panel.appendChild(chart);
        }
      } else if (tabId === 'stock-holdings') {
        if (panel && !panel.querySelector('.chart-wrapper')) {
          const chart = generateBarChartHoldings(dataMapMoObj.scheme[0].holdings);
          panel.appendChild(chart);
        }
      }
    });
  });

  /// //////////////////////first Tab ////////////////////////////

  if (block.closest('.page-faq-section')) {
    const tempnone = block.closest('body').querySelector('footer');
    tempnone.style.display = 'none';
    dataMapMoObj.CLASS_PREFIXES = [];
    dataMapMoObj.CLASS_PREFIXES = ['itemfaq', 'subitemfaq', 'subinnerfaq', 'innersubfaq', 'inneritemfaq'];
    dataMapMoObj.addIndexed(block.closest('.page-faq-section'));

    const divtablist = block.querySelector('.tabs-list');
    const divwrapper = document.createElement('div');
    divwrapper.classList.add('tablist-search');

    const searchContainer = div(
      { class: 'search-container' },
      div(
        { class: 'search-wrapper' },
        input({
          class: 'search-field',
          placeholder: 'Search here',
          'aria-label': 'Search here',
        }),
        img({
          class: 'cancel-btn',
          src: '../../icons/input-cancel.svg',
          alt: 'cancel button',
        }),
      ),
      ul(
        { class: 'dropdownlist' },
        li({ class: 'singleval' }, 'asdfg'),
        li({ class: 'singleval' }, 'zxcv'),
        li({ class: 'singleval' }, 'zxcv'),
      ),
    );

    divwrapper.append(divtablist);
    divwrapper.append(searchContainer);
    block.prepend(divwrapper);

    dataMapMoObj.searchDrop = {};
    block.querySelectorAll('.tabs-panel').forEach((el) => {
      const attrbute = el.getAttribute('id');
      dataMapMoObj.searchDrop[attrbute] = [];
      const acclab = el.querySelectorAll('summary p');
      acclab.forEach((elacc) => dataMapMoObj.searchDrop[attrbute].push(elacc.textContent.trim()));
    });

    let flagover = true;
    const duplicateObj = [];
    const searchFireld = block.querySelector('.search-field');
    const dropdown = block.querySelector('.tablist-search .dropdownlist');
    const droplist = block.querySelector('.search-container');
    const cancelbtn = block.querySelector('.cancel-btn');
    const uldorp = block.querySelector('.tablist-search .dropdownlist');

    searchFireld.addEventListener('focus', () => {
      if (!Array.from(dropdown.classList).includes('dropdown-active')) {
        dropdown.classList.add('dropdown-active');
        if (dataMapMoObj.searchDrop['tabpanel-all'].length !== 0) {
          uldorp.innerHTML = '';
          dataMapMoObj.searchDrop['tabpanel-all'].forEach((ellisub) => {
            uldorp.append(li({ class: 'singleval' }, ellisub));
          });
        }
        if (Array.from(document.querySelectorAll('summary').length !== 0) && flagover) {
          flagover = false;
          block.querySelectorAll('.tabs-panel').forEach((el) => {
            const attrbute = el.getAttribute('id');
            dataMapMoObj.searchDrop[attrbute] = [];
            const acclab = el.querySelectorAll('summary p');
            acclab.forEach((elacc) => {
              dataMapMoObj.searchDrop[attrbute].push(elacc.textContent.trim());
            });
          });
          if (JSON.stringify(dataMapMoObj.searchDrop) !== '{}') {
            // const uldorp = block.querySelector('.tablist-search .dropdownlist');
            uldorp.innerHTML = '';
            Object.keys(dataMapMoObj.searchDrop).forEach((el) => {
              dataMapMoObj.searchDrop[el].forEach((innerSub) => {
                if (!duplicateObj.includes(innerSub)) {
                  duplicateObj.push(innerSub);
                  uldorp.append(li({ class: 'singleval' }, innerSub));
                }
              });
            });
            const searchFunctionality = () => {
              const searchInput = document.querySelector('.search-field');
              const listItems = document.querySelectorAll('.dropdownlist .singleval');
              const listContainer = document.querySelector('.dropdownlist');

              let activeIndex = -1;

              // This is the only function that needs a change
              const updateActiveItem = () => {
                const visibleItems = listContainer.querySelectorAll('.singleval:not([style*="display: none"])');
                listItems.forEach((item) => item.classList.remove('active'));
                if (activeIndex >= 0 && activeIndex < visibleItems.length) {
                  const activeElement = visibleItems[activeIndex];
                  activeElement.classList.add('active');
                  activeElement.scrollIntoView({
                    block: 'nearest',
                  });
                }
              };

              listContainer.addEventListener('mouseover', (event) => {
                const targetLi = event.target.closest('.singleval');
                if (!targetLi) return;
                const visibleItems = Array.from(listContainer.querySelectorAll('.singleval:not([style*="display: none"])'));
                activeIndex = visibleItems.indexOf(targetLi);
                updateActiveItem();
              });

              searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.trim().toLowerCase();
                let matchesFound = 0;
                const existingNotFound = listContainer.querySelector('.not-found-item');
                if (existingNotFound) existingNotFound.remove();
                if (searchTerm === '') {
                  listItems.forEach((itemls) => {
                    itemls.style.display = '';
                    itemls.innerHTML = itemls.textContent;
                  });
                  activeIndex = -1;
                  updateActiveItem();
                  return;
                }
                const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                listItems.forEach((iteminner) => {
                  const originalText = iteminner.textContent;
                  if (originalText.toLowerCase().includes(searchTerm)) {
                    matchesFound += 1;
                    iteminner.style.display = '';
                    iteminner.innerHTML = originalText.replaceAll(regex, (matcheck) => `<strong>${matcheck}</strong>`);
                  } else {
                    iteminner.style.display = 'none';
                  }
                });
                if (matchesFound === 0) {
                  const liitem = document.createElement('li');
                  liitem.className = 'singleval not-found-item';
                  liitem.textContent = 'No results found';
                  listContainer.appendChild(liitem);
                }
                searchFireld.closest('.search-wrapper').classList.add('search-active');
                activeIndex = 0;
                updateActiveItem();
              });

              searchInput.addEventListener('keydown', (event) => {
                const visibleItems = listContainer.querySelectorAll('.singleval:not([style*="display: none"]):not(.not-found-item)');
                if (visibleItems.length === 0) return;
                switch (event.key) {
                  case 'ArrowDown':
                    event.preventDefault();
                    activeIndex = (activeIndex + 1) % visibleItems.length;
                    updateActiveItem();
                    break;
                  case 'ArrowUp':
                    event.preventDefault();
                    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
                    updateActiveItem();
                    break;
                  case 'Enter':
                    event.preventDefault();
                    if (activeIndex >= 0 && activeIndex < visibleItems.length) {
                      const selectedItem = visibleItems[activeIndex];
                      searchInput.value = selectedItem.textContent;
                      let counter = 0;
                      const value = selectedItem.textContent;
                      Object.keys(dataMapMoObj.searchDrop).forEach((el) => {
                        if ([...dataMapMoObj.searchDrop[el]].includes(value) && counter === 0 && el !== 'tabpanel-all') {
                          const tabpanelText = el;
                          const tabText = el.replaceAll('tabpanel', 'tab');
                          const indexValue = [...dataMapMoObj.searchDrop[el]].indexOf(value);
                          // console.log(tabText);
                          Array.from(block.querySelector('.tabs-list').children).forEach((tabbtnlist) => tabbtnlist.setAttribute('aria-selected', 'false'));
                          Array.from(block.querySelectorAll('.tabs-panel')).forEach((tabplelist) => tabplelist.setAttribute('aria-hidden', 'true'));
                          block.querySelector(`#${tabText}`).setAttribute('aria-selected', 'true');
                          block.querySelector(`#${tabpanelText}`).setAttribute('aria-hidden', 'false');
                          Array.from(block.querySelectorAll(`#${tabpanelText} .accordion-item`)).forEach((elitem, indElm) => {
                            if (indElm === indexValue) {
                              elitem.setAttribute('open', '');
                            } else {
                              elitem.removeAttribute('open');
                            }
                          });
                          searchFireld.closest('.search-wrapper').classList.add('search-active');
                          uldorp.classList.remove('dropdown-active');
                          block.querySelector(`#${tabpanelText}`).scrollIntoView({ behavior: 'smooth' });
                          counter = 1;
                        }
                      });
                      // searchFireld.closest('.search-wrapper').classList.add('search-active');
                      searchInput.innerHTML = '';
                    }
                    break;
                  case 'Backspace':
                    if (searchInput.value.length === 1) {
                      searchFireld.closest('.search-wrapper').classList.remove('search-active');
                    } else if (searchInput.value.length > 1) {
                      searchFireld.closest('.search-wrapper').classList.add('search-active');
                    } else if (searchInput.value === '') {
                      dropdown.classList.add('dropdown-active');
                    }
                    break;
                  case 'Delete':
                    event.preventDefault();
                    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
                    updateActiveItem();
                    if (searchInput.value.length === 1) {
                      searchFireld.closest('.search-wrapper').classList.remove('search-active');
                    } else if (searchInput.value.length > 1) {
                      searchFireld.closest('.search-wrapper').classList.add('search-active');
                    } else if (searchInput.value === '') {
                      dropdown.classList.add('dropdown-active');
                    }
                    break;
                  default:
                    break;
                }
              });
            };
            searchFunctionality();

            uldorp.addEventListener('click', (event) => {
              let counter = 0;
              const value = event.target.textContent.trim();
              Object.keys(dataMapMoObj.searchDrop).forEach((el) => {
                if ([...dataMapMoObj.searchDrop[el]].includes(value) && counter === 0 && el !== 'tabpanel-all') {
                  const searchInput = document.querySelector('.search-field');
                  const tabpanelText = el;
                  const tabText = el.replaceAll('tabpanel', 'tab');
                  const indexValue = [...dataMapMoObj.searchDrop[el]].indexOf(value);
                  // console.log(tabText);
                  Array.from(block.querySelector('.tabs-list').children).forEach((tabbtnlist) => tabbtnlist.setAttribute('aria-selected', 'false'));
                  Array.from(block.querySelectorAll('.tabs-panel')).forEach((tabplelist) => tabplelist.setAttribute('aria-hidden', 'true'));
                  block.querySelector(`#${tabText}`).setAttribute('aria-selected', 'true');
                  block.querySelector(`#${tabpanelText}`).setAttribute('aria-hidden', 'false');
                  Array.from(block.querySelectorAll(`#${tabpanelText} .accordion-item`)).forEach((elitem, indElm) => {
                    if (indElm === indexValue) {
                      elitem.setAttribute('open', '');
                    } else {
                      elitem.removeAttribute('open');
                    }
                  });
                  uldorp.classList.remove('dropdown-active');
                  block.querySelector(`#${tabpanelText}`).scrollIntoView({ behavior: 'smooth' });
                  counter = 1;
                  searchInput.value = value;
                }
              });
              searchFireld.closest('.search-wrapper').classList.add('search-active');
            });
          }
        }
      } else {
        dropdown.classList.remove('dropdown-active');
      }
    });
    document.addEventListener('click', (event) => {
      if (!droplist.contains(event.target)) {
        dropdown.classList.remove('dropdown-active');
      }
    });
    cancelbtn.addEventListener('click', () => {
      searchFireld.value = '';
      searchFireld.closest('.search-wrapper').classList.remove('search-active');
    });
  }

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.cagr-container').forEach((el) => {
      if (!el.contains(event.target)) {
        el.querySelector('.dropdown-list').classList.remove('dropdown-active');
      }
    });
    document.querySelectorAll('.card-category').forEach((el) => {
      try {
        if (!el.contains(event.target)) {
          el.querySelector('.dropdown-list').classList.remove('dropdown-active');
        }
      } catch (error) {
        // console.log(error);
      }
    });
  });
}
