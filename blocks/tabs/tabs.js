import { toClassName } from '../../scripts/aem.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import fundCardblock from '../fund-card/fund-card.js';
import {
  button, a, table, tr, th, div, input, ul, li, img,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';

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
    let dataCf = dataCfObj.slice(0, 4);

    Array.from(tablist.children).forEach((element) => {
      element.addEventListener('click', (event) => {
        block.querySelectorAll('.tabs-panel').forEach((el) => {
          el.style.display = 'none';
        });

        if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-trending-funds') {
          dataCf = dataCfObj.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-most-searched-funds') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:active') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-most-bought-funds') {
          dataCf = dataCfObj.map((elem) => (elem.fundCategorisation === 'Passive Funds' ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
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
    // let dataCf = dataCfObj.slice(1, 5);
    let dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:indian-equity-') ? elem : ''));
    dataCf = dataCf.filter((el) => el);
    dataCf = dataCf.slice(0, 4);
    Array.from(tablist.children).forEach((element) => {
      element.addEventListener('click', (event) => {
        block.querySelectorAll('.tabs-panel').forEach((el) => {
          el.style.display = 'none';
        });

        if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-indian-equity') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:indian-equity-') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(0, 4);
          dataMapMoObj.selectviewFunds = 'indian-equity';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-international-equity') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:international-equity') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataMapMoObj.selectviewFunds = 'international-equity';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-hybrid-balanced') { // tabpanel-index
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:hybrid-&-balanced') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          // dataCf = dataCf.slice(1, 5);
          dataMapMoObj.selectviewFunds = 'hybrid-&-balanced';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-index') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:index-funds') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
          dataMapMoObj.selectviewFunds = 'index-funds';
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-etfs') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:etf') ? elem : ''));
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
  let tabpanel2;
  let tab2innerdiv;
  let tableWrapper;
  let tab2innerdivpanel2;

  function displaytableCAGR() {
    const returnValue = [];
    const planCode = localStorage.getItem('planCode') || 'Direct:LM';
    const planslabel = planCode.split(':')[1];
    const planObj = dataCfObj.filter((el) => planslabel === el.schcode);
    const cfObj = planObj;
    cfObj[0].returns.forEach((ret) => {
      if ((ret.plancode + ret.optioncode) === dataMapMoObj.gropcodevalue) {
        returnValue.push(ret);
      }
    });

    tab2innerdiv.innerHTML = '';
    tab2innerdiv.append(tableWrapper);
    // A helper function to format the return values safely
    const formatReturn = (value) => {
      const numericValue = Number(value);

      // Use Number.isNaN() and check BEFORE calling .toFixed()
      if (Number.isNaN(numericValue)) {
        return '';
      }
      return numericValue.toFixed(2);
    };

    const row1 = `
      <tr>
        <td class='schemename'>${cfObj[0].schDetail.schemeName || 'N/A'}</td>
        <td class='schDetailnum'>${formatReturn(returnValue[0].oneYear_Ret) || 'N/A'}</td>
        <td class='schDetailnum'>${formatReturn(returnValue[0].threeYear_Ret) || 'N/A'}</td>
        <td class='schDetailnum'>${formatReturn(returnValue[0].fiveYear_Ret) || 'N/A'}</td>
        <td class='schDetailnum'>${formatReturn(returnValue[0].sevenYear_Ret) || 'N/A'}</td>
        <td class='schDetailnum'>${formatReturn(returnValue[0].tenYear_Ret) || 'N/A'}</td>
        <td class='schDetailnum'>${formatReturn(returnValue[0].inception_Ret) || 'N/A'}</td>
      </tr>`;
    tableWrapper.innerHTML += row1;

    cfObj[0].benchmarkreturns.forEach((b) => {
      const row2 = `<tr class="trbackgroundcolor">
        <td class='schemename'>${b.groupName}</td>
        <td class='schemenum'>${Number(b.oneYear_Ret).toFixed(2) === 'NaN' ? 'N/A' : Number(b.oneYear_Ret).toFixed(2) || 'N/A'}</td>
        <td class='schemenum'>${Number(b.threeYear_Ret).toFixed(2) === 'NaN' ? 'N/A' : Number(b.threeYear_Ret).toFixed(2) || 'N/A'}</td>
        <td class='schemenum'>${Number(b.fiveYear_Ret).toFixed(2) === 'NaN' ? 'N/A' : Number(b.fiveYear_Ret).toFixed(2) || 'N/A'}</td>
        <td class='schemenum'>${Number(b.sevenYear_Ret).toFixed(2) === 'NaN' ? 'N/A' : Number(b.sevenYear_Ret).toFixed(2) || 'N/A'}</td>
        <td class='schemenum'>${Number(b.tenYear_Ret).toFixed(2) === 'NaN' ? 'N/A' : Number(b.tenYear_Ret).toFixed(2) || 'N/A'}</td>
        <td class='schemenum'>${Number(b.inception_Ret).toFixed(2) === 'NaN' ? 'N/A' : Number(b.inception_Ret).toFixed(2) || 'N/A'}</td>
      </tr>
    `;
      tableWrapper.innerHTML += row2;
    });
  }

  function displaytablecurrentvalue() {
    const returnValue = [];
    const planCode = localStorage.getItem('planCode') || 'Direct:LM';
    const planslabel = planCode.split(':')[1];
    const planObj = dataCfObj.filter((el) => planslabel === el.schcode);
    const cfObj = planObj;
    cfObj[0].returns.forEach((ret) => {
      if ((ret.plancode + ret.optioncode) === dataMapMoObj.gropcodevalue) {
        returnValue.push(ret);
      }
    });

    const tab2table = table();
    tab2table.append(tabpanel2);
    const row3 = `
      <tr> <td class='schemename'>${cfObj[0].schDetail.schemeName || ''}</td>
      <td class='schDetailnum'>${Number(returnValue[0].oneYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(returnValue[0].oneYear_marketValue).toFixed(2)}</td>
      <td class='schDetailnum'>${Number(returnValue[0].threeYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(returnValue[0].threeYear_marketValue).toFixed(2)}</td>
      <td class='schDetailnum'>${Number(returnValue[0].fiveYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(returnValue[0].fiveYear_marketValue).toFixed(2)}</td>
      <td class='schDetailnum'>${Number(returnValue[0].sevenYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(returnValue[0].sevenYear_marketValue).toFixed(2)}</td>
      <td class='schDetailnum'>${Number(returnValue[0].tenYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(returnValue[0].tenYear_marketValue).toFixed(2)}</td>
      <td class='schDetailnum'>${Number(returnValue[0].inception_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(returnValue[0].inception_marketValue).toFixed(2)}</td>
      </tr>`;
    tab2table.innerHTML += row3;

    cfObj[0].benchmarkreturns.forEach((b) => {
      const row4 = `
      <tr class="trbackgroundcolor"><td class='schemename'>${b.groupName}</td>
        <td class='schemenum'>${Number(b.oneYear_marketValue).toFixed(2) === 'NaN' ? 'N/A' : Number(b.oneYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.threeYear_marketValue).toFixed(2) === 'NaN' ? 'N/A' : Number(b.threeYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.fiveYear_marketValue).toFixed(2) === 'NaN' ? 'N/A' : Number(b.fiveYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.sevenYear_marketValue).toFixed(2) === 'NaN' ? 'N/A' : Number(b.sevenYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.tenYear_marketValue).toFixed(2) === 'NaN' ? 'N/A' : Number(b.tenYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.inception_marketValue).toFixed(2) === 'NaN' ? 'N/A' : Number(b.inception_marketValue).toFixed(2) || ''}</td>
        </tr>`;
      tab2table.innerHTML += row4;
    });
    tab2innerdivpanel2.innerHTML = ' ';
    tab2innerdivpanel2.append(tab2table);
  }

  if (block.closest('.periodicreturn')) {
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('tab-btn');
    const container = block.closest('.periodicreturn');
    const defaultwrapper = container.querySelectorAll('.default-content-wrapper');
    const btnwrapper = container.querySelectorAll('.tabs-tab');
    btnwrapper.forEach((el) => {
      divWrapper.appendChild(el);
    });
    const listwrapper = container.querySelector('.tabs-list');
    listwrapper.innerHTML = '';
    defaultwrapper.forEach((el, index) => (index === 0 ? listwrapper.appendChild(el) : ''));
    listwrapper.appendChild(divWrapper);
    const headertitle = defaultwrapper[1];
    tab2innerdiv = document.querySelector(
      '.periodicreturn .tabpanel1 > div',
    );
    tab2innerdivpanel2 = document.querySelector(
      '.periodicreturn .tabpanel2 > div',
    );

    tableWrapper = table();
    const firsttr = tr();
    firsttr.classList.add('authertr');
    Array.from(headertitle.querySelectorAll('li')).map((el) => {
      const lith = th(el.textContent.trim());
      lith.classList.add('autherth');
      firsttr.append(lith);
      return lith;
    });
    tabpanel2 = firsttr.cloneNode(true);
    tableWrapper.append(firsttr);
    /// ////////last div//////////
    const extradatawrappper = document.createElement('div');
    extradatawrappper.classList.add('tab-extradata');
    headertitle.querySelectorAll('p').forEach((e) => {
      extradatawrappper.append(e);
    });
    const tabpanelextradata = extradatawrappper.cloneNode(true);
    const hideli = document.querySelector('.periodicreturn > .default-content-wrapper >ul');
    hideli.style.display = 'none';

    displaytableCAGR();
    tab2innerdiv.append(extradatawrappper);
    const tab2pannel2 = document.getElementById(
      'tab-current-value-of-investment-of-10-000',
    );
    tab2pannel2.addEventListener('click', () => {
      displaytablecurrentvalue();
      tab2innerdivpanel2.append(tabpanelextradata);
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
    //   const wrapper = createEl("div", { class: "chart-wrapper" });
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
  if (block.parentElement.parentElement.classList.contains('tabdiv')) {
    const planCode = localStorage.getItem('planCode') || 'Direct:LM';
    const planslabel = planCode.split(':')[1];
    const planObj = dataCfObj.filter((el) => planslabel === el.schcode);
    dataMapMoObj.scheme = planObj;
    generateBarChart(planObj[0].sector);
  }
  const tabButtons = document.querySelectorAll('.tabs-tab');
  tabButtons.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      const tabId = tabBtn.id.replace('tab-', '');
      const panel = document.getElementById(`tabpanel-${tabId}`);
      if (tabId === 'sector-holdings') {
        // dataselected = dataCfObj[0].sector
        if (panel && !panel.querySelector('.chart-wrapper')) {
          const chart = generateBarChart(dataMapMoObj.scheme[0].sector);// (dataCfObj[0].sector);
          panel.appendChild(chart);
        }
      } else if (tabId === 'stock-holdings') {
        // dataselected = dataCfObj[0].holdings
        if (panel && !panel.querySelector('.chart-wrapper')) {
          const chart = generateBarChartHoldings(dataMapMoObj.scheme[0].holdings);
          panel.appendChild(chart);
        }
      }
    });
  });

  /// //////////////////////first Tab ////////////////////////////

  if (block.closest('.page-faq-section')) {
    dataMapMoObj.CLASS_PREFIXES = [];
    dataMapMoObj.CLASS_PREFIXES = ['itemfaq', 'subitemfaq'];
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

    searchFireld.addEventListener('focus', () => {
      searchFireld.closest('.search-wrapper').classList.add('search-active');
      if (!Array.from(dropdown.classList).includes('dropdown-active')) {
        dropdown.classList.add('dropdown-active');
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
            const uldorp = block.querySelector('.tablist-search .dropdownlist');
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
                    iteminner.innerHTML = originalText.replace(regex, (matcheck) => `<strong>${matcheck}</strong>`);
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
                          uldorp.classList.remove('dropdown-active');
                          block.querySelector(`#${tabpanelText}`).scrollIntoView({ behavior: 'smooth' });
                          counter = 1;
                        }
                      });
                      searchInput.innerHTML = '';
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
      if (!el.contains(event.target)) {
        el.querySelector('.dropdown-list').classList.remove('dropdown-active');
      }
    });
  });
}
