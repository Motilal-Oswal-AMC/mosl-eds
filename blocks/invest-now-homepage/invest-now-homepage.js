/* eslint-disable*/
import {
  div, p, h3, img, button, input, label, select, option, span
} from '../../scripts/dom-helpers.js';
import '../../scripts/flatpickr.js';
import dataCfObj from '../../scripts/dataCfObj.js'


function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function getTodaysDateFormatted() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' });
  const year = today.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function decorate(block) {

  loadCSS('../../scripts/flatpickr.min.css');
  const schcodeFromStorage = localStorage.getItem('schcodeactive');
  const fundData = dataCfObj.find(fund => fund.schcode === schcodeFromStorage);
  if (fundData) {
    console.log('Found Fund Data:', fundData);
    var fundNameFromData = fundData.schDetail.schemeName.replaceAll('Motilal Oswal', '');
    const benchmarkFromData = fundData.benchmark;
    console.log('Fund Name:', fundNameFromData);
  } else {
    console.error('No fund data found for schcode:', schcodeFromStorage);
  }
  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');

  const lumpsumLabel = col1[1]?.textContent || '';
  const sipLabel = col1[2]?.textContent || '';
  const inputLabel = col1[3]?.textContent || '';

  const defaultAmount = col2[0]?.textContent || '';
  const suggestions = [col2[1], col2[2], col2[3]].map(p => p?.textContent || '');

  const frequency = col3[0]?.textContent || '';
  const endDate = col3[1]?.textContent || '';
  const ctaLabel = col3[2]?.textContent || '';


  // Frequency options (mirror your JSON)
  const brandName = 'Motilal Oswal';
  // const logoSrc = '../../icons/Group.svg';
  const mop = `MO_${schcodeFromStorage}.svg`;
  const logoSrc = `../../icons/iconfund/${mop}`
  const calendarIconSrc = '../../icons/calendar.svg'; // Replace with your real calendar icon path
  const infotoolsrc = '../../icons/infotooltip.svg';
  const closesrc = '../../icons/cross.svg';
  const frequencyOptions = ['Annual', 'Daily', 'Fortnightly', 'Monthly', 'Quarterly', 'Weekly'];
  const endDateOptions = ['End Date', 'Until I cancel', 'Select Date'];

  block.innerHTML = '';

  // Close Button
  const closebtn = div({ class: 'modal-btn' },
    span({ class: 'close-btn', },
      img({ class: 'modal-btn-svg', src: closesrc, alt: 'cross' })),
  )

  // Build modal
  const modal = div({ class: 'invest-now-modal' },
    div({ class: 'modal-header-container' },
      div({ class: 'modal-header' },
        div({ class: 'modal-header-logo' },
          img({ class: 'brandlogo', src: logoSrc, alt: 'BrandLogo' })
        ),
        div({ class: 'modal-header-subtitle' },
          p({ class: 'brandname' }, brandName),
          h3({ class: 'fund-name' }, fundNameFromData)
        )
      ),
      div({ class: 'modal-toggle' },
        div({ class: 'modal-btn-lumpsum active' },
          button({ class: 'lumpsum-btn' }, lumpsumLabel)),
        div({ class: 'modal-btn-sip' },
          button({ class: 'sip-btn' }, sipLabel)),
      )),
    div({ class: "modal-inputs-container" },
      div({ class: "modal-inputs-subcontainer" },
        div({ class: 'modal-inputs' },
          div({ class: 'modal-input' },
            label(inputLabel),
            div({ class: 'modal-input-symbol' },
              input({ type: 'number', value: defaultAmount, class: 'amount-input' })),
          ),
          div({ class: 'modal-suggestions' },
            ...suggestions.map(s => button({ class: 'suggestion-btn' }, `₹ ` + s)),
          ),
        ),
        div({ class: 'modal-input-fields hidden' },
          div({ class: 'modal-sip' },
            div({ class: 'modal-sip-starts' },
              div({ class: 'sip-starts-maintext' },
                p({ class: 'sip-starts-text' }, 'SIP starts from ')),
              div({ class: 'sip-starts-maindate' },
                p({ class: 'sip-starts-date' }, getTodaysDateFormatted()),
                // button({ class: 'calendar-btn' },
                //   img({ src: calendarIconSrc, alt: 'Calendar Icon' })
                // ))
                img({ class: 'calendar-btn', src: calendarIconSrc, alt: 'Calendar Icon', 'aria-label': 'Select start date' }))

            ),
            div({ class: 'modal-start-today' },
              label(
                input({ type: 'checkbox', class: 'start-today-checkbox' }),
                span({ class: 'custom-box' }),
                span(' Start Today')
              ),
              div({ class: 'start-today-note' },
                p({ class: 'sip-note' }, 'Your 1st SIP Installment will be debited today '),
                span({ class: 'sip-note-highlight' }, img({ class: '', src: infotoolsrc, alt: 'information' }))
              )
            )),
          div({ class: 'modal-dropdown-frequency' },
            label('Frequency'),
            select(
              {},
              ...frequencyOptions.map(opt =>
                option({ selected: opt === frequency }, opt)
              )
            ),
          ),
          div({ class: 'modal-dropdowns-enddate' },
            label('End Date'),
            select(
              {},
              ...endDateOptions.map(opt =>
                option({ selected: opt === endDate }, opt)
              )
            ),
          )),
      ),
      div({ class: 'modal-cta' },
        button({ class: 'invest-btn' }, ctaLabel)
      ))
  );

  // Tooltip
  const tooltip = div(
    { class: 'sip-tooltip hide' },
    div({ class: 'modal-btn tooltip-btn' },
      span({ class: 'close-btn', },
        img({ class: 'modal-btn-svg', src: closesrc, alt: 'cross' })),
    ),
    div({ class: 'tooltip-box' },
      p({ class: 'tooltip-note' }, "Note"),
      div({ class: 'tooltip-info' },
        "We’ll debit your first SIP installment today through your chosen payment mode, and all future installments will be automatically collected via your registered Autopay or URN."
      )));

  const modalContainer = div({ class: 'invest-now-container', id: 'invest-now-wrapper-flat' }, closebtn, modal, tooltip)
  block.append(modalContainer);

  // 1. Add open/close logic 
  const lumpsumBtn = block.querySelector('.modal-btn-lumpsum');
  const sipBtn = block.querySelector('.modal-btn-sip');
  const sipFields = document.querySelector('.modal-input-fields');

  lumpsumBtn.addEventListener('click', () => {
    const sipFields = document.querySelector('.modal-input-fields');
    const sipBtn = block.querySelector('.modal-btn-sip');

    lumpsumBtn.classList.add('active');
    sipBtn.classList.remove('active');
    sipFields.classList.add('hidden');
    sipFields.classList.remove('flex');



  });

  sipBtn.addEventListener('click', () => {
    const sipFields = document.querySelector('.modal-input-fields');
    const sipBtn = block.querySelector('.modal-btn-sip');
    sipBtn.classList.add('active');
    lumpsumBtn.classList.remove('active');
    sipFields.classList.remove('hidden');
    sipFields.classList.add('flex');
  });


  // 2. Attach event listeners to all suggestion buttons
  const suggestionButtons = block.querySelectorAll('.suggestion-btn');
  const amountInput = block.querySelector('.amount-input');

  suggestionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.textContent.split(' ')[1];
      amountInput.value = value;
      amountInput.dispatchEvent(new Event('input'));
    });
  });

  //3. tooltip disaply
  const sipNote = block.querySelector('.sip-note-highlight');
  const sipText = block.querySelector('.sip-tooltip')
  sipNote.addEventListener('click', () => {
    sipText.classList.add('show')
    sipText.classList.remove('hide')

  });

  const closeTooltip = block.querySelector('.tooltip-btn');
  closeTooltip.addEventListener('click', () => {
    sipText.classList.add('hide')
    sipText.classList.remove('show')
  });




  // 4. flat date picker 
  const calendarIcon = block.querySelector('.calendar-btn');
  const sipDateDisplay = block.querySelector('.sip-starts-date');
  const calendarContainer = block.querySelector('.invest-now-container');

  // ADDED: A variable to store the user-selected date
  let originalSipDate = '';

  // 5. Initialize flatpickr 
  // const fpInstance = window.flatpickr(calendarIcon, {
  //   defaultDate: 'today',
  //   altInput: false,
  //   onReady: function (_, __, fp) {
  //     // fp.calendarContainer.removeAttribute('style');
  //     if (fp.calendarContainer) { // Add this check
  //       fp.calendarContainer.removeAttribute('style');
  //     }
  //   },
  //   appendTo: calendarContainer,
  //   onChange: function (selectedDates, dateStr, instance) {
  //     const selectedDate = selectedDates[0];
  //     const day = selectedDate.getDate();
  //     const month = selectedDate.toLocaleString('default', { month: 'short' });
  //     const year = selectedDate.getFullYear();
  //     const formattedDate = `${day} ${month} ${year}`;

  //     sipDateDisplay.textContent = formattedDate;

  //     originalSipDate = formattedDate;
  //   },
  //   position: (self, node) => {
  //     const top = self.element.offsetTop + self.element.offsetHeight + 8;
  //     const left = self.element.offsetLeft;

  //     node.style.top = `${top}px`;
  //     node.style.left = `${left}px`;
  //   },
  // });

  const fpInstance = window.flatpickr(calendarIcon, {
    defaultDate: 'today',
    altInput: false,
    appendTo: calendarContainer,
    disableMobile: true,

    // FIX 1: Added a safety check to prevent the crash on mobile.
    onReady: function (_, __, fp) {
      if (fp.calendarContainer) {
        fp.calendarContainer.removeAttribute('style');
      } else {
        console.log("somehting is wrong")
      }
    },

    onChange: function (selectedDates, dateStr, instance) {
      const selectedDate = selectedDates[0];
      const day = selectedDate.getDate();
      const month = selectedDate.toLocaleString('default', { month: 'short' });
      const year = selectedDate.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      sipDateDisplay.textContent = formattedDate;

      // Update the stored date whenever the user picks a new one
      originalSipDate = formattedDate;
    },
    position: (self, node) => {
      const top = self.element.offsetTop + self.element.offsetHeight + 8;
      const left = self.element.offsetLeft;

      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
    },

    // FIX 2: Removed the entire custom 'position' function.
    // Let flatpickr handle its own positioning, as it's more reliable on mobile.

  });

  // ADDED: Logic for the "Start Today" checkbox
  const startTodayCheckbox = block.querySelector('.start-today-checkbox');

  // Helper function to get today's date in the correct format
  function getTodaysDateFormatted() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Initialize the originalSipDate with the value set by flatpickr on load
  originalSipDate = sipDateDisplay.textContent;

  startTodayCheckbox.addEventListener('change', () => {
    if (startTodayCheckbox.checked) {
      // If checked, display today's date
      sipDateDisplay.textContent = getTodaysDateFormatted();
    } else {
      // If unchecked, revert to the user's selected date
      sipDateDisplay.textContent = originalSipDate;
    }
  });
}




