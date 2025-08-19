/*  eslint-disable   */
import {
  div, a, label, input, span, button, ul, h3, p as pTag,
} from '../../scripts/dom-helpers.js';
import dataCfObj from '../../scripts/dataCfObj.js';

export default function decorate(block) {
  // -------------------------------
  // ✅ 1. INITIAL SETUP & STATE
  // -------------------------------
  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');
  const col4 = block.children[3].querySelectorAll('p');

  const schemeNames = dataCfObj.map((fund) => fund.schDetail.schemeName);

  let selectedFund = dataCfObj.find((fund) => fund.schcode === 'FM'); // CP
  let returnCAGR = 0;
  let mode = 'sip';
  let planType = 'Direct';
  let planOption = 'Growth';
  const selectedFundName = selectedFund.schDetail.schemeName;

  // -------------------------------
  // ✅ 2. BUILD MAIN CALCULATOR UI
  // -------------------------------
  const calContainer = div(
    { class: 'cal-container' },
    // 🔍 Fund search input
    div(
      { class: 'search-bar-wrapper' },
      span(col1[0].textContent.trim()),
      input({
        value: selectedFund.schDetail.schemeName,
        type: 'text',
        placeholder: 'Search a fund',
        id: 'searchFundInput',
        role: 'combobox',
        'aria-label':'Search for products', 
        'aria-autocomplete':'list',
        'aria-expanded': 'false',
      }),
      div({ class: 'search-results-wrapper' }, ul({ id: 'searchResults', role: 'listbox' })),
    ),

    div({class : 'spi-wrapper'}, 
    // 🔄 SIP & Lumpsum toggle
    div(
      { class: 'scheme-btns-wrapper' },
      button({ class: 'sip-btn active' }, col1[2].textContent.trim()),
      button({ class: 'lumpsum-btn' }, col1[3].textContent.trim()),
    ),

    // 🔀 Direct/Regular toggle & plan options
    div(
      { class: 'plan-options-wrapper' },
      div(
        { class: 'plan-type-toggle' },
        span({ class: 'toggle-label active' }, 'Direct'),
        label({ class: 'toggle-switch' }, input({ type: 'checkbox', id: 'planToggle' }), span({ class: 'slider' })),
        span({ class: 'toggle-label' }, 'Regular'),
      ),
      div(
        { class: 'plan-option-select custom-select-plan' },
        div({ class: 'select-selected-plan' }, 'Growth'),
        div({ class: 'select-options-plan' }),
        input({ type: 'hidden', id: 'planOption', value: 'Growth' }),
      ),
    ),

    // 💰 Amount input & tenure dropdown
    div(
      { class: 'investment-wrapper' },
      div(
        { class: 'sip-wrapper' },
        label({ class: 'labelforsip' }, col2[0].textContent.trim()),
        label({ class: 'labelforlumsum', style: 'display:none' }, col2[1].textContent.trim()),
        div(
          { class: 'input-with-symbol' },
          input({
            type: 'number',
            value: col2[2].textContent.trim(),
            id: 'investmentAmount',
            placeholder: 'Enter amount',
          }),
        ),
      ),
      div(
        { class: 'tenure-wrapper custom-select' },
        label(col2[3].textContent.trim()),
        div({ class: 'select-selected' }, `${col3[0].textContent.trim()} Years`),
        div({ class: 'select-options', role: 'listbox' }),
        input({ type: 'hidden', id: 'investmentTenure', value: col3[0].textContent.trim() }),
      ),
    ),
  ),

    div({class : 'incal-wrapper'}, 
    // 📈 Invested amount & calculation
    div(
      { class: 'invested-amount' },
      label(col3[1].textContent.trim()),
      span({ class: 'invested-amount-value' }, col3[2].textContent.trim()),
    ),
    div(
      { class: 'cal-discription' },
      div(
        { class: 'current-value-wrapper' },
        label(col3[3].textContent.trim()),
        span({ class: 'current-value' }, '0'),
      ),
      div(
        { class: 'return-cagr-wrapper' },
        label(col4[1].textContent.trim()),
        span({ class: 'return-cagr' }, `${returnCAGR.toFixed(2)}  %`),
      ),
      div({ class: 'start-sip-btn' }, button(col4[3].textContent.trim())),
    )),
  );

  // 🔗 View other calculators
  const viewOthCalBtn = div(
    { class: 'view-btn-cal' },
    a({ href: col4[5].querySelector('a')?.href || '#', class: 'view-othercal-btn' }, col4[4].textContent.trim()),
  );

  block.innerHTML = '';
  block.append(calContainer, viewOthCalBtn);
  // block.append(calContainer);

  // -------------------------------
  // ✅ 3. DOM REFS
  // -------------------------------
  const sipBtn = calContainer.querySelector('.sip-btn');
  const lumpsumBtn = calContainer.querySelector('.lumpsum-btn');
  const amountInput = calContainer.querySelector('#investmentAmount');
  const searchInput = document.getElementById('searchFundInput');
  const searchResults = document.getElementById('searchResults');

  // -------------------------------
  // ✅ 4. UPDATE VALUES
  // -------------------------------
  // function updateValues() {
  //   const investedAmountSpan = block.querySelector('.invested-amount-value');
  //   const currentValueSpan = block.querySelector('.current-value');
  //   const returnCAGRSpan = block.querySelector('.return-cagr');
  //   const tenureValue = block.querySelector('#investmentTenure').value;
  //   const amount = parseFloat(amountInput.value) || 0;
  //   let tenure = tenureValue === 'inception'
  //     ? (new Date().getTime() - new Date(selectedFund.dateOfAllotment).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  //     : parseFloat(tenureValue) || 0;

  //   // If no returns, hide & show fallback
  //   const mainSections = ['.investment-wrapper', '.invested-amount', '.cal-discription'];
  //   const noReturnsMsg = block.querySelector('.no-returns-msg');
  //   if (!returnCAGR || isNaN(returnCAGR) || returnCAGR <= 0) {
  //     investedAmountSpan.textContent = '—';
  //     currentValueSpan.textContent = '—';
  //     returnCAGRSpan.textContent = '—';
  //     mainSections.forEach((sel) => { block.querySelector(sel).style.display = 'none'; });
  //     if (!noReturnsMsg) {
  //       calContainer.appendChild(div({ class: 'no-returns-msg' }, 'Returns are not available for the selected plan.'));
  //     }
  //     return;
  //   }
  //   if (noReturnsMsg) noReturnsMsg.remove();
  //   mainSections.forEach((sel) => { block.querySelector(sel).style.display = ''; });

  //   const r = returnCAGR / 100 / 12;
  //   const n = tenure * 12;
  //   let investedAmount = mode === 'sip' ? amount * n : amount;
  //   let futureValue = mode === 'sip'
  //     ? (isNaN(r) || r === 0 ? investedAmount : amount * (((1 + r) ** n - 1) / r))
  //     : amount * ((1 + returnCAGR / 100) ** tenure);

  //   investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`;
  //   currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`;
  //   returnCAGRSpan.textContent = `${parseFloat(returnCAGR).toFixed(2)}%`;
  // }


  const inputEl = document.getElementById("investmentAmount");
  inputEl.addEventListener("input", (e) => {
    let val = +e.target.value;
    if (val > 1000000) {
      e.target.value = e.target.value.slice(0, -1);
    }
  });

  // -------------------------------
  // ✅ 4. UPDATE VALUES (FINAL)
  // -------------------------------
  function updateValues() {
    const investedAmountSpan = block.querySelector('.invested-amount-value');
    const currentValueSpan = block.querySelector('.current-value');
    const returnCAGRSpan = block.querySelector('.return-cagr');
    const tenureValue = block.querySelector('#investmentTenure').value;
    const amount = parseFloat(amountInput.value) || 0;

    if (amount > 1000000) {
      return false;
    }

    let tenure = 0;

    // ✅ Determine tenure in years
    if (tenureValue === 'inception') {
      if (selectedFund?.dateOfAllotment) {
        const inceptionDate = new Date(selectedFund.dateOfAllotment);
        const today = new Date();
        tenure = (today - inceptionDate) / (1000 * 60 * 60 * 24 * 365.25);
      }
    } else {
      tenure = parseFloat(tenureValue) || 0;
    }

    // ✅ Get the correct returnCAGR for selected tenure
    let tenureField = '';
    if (tenureValue === 'inception') {
      tenureField = 'inception_Ret';
    } else if (tenureValue === '1') {
      tenureField = 'oneYear_Ret';
    } else if (tenureValue === '3') {
      tenureField = 'threeYear_Ret';
    } else if (tenureValue === '5') {
      tenureField = 'fiveYear_Ret';
    } else if (tenureValue === '7') {
      tenureField = 'sevenYear_Ret';
    } else if (tenureValue === '10') {
      tenureField = 'tenYear_Ret';
    }

    const targetPlan = selectedFund?.planList.find(
      (p) => p.planName === planType && p.optionName === planOption,
    );
    const targetReturns = selectedFund?.returns.find(
      (r) => r.plancode === targetPlan?.planCode && r.optioncode === targetPlan?.optionCode,
    );

    returnCAGR = targetReturns && tenureField && targetReturns[tenureField]
      ? parseFloat(targetReturns[tenureField]) || 0
      : 0;

    // ✅ If no returns, show fallback
    const mainSections = ['.investment-wrapper', '.invested-amount', '.cal-discription'];
    const noReturnsMsg = block.querySelector('.no-returns-msg');
    if (!returnCAGR || isNaN(returnCAGR) || returnCAGR <= 0) {
      investedAmountSpan.textContent = '—';
      currentValueSpan.textContent = '—';
      returnCAGRSpan.textContent = '—';
      mainSections.forEach((sel) => { block.querySelector(sel).style.display = 'none'; });
      if (!noReturnsMsg) {
        calContainer.appendChild(div({ class: 'no-returns-msg' }, 'Returns are not available for the selected plan.'));
      }
      return;
    }
    if (noReturnsMsg) noReturnsMsg.remove();
    mainSections.forEach((sel) => { block.querySelector(sel).style.display = ''; });

    // ✅ Calculate values
    const r = returnCAGR / 100 / 12;
    const n = tenure * 12;
    const investedAmount = mode === 'sip' ? amount * n : amount;
    const futureValue = mode === 'sip'
      ? (isNaN(r) || r === 0 ? investedAmount : amount * (((1 + r) ** n - 1) / r))
      : amount * ((1 + returnCAGR / 100) ** tenure);

    investedAmountSpan.textContent = `${(investedAmount / 100000).toFixed(2)} Lac`;
    currentValueSpan.textContent = `${(futureValue / 100000).toFixed(2)} Lac`;
    returnCAGRSpan.textContent = `${parseFloat(returnCAGR).toFixed(2)} %`;
  }

  // -------------------------------
  // ✅ 5. TENURE & PLAN OPTIONS
  // -------------------------------
  function updateTenureOptions(returnsData) {
    const wrapper = block.querySelector('.tenure-wrapper');
    const optionsContainer = wrapper.querySelector('.select-options');
    const selectedDisplay = wrapper.querySelector('.select-selected');
    const hiddenInput = wrapper.querySelector('#investmentTenure');
    optionsContainer.innerHTML = '';

    const availableTenures = [];
    if (returnsData?.inception_Ret) availableTenures.push({ value: 'inception', text: 'Since Inception' });
    if (returnsData?.oneYear_Ret) availableTenures.push({ value: 1, text: '1 Year' });
    if (returnsData?.threeYear_Ret) availableTenures.push({ value: 3, text: '3 Years' });
    if (returnsData?.fiveYear_Ret) availableTenures.push({ value: 5, text: '5 Years' });
    if (returnsData?.sevenYear_Ret) availableTenures.push({ value: 7, text: '7 Years' });
    if (returnsData?.tenYear_Ret) availableTenures.push({ value: 10, text: '10 Years' });

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

    if (availableTenures.length) {
      const defaultTenure = availableTenures.at(-1);
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

    if (!fund?.planList) return;

    const filteredPlans = fund.planList.filter((p) => p.planName === planType);
    const uniqueOptions = [...new Set(filteredPlans.map((p) => p.optionName))];

    uniqueOptions.forEach((name) => {
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

    if (uniqueOptions.length) {
      const defaultPlan = uniqueOptions.includes('Growth') ? 'Growth' : uniqueOptions[0];
      selectedDisplay.textContent = defaultPlan;
      hiddenInput.value = defaultPlan;
      planOption = defaultPlan;
    }
  }

  function updateReturnRate() {
    if (!selectedFund) return;
    const targetPlan = selectedFund.planList.find((p) => p.planName === planType && p.optionName === planOption);
    const targetReturns = targetPlan
      ? selectedFund.returns.find((r) => r.plancode === targetPlan.planCode && r.optioncode === targetPlan.optionCode)
      : null;

    returnCAGR = targetReturns?.inception_Ret ? parseFloat(targetReturns.inception_Ret) : 0;
    updateTenureOptions(targetReturns);
    updateValues();
  }

  // -------------------------------
  // ✅ 6. EVENTS & LOGIC
  // -------------------------------
  sipBtn.addEventListener('click', () => { mode = 'sip'; sipBtn.classList.add('active'); lumpsumBtn.classList.remove('active'); block.querySelector('.labelforsip').style.display = ''; block.querySelector('.labelforlumsum').style.display = 'none'; updateValues(); });
  lumpsumBtn.addEventListener('click', () => { mode = 'lumpsum'; lumpsumBtn.classList.add('active'); sipBtn.classList.remove('active'); block.querySelector('.labelforsip').style.display = 'none'; block.querySelector('.labelforlumsum').style.display = ''; updateValues(); });

  block.querySelector('#planToggle').addEventListener('change', () => {
    planType = block.querySelector('#planToggle').checked ? 'Regular' : 'Direct';
    block.querySelectorAll('.toggle-label').forEach((l) => l.classList.toggle('active'));
    updatePlanOptions(selectedFund);
    updateReturnRate();
  });

  amountInput.addEventListener('input', updateValues);

  // Tenure & Plan dropdowns
  block.querySelector('.select-selected').addEventListener('click', (e) => {
    e.stopPropagation();
    block.querySelector('.select-options-plan').classList.remove('open');
    block.querySelector('.select-options').classList.toggle('open');
  });

  block.querySelector('.select-selected-plan').addEventListener('click', (e) => {
    e.stopPropagation();
    block.querySelector('.select-options').classList.remove('open');
    block.querySelector('.select-options-plan').classList.toggle('open');
  });

  document.addEventListener('click', () => {
    block.querySelectorAll('.select-options.open, .select-options-plan.open').forEach((el) => el.classList.remove('open'));
  });

  // Search
  let currentFocus = -1;
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    currentFocus = -1;
    const filtered = query ? schemeNames.filter((name) => name.toLowerCase().includes(query)) : schemeNames;
    filtered.forEach((name) => {
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
    if (e.key === 'ArrowDown') { currentFocus++; addActive(items); e.preventDefault(); } else if (e.key === 'ArrowUp') { currentFocus--; addActive(items); e.preventDefault(); } else if (e.key === 'Enter') { e.preventDefault(); if (currentFocus > -1) items[currentFocus].click(); } else if (e.key === 'Escape') { searchResults.innerHTML = ''; currentFocus = -1; searchInput.value = selectedFundName; }
  });

  function addActive(items) {
    if (!items) return;
    items.forEach((i) => i.classList.remove('active'));
    if (currentFocus >= items.length) currentFocus = items.length - 1;
    if (currentFocus < 0) currentFocus = 0;
    items[currentFocus].classList.add('active');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
  }

  // -------------------------------
  // ✅ 7. SECTION HERO LAYOUT FIX
  // -------------------------------
  const sectionHero = block.closest('.section');
  if (sectionHero) {
    const hero = sectionHero.querySelector('.default-content-wrapper');
    if (hero && !hero.querySelector('.hero-image')) {
      const iconPara = hero.querySelector('p:has(img)');
      const heading = hero.querySelector('h3') || hero.querySelector('h4');
      const paras = hero.querySelectorAll('p');
      hero.innerHTML = '';
      const heroImage = div({ class: 'hero-image' }, iconPara);
      const heroText = div({ class: 'hero-text' }, heading, ...[...paras].filter((p) => p !== iconPara));
      hero.append(heroImage, heroText);
    }
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

  // -------------------------------
  // ✅ 8. INIT
  // -------------------------------
  updatePlanOptions(selectedFund);
  updateReturnRate();
}