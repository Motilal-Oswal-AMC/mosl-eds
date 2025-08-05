/* eslint-disable */
import {
  div, a, label, input, span, button, ul, h3, p as pTag,
} from '../../scripts/dom-helpers.js';
import dataCfObj from '../../scripts/dataCfObj.js';

export default function decorate(block) {
  // --- 1. INITIAL SETUP & STATE ---
  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');
  const col4 = block.children[3].querySelectorAll('p');

  const schemeNames = dataCfObj.map((fund) => fund.schDetail.schemeName);

  let selectedFund = dataCfObj.find((fund) => fund.schcode === 'CP');
  let returnCAGR = 0;
  let mode = 'sip';
  let planType = 'Direct';
  let planOption = 'Growth';
  let selectedFundName = selectedFund.schDetail.schemeName;

  // --- 2. DOM CREATION ---
  const calContainer = div({ class: 'cal-container' },
    div({ class: 'search-bar-wrapper' },
      span(col1[0].textContent.trim()),
      input({ value: selectedFund.schDetail.schemeName, type: 'text', placeholder: 'Search a fund', id: 'searchFundInput', role: 'combobox', 'aria-autocomplete': 'list', 'aria-expanded': 'false' }),
      div({ class: 'search-results-wrapper' }, ul({ id: 'searchResults', role: 'listbox' })),
    ),
    div({ class: 'scheme-btns-wrapper' },
      button({ class: 'sip-btn active' }, col1[2].textContent.trim()),
      button({ class: 'lumpsum-btn' }, col1[3].textContent.trim()),
    ),
    div({ class: 'plan-options-wrapper' },
      div({ class: 'plan-type-toggle' },
        span({ class: 'toggle-label active' }, 'Direct'),
        label({ class: 'toggle-switch' }, input({ type: 'checkbox', id: 'planToggle' }), span({ class: 'slider' })),
        span({ class: 'toggle-label' }, 'Regular'),
      ),
      div({ class: 'plan-option-select custom-select-plan' },
        div({ class: 'select-selected-plan' }, 'Growth'),
        div({ class: 'select-options-plan' }),
        input({ type: 'hidden', id: 'planOption', value: 'Growth' }),
      ),
    ),
    div({ class: 'investment-wrapper' },
      div({ class: 'sip-wrapper' },
        label({ class: 'labelforsip' }, col2[0].textContent.trim()),
        label({ class: 'labelforlumsum', style: 'display:none' }, col2[1].textContent.trim()),
        div({ class: 'input-with-symbol' },
          input({ type: 'number', value: col2[2].textContent.trim(), id: 'investmentAmount', placeholder: 'Enter amount' }),
        ),
      ),
      div({ class: 'tenure-wrapper custom-select' },
        label(col2[3].textContent.trim()),
        div({ class: 'select-selected' }, `${col3[0].textContent.trim()} Years`),
        div({ class: 'select-options', role: 'listbox' }),
        input({ type: 'hidden', id: 'investmentTenure', value: col3[0].textContent.trim() }),
      ),
    ),
    div({ class: 'invested-amount' },
      label(col3[1].textContent.trim()),
      span({ class: 'invested-amount-value' }, col3[2].textContent.trim()),
    ),
    div({ class: 'cal-discription' },
      div({ class: 'current-value-wrapper' },
        label(col3[3].textContent.trim()),
        span({ class: 'current-value' }, '0'),
      ),
      div({ class: 'return-cagr-wrapper' },
        label(col4[1].textContent.trim()),
        span({ class: 'return-cagr' }, `${returnCAGR.toFixed(2)}%`),
      ),
      div({ class: 'start-sip-btn' }, button(col4[3].textContent.trim())),
    ),
  );
  const viewOthCalBtn = div({ class: 'view-btn-cal' }, a({ href: col4[5].querySelector('a')?.href || '#', class: 'view-othercal-btn' }, col4[4].textContent.trim()));
  block.innerHTML = '';
  block.append(calContainer, viewOthCalBtn);

  // --- 3. DOM ELEMENT REFERENCES ---
  const sipBtn = calContainer.querySelector('.sip-btn');
  const lumpsumBtn = calContainer.querySelector('.lumpsum-btn');
  const amountInput = calContainer.querySelector('#investmentAmount');
  const searchInput = document.getElementById('searchFundInput');
  const searchResults = document.getElementById('searchResults');

  // --- 4. LOGIC FUNCTIONS (UNCHANGED)---

  function updateValues() {
    const investedAmountSpan = block.querySelector('.invested-amount-value');
    const currentValueSpan = block.querySelector('.current-value');
    const returnCAGRSpan = block.querySelector('.return-cagr');
    const tenureValue = block.querySelector('#investmentTenure').value;
    const amount = parseFloat(amountInput.value) || 0;
    let tenure = 0;
    if (tenureValue === 'inception') {
      if (selectedFund && selectedFund.dateOfAllotment) {
        const inceptionDate = new Date(selectedFund.dateOfAllotment);
        const today = new Date();
        tenure = (today.getTime() - inceptionDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      }
    } else {
      tenure = parseFloat(tenureValue) || 0;
    }
    const mainSections = ['.investment-wrapper', '.invested-amount', '.cal-discription'];
    const noReturnsMsg = block.querySelector('.no-returns-msg');
    if (!returnCAGR || isNaN(returnCAGR) || returnCAGR <= 0) {
      investedAmountSpan.textContent = '—';
      currentValueSpan.textContent = '—';
      returnCAGRSpan.textContent = '—';
      mainSections.forEach((sel) => { block.querySelector(sel).style.display = 'none'; });
      if (!noReturnsMsg) {
        const msg = div({ class: 'no-returns-msg' }, 'Returns are not available for the selected plan.');
        calContainer.appendChild(msg);
      }
      return;
    }
    if (noReturnsMsg) noReturnsMsg.remove();
    mainSections.forEach((sel) => { block.querySelector(sel).style.display = ''; });
    const r = returnCAGR / 100 / 12;
    const n = tenure * 12;
    let investedAmount = 0;
    let futureValue = 0;
    if (mode === 'sip') {
      investedAmount = amount * n;
      futureValue = isNaN(r) || r === 0 ? investedAmount : amount * (((1 + r) ** n - 1) / r);
    } else {
      investedAmount = amount;
      const lumpsumRate = returnCAGR / 100;
      futureValue = amount * ((1 + lumpsumRate) ** tenure);
    }
    investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`;
    currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`;
    returnCAGRSpan.textContent = `${parseFloat(returnCAGR).toFixed(2)}%`;
  }
  function updateTenureOptions(returnsData) {
    const wrapper = block.querySelector('.tenure-wrapper');
    const optionsContainer = wrapper.querySelector('.select-options');
    const selectedDisplay = wrapper.querySelector('.select-selected');
    const hiddenInput = wrapper.querySelector('#investmentTenure');
    optionsContainer.innerHTML = '';
    const availableTenures = [];
    if (returnsData && returnsData.inception_Ret) availableTenures.push({ value: 'inception', text: 'Since Inception' });
    if (returnsData && returnsData.oneYear_Ret) availableTenures.push({ value: 1, text: '1 Year' });
    if (returnsData && returnsData.threeYear_Ret) availableTenures.push({ value: 3, text: '3 Years' });
    if (returnsData && returnsData.fiveYear_Ret) availableTenures.push({ value: 5, text: '5 Years' });
    if (returnsData && returnsData.sevenYear_Ret) availableTenures.push({ value: 7, text: '7 Years' });
    if (returnsData && returnsData.tenYear_Ret) availableTenures.push({ value: 10, text: '10 Years' });
    availableTenures.forEach((tenure) => {
      const optionEl = div({ class: 'select-option', 'data-value': tenure.value }, tenure.text);
      optionEl.addEventListener('click', () => {
        selectedDisplay.textContent = tenure.text;
        hiddenInput.value = tenure.value;
        optionsContainer.classList.remove('open');
        updateValues();
      });
      optionsContainer.append(optionEl);
    });
    if (availableTenures.length > 0) {
      const defaultTenure = availableTenures[availableTenures.length - 1];
      selectedDisplay.textContent = defaultTenure.text;
      hiddenInput.value = defaultTenure.value;
    } else {
      selectedDisplay.textContent = 'N/A';
      hiddenInput.value = 0;
    }
  }
  function updatePlanOptions(fund) {
    const wrapper = block.querySelector('.custom-select-plan');
    const optionsContainer = wrapper.querySelector('.select-options-plan');
    const selectedDisplay = wrapper.querySelector('.select-selected-plan');
    const hiddenInput = wrapper.querySelector('#planOption');
    optionsContainer.innerHTML = '';
    if (!fund || !fund.planList) return;
    const filteredPlans = fund.planList.filter((p) => p.planName === planType);
    // two - RM11
    const uniqueOptionNames = [...new Set(filteredPlans.map((p) => p.optionName))];
    uniqueOptionNames.forEach((name) => {
      const optionEl = div({ class: 'select-option-plan', 'data-value': name }, name);
      optionEl.addEventListener('click', () => {
        selectedDisplay.textContent = name;
        hiddenInput.value = name;
        planOption = name;
        optionsContainer.classList.remove('open');
        updateReturnRate();
      });
      optionsContainer.append(optionEl);
    });
    if (uniqueOptionNames.length > 0) {
      const defaultPlanName = uniqueOptionNames.includes('Growth') ? 'Growth' : uniqueOptionNames[0];
      selectedDisplay.textContent = defaultPlanName;
      hiddenInput.value = defaultPlanName;
      planOption = defaultPlanName;
    }
  }
  function updateReturnRate() {
    if (!selectedFund) return;
    const targetPlan = selectedFund.planList.find((p) => p.planName === planType && p.optionName === planOption);
    let targetReturns = null;
    if (targetPlan) {
      targetReturns = selectedFund.returns.find((r) => r.plancode === targetPlan.planCode && r.optioncode === targetPlan.optionCode);
    }
    // one RM11 
    returnCAGR = (targetReturns && targetReturns.inception_Ret) ? parseFloat(targetReturns.inception_Ret) : 0;
    updateTenureOptions(targetReturns);
    updateValues();
  }

  // --- 5. EVENT LISTENERS & INITIALIZATION ---

  // ✅ THIS IS THE ONLY SECTION THAT HAS BEEN REWRITTEN.
  // It handles both dropdowns cleanly and without conflicts.

  // Logic for Tenure Dropdown
  const tenureSelect = block.querySelector('.tenure-wrapper.custom-select');
  const tenureSelectedDisplay = tenureSelect.querySelector('.select-selected');
  const tenureOptionsContainer = tenureSelect.querySelector('.select-options');

  tenureSelectedDisplay.addEventListener('click', (e) => {
    e.stopPropagation();
    block.querySelector('.select-options-plan').classList.remove('open'); // Close other dropdown
    tenureOptionsContainer.classList.toggle('open');
  });

  // Logic for Plan Option Dropdown
  const planSelect = block.querySelector('.custom-select-plan');
  const planSelectedDisplay = planSelect.querySelector('.select-selected-plan');
  const planOptionsContainer = planSelect.querySelector('.select-options-plan');

  planSelectedDisplay.addEventListener('click', (e) => {
    e.stopPropagation();
    block.querySelector('.tenure-wrapper .select-options').classList.remove('open'); // Close other dropdown
    planOptionsContainer.classList.toggle('open');
  });

  // Close any open dropdown when clicking outside
  document.addEventListener('click', () => {
    block.querySelectorAll('.select-options.open, .select-options-plan.open').forEach(c => c.classList.remove('open'));
  });

  // Your existing search logic, with the corrected update sequence
  let currentFocus = -1;
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    currentFocus = -1;
    const filtered = query ? schemeNames.filter(name => name.toLowerCase().includes(query)) : schemeNames;
    filtered.forEach(name => {
      const li = document.createElement('li');
      li.innerHTML = name.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>');
      li.addEventListener('click', () => {
        searchInput.value = name;
        selectedFund = dataCfObj.find((f) => f.schDetail.schemeName === name);
        searchResults.innerHTML = '';
        updatePlanOptions(selectedFund);
        updateReturnRate();
      });
      searchResults.appendChild(li);
    });
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('li');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      currentFocus++;
      addActive(items);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      currentFocus--;
      addActive(items);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1) items[currentFocus].click();
    } else if (e.key === 'Escape') {
      searchResults.innerHTML = '';
      currentFocus = -1;
      searchInput.setAttribute('aria-expanded', 'false');
      searchInput.blur();
      if (searchInput.value.trim() === '') {
        searchInput.value = selectedFundName;
      }
    }
  });

  const sipLabel = block.querySelector('.labelforsip');
  const lumpsumLabel = block.querySelector('.labelforlumsum');
  sipBtn.addEventListener('click', () => { mode = 'sip'; sipBtn.classList.add('active'); lumpsumBtn.classList.remove('active'); sipLabel.style.display = ''; lumpsumLabel.style.display = 'none'; updateValues(); });
  lumpsumBtn.addEventListener('click', () => { mode = 'lumpsum'; lumpsumBtn.classList.add('active'); sipBtn.classList.remove('active'); sipLabel.style.display = 'none'; lumpsumLabel.style.display = ''; updateValues(); });
  amountInput.addEventListener('input', updateValues);

  const planToggle = block.querySelector('#planToggle');
  planToggle.addEventListener('change', () => {
    planType = planToggle.checked ? 'Regular' : 'Direct';
    block.querySelectorAll('.toggle-label').forEach(l => l.classList.toggle('active'));
    updatePlanOptions(selectedFund);
    updateReturnRate();
  });

  function addActive(items) {
    if (!items) return;
    items.forEach((item) => item.classList.remove('active'));
    if (currentFocus >= items.length) currentFocus = items.length - 1;
    if (currentFocus < 0) currentFocus = 0;
    items[currentFocus].classList.add('active');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
  }

  // --- 6. LAYOUT RESTRUCTURING ---
  const sectionHero = block.closest('.section');
  if (sectionHero) {
    const hero = sectionHero.querySelector('.default-content-wrapper');
    if (hero && !hero.querySelector('.hero-image')) {
      const iconPara = hero.querySelector('p:has(img)');
      const heading = hero.querySelector('h3');
      const paras = hero.querySelectorAll('p');
      hero.innerHTML = '';
      const heroImage = div({ class: 'hero-image' }, iconPara);
      const heroText = div({ class: 'hero-text' }, heading, ...[...paras].filter((p) => p !== iconPara));
      hero.append(heroImage, heroText);
    }
    const calculatorBlockWrapper = block.closest('.calculator-sip-wrapper');
    const section = calculatorBlockWrapper?.closest('.section');
    if (section) {
      const heroWrap = section.querySelector('.default-content-wrapper');
      const calcWrap = section.querySelector('.calculator-sip-wrapper');
      if (heroWrap && calcWrap && !section.querySelector('.compounding-two-inner')) {
        const wrapper = div({ class: 'compounding-two-inner' });
        section.insertBefore(wrapper, heroWrap);
        wrapper.append(heroWrap, calcWrap);
      }
    }
  }

  // --- 7. INITIAL LOAD ---
  updatePlanOptions(selectedFund);
  updateReturnRate();
}