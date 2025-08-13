import { toClassName } from '../../scripts/aem.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import fundCardblock from '../fund-card/fund-card.js';
import {
  button, a, table, tr, th
} from '../../scripts/dom-helpers.js';

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
    let dataCf = dataCfObj.slice(1, 5);

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
    let dataCf = dataCfObj.slice(1, 5);

    Array.from(tablist.children).forEach((element) => {
      element.addEventListener('click', (event) => {
        block.querySelectorAll('.tabs-panel').forEach((el) => {
          el.style.display = 'none';
        });

        if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-trending-funds') {
          dataCf = dataCfObj.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-international-equity') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:international-equity') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-hybrid-balanced') { // tabpanel-index
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:hybrid-&-balanced') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-index') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:index-funds') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-etfs') {
          dataCf = dataCfObj.map((elem) => ([...elem.fundsTaggingSection].includes('motilal-oswal:etf') ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
        } else if (event.currentTarget.getAttribute('aria-controls') === 'tabpanel-others') {
          dataCf = dataCfObj.map((elem) => (elem.sebiSubCategory === 'Other ETF' ? elem : ''));
          dataCf = dataCf.filter((el) => el);
          dataCf = dataCf.slice(1, 5);
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

  /// ///ak 06-08-25//
  let tabpanel2;
  let tab2innerdiv;
  let tableWrapper;
  let tab2innerdivpanel2;

  function displaytableCAGR() {
    tab2innerdiv.innerHTML = '';
    tab2innerdiv.append(tableWrapper);
    const row1 = `
      <tr>
        <td class='schemename'>${dataCfObj[0].schDetail.schemeName || ''}</td>
        <td class='schDetailnum'>${dataCfObj[0].returns[0].oneYear_Ret || ''}</td>
        <td class='schDetailnum'>${dataCfObj[0].returns[0].threeYear_Ret || ''}</td>
        <td class='schDetailnum'>${dataCfObj[0].returns[0].fiveYear_Ret || ''}</td>
        <td class='schDetailnum'>${dataCfObj[0].returns[0].sevenYear_Ret || ''}</td>
        <td class='schDetailnum'>${dataCfObj[0].returns[0].tenYear_Ret || ''}</td>
        <td class='schDetailnum'>${dataCfObj[0].returns[0].inception_Ret || ''}</td>
      </tr>`;
    tableWrapper.innerHTML += row1;

    dataCfObj[0].benchmarkreturns.forEach((b) => {
      const row2 = `<tr class="trbackgroundcolor">
        <td class='schemename'>${b.groupName}</td>
        <td class='schemenum'>${Number(b.oneYear_Ret).toFixed(2) === 'NaN' ? '' : Number(b.oneYear_Ret).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.threeYear_Ret).toFixed(2) === 'NaN' ? '' : Number(b.threeYear_Ret).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.fiveYear_Ret).toFixed(2) === 'NaN' ? '' : Number(b.fiveYear_Ret).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.sevenYear_Ret).toFixed(2) === 'NaN' ? '' : Number(b.sevenYear_Ret).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.tenYear_Ret).toFixed(2) === 'NaN' ? '' : Number(b.tenYear_Ret).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.inception_Ret).toFixed(2) === 'NaN' ? '' : Number(b.inception_Ret).toFixed(2) || ''}</td>
      </tr>
    `;
      tableWrapper.innerHTML += row2;
    });
  }

  function displaytablecurrentvalue() {
    const tab2table = table();
    tab2table.append(tabpanel2);
    const row3 = `
      <tr> <td class='schemename'>${dataCfObj[0].schDetail.schemeName || ''}</td>
      <td class='schDetailnum'>${dataCfObj[0].returns[0].oneYear_Ret || ''}</td>
      <td class='schDetailnum'>${dataCfObj[0].returns[0].threeYear_Ret || ''}</td>
      <td class='schDetailnum'>${dataCfObj[0].returns[0].fiveYear_Ret || ''}</td>
      <td class='schDetailnum'>${dataCfObj[0].returns[0].sevenYear_Ret || ''}</td>
      <td class='schDetailnum'>${dataCfObj[0].returns[0].tenYear_Ret || ''}</td>
      <td class='schDetailnum'>${dataCfObj[0].returns[0].inception_Ret || ''}</td>
      </tr>`;
    tab2table.innerHTML += row3;

    dataCfObj[0].benchmarkreturns.forEach((b) => {
      const row4 = `
      <tr class="trbackgroundcolor"><td class='schemename'>${b.groupName}</td>
        <td class='schemenum'>${Number(b.OneYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(b.OneYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.ThreeYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(b.ThreeYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.FiveYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(b.FiveYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.SevenYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(b.SevenYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.TenYear_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(b.TenYear_marketValue).toFixed(2) || ''}</td>
        <td class='schemenum'>${Number(b.Inception_marketValue).toFixed(2) === 'NaN' ? ' ' : Number(b.Inception_marketValue).toFixed(2) || ''}</td>
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
    const tabblock = document.getElementsByClassName('tabdiv')[1];
    tabblock.appendChild(wrapper);
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
    const tabblock = document.getElementsByClassName('tabdiv')[1];
    tabblock.appendChild(wrapper);
    return wrapper;
  }
  if (block.parentElement.parentElement.classList.contains('tabdiv')) {
    generateBarChart(dataCfObj[0].sector);
  }
  const tabButtons = document.querySelectorAll('.tabs-tab');
  tabButtons.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      const tabId = tabBtn.id.replace('tab-', '');
      const panel = document.getElementById(`tabpanel-${tabId}`);
      if (tabId === 'sector-holdings') {
        // dataselected = dataCfObj[0].sector
        if (panel && !panel.querySelector('.chart-wrapper')) {
          const chart = generateBarChart(dataCfObj[0].sector);
          panel.appendChild(chart);
        }
      } else if (tabId === 'stock-holdings') {
        // dataselected = dataCfObj[0].holdings
        if (panel && !panel.querySelector('.chart-wrapper')) {
          const chart = generateBarChartHoldings(dataCfObj[0].holdings);
          panel.appendChild(chart);
        }
      }
    });
  });

  /// //////////////////////first Tab ////////////////////////////
}
