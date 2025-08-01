/* eslint-disable */

import {
  div, a, label, input, span, button, ul, img, h2, p as pTag, select, option
} from '../../scripts/dom-helpers.js';
// import moslFundData from './datacal.js';
import dataCfObj from '../../scripts/dataCfObj.js';

export default function decorate(block) {
  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');
  const col4 = block.children[3].querySelectorAll('p');

  const schemeNames = dataCfObj.map((fund) => fund.schDetail.schemeName);

  let selectedFundCode = 'CP';
  let selectedFund = dataCfObj.find((fund) => fund.schcode === selectedFundCode);
  let selectedFundName = selectedFund.schDetail.schemeName;
  let returnCAGR = parseFloat(col4[2].textContent.trim()) || 0;

  if (selectedFund) {
    const foundReturn = selectedFund.returns.find((ret) => ret.inception_Ret !== undefined);
    returnCAGR = foundReturn ? parseFloat(foundReturn.inception_Ret) : returnCAGR;
  }

  // ✅ UPDATE: Create hero split structure
  const sectionHero = block.closest('.section');
  const hero = sectionHero?.querySelector('.default-content-wrapper');

  if (hero && !hero.querySelector('.hero-image')) {
    const iconPara = hero.querySelector('p:has(img)');
    const heading = hero.querySelector('h3');
    const paras = hero.querySelectorAll('p');

    hero.innerHTML = '';
    const heroImage = div({ class: 'hero-image' }, iconPara);

    const heroText = div(
      { class: 'hero-text' },
      heading,
      ...[...paras].filter(p => p !== iconPara)
    );

    hero.append(heroImage, heroText);

  }

  // ✅ SIP CALCULATOR CONTAINER
  const calContainer = div(
    { class: 'cal-container' },
    div(
      { class: 'search-bar-wrapper' },
      span(col1[0].textContent.trim()),
      input({
        value: col1[1].textContent.trim(),
        type: 'text',
        placeholder: col1[0].textContent.trim(),
        name: 'searchFundInput',
        id: 'searchFundInput',
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-expanded': 'false',
      }),
      div({ class: 'search-results-wrapper' }, ul({ id: 'searchResults', role: 'listbox' })),
    ),
    div(
      { class: 'scheme-btns-wrapper' },
      button({ class: 'sip-btn active' }, col1[2].textContent.trim()),
      button({ class: 'lumpsum-btn' }, col1[3].textContent.trim()),
    ),
    div({ class: 'plan-options-wrapper' },
      div({ class: 'plan-type-toggle' },
        span({ class: 'toggle-label active' }, 'Direct'),
        label({ class: 'toggle-switch' },
          input({ type: 'checkbox', id: 'planToggle' }),
          span({ class: 'slider' }),
        ),
        span({ class: 'toggle-label' }, 'Regular'),
      ),
      div({ class: 'plan-option-select custom-select-plan' },
        div({ class: 'select-selected-plan' }, 'IDCW Reinvestment'),
        div({ class: 'select-options-plan' },
          div({ class: 'select-option-plan', 'data-value': 'Growth' }, 'Growth'),
          div({ class: 'select-option-plan', 'data-value': 'IDCW Reinvestment' }, 'IDCW Reinvestment'),
          div({ class: 'select-option-plan', 'data-value': 'IDCW Payout' }, 'IDCW Payout'),
        ),
        input({ type: 'hidden', id: 'planOption', value: 'IDCW Reinvestment' }),
      )

    ),
    div(
      { class: 'investment-wrapper' },
      div(
        { class: 'sip-wrapper' },
        label({ class: 'labelforsip' }, col2[0].textContent.trim()),
        label({ class: 'labelforlumsum', style: 'display:none' }, col2[1].textContent.trim()),
        div(
          { class: 'input-with-symbol' },
          span({ class: 'rupee-symbol' }, ''),
          input({ // The original input
            type: 'number',
            value: col2[2].textContent.trim(),
            name: 'investmentAmount',
            id: 'investmentAmount',
            placeholder: 'Enter amount',
          }),
        ),
      ),
      div(
        { class: 'tenure-wrapper custom-select' },
        label(col2[3].textContent.trim()),
        div({ class: 'select-selected', 'aria-haspopup': 'listbox' }, `${col3[0].textContent.trim()} Years`),
        div({ class: 'select-options', role: 'listbox' }),
        input({
          type: 'hidden',
          name: 'investmentTenure',
          id: 'investmentTenure',
          value: col3[0].textContent.trim(),
        }),
      ),

    ),
    div(
      { class: 'invested-amount' },
      div(
        { class: 'invested-amount-wrapper' },
        label(col3[1].textContent.trim()),
        span({ class: 'invested-amount-value' }, col3[2].textContent.trim()),
      ),
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
        span({ class: 'return-cagr' }, `${returnCAGR.toFixed(2)}%`),
      ),
      div(
        { class: 'start-sip-btn' },
        button(col4[3].textContent.trim()),
      ),
    ),
  );

  const viewOthCalBtn = div(
    { class: 'view-btn-cal' },
    a(
      {
        href: col4[5].querySelector('a')?.href || '#',
        class: 'view-othercal-btn',
      },
      col4[4].textContent.trim(),
    ),
  );

  block.innerHTML = '';
  block.append(calContainer, viewOthCalBtn);

  let mode = 'sip';

  const sipBtn = calContainer.querySelector('.sip-btn');
  const lumpsumBtn = calContainer.querySelector('.lumpsum-btn');
  const amountInput = calContainer.querySelector('#investmentAmount');
  const tenureInput = calContainer.querySelector('#investmentTenure');
  const investedAmountSpan = calContainer.querySelector('.invested-amount-value');
  const currentValueSpan = calContainer.querySelector('.current-value');
  const returnCAGRSpan = calContainer.querySelector('.return-cagr');

  const searchInput = document.getElementById('searchFundInput');
  const searchResults = document.getElementById('searchResults');

  // --- Custom Select Dropdown Logic ---
  const customSelect = block.querySelector('.custom-select');
  const selectedDisplay = customSelect.querySelector('.select-selected');
  const optionsContainer = customSelect.querySelector('.select-options');
  const allOptions = customSelect.querySelectorAll('.select-option');
  const hiddenInput = customSelect.querySelector('#investmentTenure');

  // PLAN OPTIONS TOGGLE
  const planToggle = calContainer.querySelector('#planToggle');
  const directLabel = calContainer.querySelector('.plan-type-toggle .toggle-label:first-child');
  const regularLabel = calContainer.querySelector('.plan-type-toggle .toggle-label:last-child');

  // PLAN OPTION SELECT
  const planCustomSelect = calContainer.querySelector('.custom-select-plan');
  const selectedPlanDisplay = planCustomSelect.querySelector('.select-selected-plan');
  const planOptionsContainer = planCustomSelect.querySelector('.select-options-plan');
  const planHiddenInput = planCustomSelect.querySelector('#planOption');
  const planOptions = planOptionsContainer.querySelectorAll('.select-option-plan');

  planToggle.addEventListener('change', () => {
    if (planToggle.checked) {
      // Regular selected
      regularLabel.classList.add('active');
      directLabel.classList.remove('active');
    } else {
      // Direct selected
      directLabel.classList.add('active');
      regularLabel.classList.remove('active');
    }
  });

  // Open/close the plan dropdown
  selectedPlanDisplay.addEventListener('click', (e) => {
    e.stopPropagation();
    planOptionsContainer.classList.toggle('open');
  });

  // Update on option click
  planOptions.forEach((option) => {
    option.addEventListener('click', () => {
      selectedPlanDisplay.textContent = option.textContent;
      planHiddenInput.value = option.getAttribute('data-value');
      planOptionsContainer.classList.remove('open');
      updateValues(); // Call your update logic if needed
    });
  });

  // Close plan dropdown on outside click
  document.addEventListener('click', () => {
    planOptionsContainer.classList.remove('open');
  });



  selectedDisplay.addEventListener('click', (e) => {
    e.stopPropagation();
    optionsContainer.classList.toggle('open');
  });

  allOptions.forEach((option) => {
    option.addEventListener('click', () => {
      selectedDisplay.textContent = option.textContent;
      hiddenInput.value = option.getAttribute('data-value');
      optionsContainer.classList.remove('open');
      updateValues();
    });
  });

  // Close the dropdown if the user clicks outside of it
  document.addEventListener('click', () => {
    optionsContainer.classList.remove('open');
  });

  function updateValues() {
    const amount = parseFloat(amountInput.value) || 0;
    const tenure = parseFloat(tenureInput.value) || 0;

    // ✅ START: New logic to handle "Since Inception"
    let tenureValue = tenureInput.value;
    if (tenureValue === 'inception') {
      if (selectedFund && selectedFund.dateOfAllotment) {
        const inceptionDate = new Date(selectedFund.dateOfAllotment);
        const today = new Date();
        // Calculate the difference in milliseconds and convert to years
        const yearsDiff = (today.getTime() - inceptionDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        tenureValue = yearsDiff;
      }
    }
    // ✅ END: New logic

    const investmentWrapper = document.querySelector('.investment-wrapper');
    const investedAmountEl = document.querySelector('.invested-amount');
    const calDescription = document.querySelector('.cal-discription');

    if (!returnCAGR || isNaN(returnCAGR) || returnCAGR <= 0) {
      investedAmountSpan.textContent = '—';
      currentValueSpan.textContent = '—';
      returnCAGRSpan.textContent = '—';

      if (!document.querySelector('.no-returns-msg')) {
        const msg = document.createElement('div');
        msg.className = 'no-returns-msg';
        msg.textContent = 'Returns for this fund are not provided because the scheme has not completed 1 year. Please select a different fund.';
        calContainer.appendChild(msg);
      }

      if (investmentWrapper) investmentWrapper.style.display = 'none';
      if (investedAmountEl) investedAmountEl.style.display = 'none';
      if (calDescription) calDescription.style.display = 'none';

      return;
    }

    // Remove message if exists:
    const oldMsg = document.querySelector('.no-returns-msg');
    if (oldMsg) oldMsg.remove();

    if (investmentWrapper) investmentWrapper.style.display = '';
    if (investedAmountEl) investedAmountEl.style.display = '';
    if (calDescription) calDescription.style.display = '';

    const r = returnCAGR / 100 / 12;
    const n = tenureValue * 12;

    let investedAmount = 0;
    let futureValue = 0;

    if (mode === 'sip') {
      investedAmount = amount * n;
      futureValue = amount * (((1 + r) ** n - 1) / r);
    } else {
      investedAmount = amount;
      const lumpsumRate = returnCAGR / 100;
      futureValue = amount * (1 + lumpsumRate) ** tenureValue;
    }

    // ✅ Add thousands separator
    investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    returnCAGRSpan.textContent = `${parseFloat(returnCAGR).toFixed(2)}%`;
  }

  // Tenure update function 
  // Add this new function inside decorate()
  // function updateTenureOptions(fund) {
  //   if (!fund || !fund.returns) {
  //     // If there's no fund or no returns data, clear the options
  //     optionsContainer.innerHTML = '';
  //     return;
  //   }

  //   // Find the returns data for the Growth plan, or fallback to the first available
  //   const growthReturns = fund.returns.find((r) => r.optioncode === 'G') || fund.returns[0];
  //   if (!growthReturns) {
  //     optionsContainer.innerHTML = '';
  //     return;
  //   }

  //   // Map the API keys to year numbers
  //   const availableTenures = [];
  //   // if (growthReturns.inception_Ret) availableTenures.push("Since Inception");
  //   if (growthReturns.oneYear_Ret) availableTenures.push(1);
  //   if (growthReturns.threeYear_Ret) availableTenures.push(3);
  //   if (growthReturns.fiveYear_Ret) availableTenures.push(5);
  //   if (growthReturns.sevenYear_Ret) availableTenures.push(7);
  //   if (growthReturns.tenYear_Ret) availableTenures.push(10);
  //   // We can add more here if the API supports them

  //   // ✅ Check for inception_Ret and add it to the list
  //   if (growthReturns.inception_Ret) {
  //     availableTenures.push({ value: 'inception', text: 'Since Inception' });
  //   }

  //   // Clear the old options
  //   optionsContainer.innerHTML = '';

  //   // Create and append the new options
  //   availableTenures.forEach((year) => {
  //     const optionEl = div(
  //       { class: 'select-option', role: 'option', 'data-value': year },
  //       `${year} Years`,
  //     );

  //     // Add a click listener to each new option
  //     optionEl.addEventListener('click', () => {
  //       selectedDisplay.textContent = optionEl.textContent;
  //       hiddenInput.value = optionEl.getAttribute('data-value');
  //       optionsContainer.classList.remove('open');
  //       updateValues();
  //     });

  //     optionsContainer.appendChild(optionEl);
  //   });

  //   // After rebuilding, set the initial value to the first available tenure
  //   if (availableTenures.length > 0) {
  //     const defaultTenure = availableTenures[0];
  //     selectedDisplay.textContent = `${defaultTenure} Years`;
  //     hiddenInput.value = defaultTenure;
  //   } else {
  //     // Handle cases where a fund has no return periods
  //     selectedDisplay.textContent = 'N/A';
  //     hiddenInput.value = 0;
  //   }
  // }

  function updateTenureOptions(fund) {
    if (!fund || !fund.returns) {
      optionsContainer.innerHTML = '';
      return;
    }
    const growthReturns = fund.returns.find((r) => r.optioncode === 'G') || fund.returns[0];
    if (!growthReturns) {
      optionsContainer.innerHTML = '';
      return;
    }

    // ✅ Create a consistent array of objects
    const availableTenures = [];
    if (growthReturns.inception_Ret) {
      availableTenures.push({ value: 'inception', text: 'Since Inception' });
    }
    if (growthReturns.oneYear_Ret) availableTenures.push({ value: 1, text: '1 Year' });
    if (growthReturns.threeYear_Ret) availableTenures.push({ value: 3, text: '3 Years' });
    if (growthReturns.fiveYear_Ret) availableTenures.push({ value: 5, text: '5 Years' });
    if (growthReturns.sevenYear_Ret) availableTenures.push({ value: 7, text: '7 Years' });
    if (growthReturns.tenYear_Ret) availableTenures.push({ value: 10, text: '10 Years' });


    optionsContainer.innerHTML = '';

    // ✅ Loop through the array of objects correctly
    availableTenures.forEach((tenureOption) => {
      const optionEl = div(
        { class: 'select-option', role: 'option', 'data-value': tenureOption.value },
        tenureOption.text, // Use the .text property
      );

      optionEl.addEventListener('click', () => {
        selectedDisplay.textContent = optionEl.textContent;
        hiddenInput.value = optionEl.getAttribute('data-value');
        optionsContainer.classList.remove('open');
        updateValues();
      });
      optionsContainer.appendChild(optionEl);
    });

    // ✅ Update the default selection logic
    if (availableTenures.length > 0) {
      // const defaultTenure = availableTenures[0];
      const defaultTenure = availableTenures[availableTenures.length - 1];
      selectedDisplay.textContent = defaultTenure.text;
      hiddenInput.value = defaultTenure.value;
    } else {
      selectedDisplay.textContent = 'N/A';
      hiddenInput.value = 0;
    }
  }


  amountInput.addEventListener('input', updateValues);
  // tenureInput.addEventListener('input', updateValues);


  const sipLabel = calContainer.querySelector('.labelforsip');
  const lumpsumLabel = calContainer.querySelector('.labelforlumsum');

  sipBtn.addEventListener('click', () => {
    mode = 'sip';
    sipBtn.classList.add('active');
    lumpsumBtn.classList.remove('active');
    sipLabel.style.display = '';
    lumpsumLabel.style.display = 'none';
    updateValues();
  });

  lumpsumBtn.addEventListener('click', () => {
    mode = 'lumpsum';
    lumpsumBtn.classList.add('active');
    sipBtn.classList.remove('active');
    sipLabel.style.display = 'none';
    lumpsumLabel.style.display = '';
    updateValues();
  });

  let currentFocus = -1;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    currentFocus = -1;

    searchInput.setAttribute('aria-expanded', 'true');

    const filtered = query
      ? schemeNames.filter((name) => name.toLowerCase().includes(query))
      : schemeNames;

    filtered.forEach((name) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');

      const regex = new RegExp(`(${query})`, 'gi');
      li.innerHTML = name.replace(regex, '<strong>$1</strong>');

      li.addEventListener('click', () => {
        searchInput.value = name;
        selectedFundName = name;
        selectedFund = dataCfObj.find((f) => f.schDetail.schemeName === name);
        returnCAGR = selectedFund?.returns.find((r) => r.inception_Ret)?.inception_Ret || 0;

        // ✅ Add this call to update the tenure dropdown
        updateTenureOptions(selectedFund);
        searchResults.innerHTML = '';
        searchInput.setAttribute('aria-expanded', 'false');
        updateValues();
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

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.innerHTML = '';
      searchInput.setAttribute('aria-expanded', 'false');
      if (searchInput.value.trim() === '') {
        searchInput.value = selectedFundName;
      }
    }
  });

  updateTenureOptions(selectedFund);
  updateValues();


  // ✅ Wrap .default-content-wrapper + .calculator-sip-wrapper inside .compounding-two-inner
  const calculatorBlockWrapper = block.closest('.calculator-sip-wrapper');
  const section = calculatorBlockWrapper?.closest('.section');


  if (section) {
    const heroWrap = section.querySelector('.default-content-wrapper');
    const calcWrap = section.querySelector('.calculator-sip-wrapper');

    const existing = section.querySelector('.compounding-two-inner');
    if (heroWrap && calcWrap && !existing) {
      const wrapper = document.createElement('div');
      wrapper.className = 'compounding-two-inner';
      section.insertBefore(wrapper, heroWrap);
      wrapper.append(heroWrap, calcWrap);
    }
  }


  function removeActive(items) {
    items.forEach((item) => item.classList.remove('active'));
  }

  function addActive(items) {
    if (!items) return;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = items.length - 1;
    if (currentFocus < 0) currentFocus = 0;
    items[currentFocus].classList.add('active');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
  }
}
