/* eslint-disable*/
import {
  div, p, h3, img, button, input, label, select, option, span
} from '../../scripts/dom-helpers.js';
import '../../scripts/flatpickr.js';


function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

export default function decorate(block) {

  loadCSS('../../scripts/flatpickr.min.css');
  // loadCSS('./invest-now-homepage.css');

  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');

  const fundName = col1[0]?.textContent || '';
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
  const logoSrc = '../../icons/Group.svg';
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
          h3({ class: 'fund-name' }, fundName)
        )
      ),
      div({ class: 'modal-toggle' },
        div({ class: 'modal-btn-lumpsum' },
          button({ class: 'lumpsum-btn' }, lumpsumLabel)),
        div({ class: 'modal-btn-sip active' },
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
        div({ class: 'modal-input-fields' },
          div({ class: 'modal-sip' },
            div({ class: 'modal-sip-starts' },
              div({ class: 'sip-starts-maintext' },
                p({ class: 'sip-starts-text' }, 'SIP starts from ')),
              div({ class: 'sip-starts-maindate' },
                p({ class: 'sip-starts-date' }, '10 Aug 2025'),
                // button({ class: 'calendar-btn' },
                //   img({ src: calendarIconSrc, alt: 'Calendar Icon' })
                // ))
                img({ class: 'calendar-btn', src: calendarIconSrc, alt: 'Calendar Icon', 'aria-label': 'Select start date' }))

            ),
            div({ class: 'modal-start-today' },
              label(
                input({ type: 'checkbox', checked: true, class: 'start-today-checkbox' }),
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
        // ✅ Optional placeholder for calendar popup
        // div({ class: 'modal-calendar-popup hidden' },
        //   p('Calendar here...')
        // )
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


  // Initialize flatpickr 
  const fpInstance = window.flatpickr(calendarIcon, {
    defaultDate: 'today',
    altInput: false,
    onReady: function (_, __, fp) {
      fp.calendarContainer.removeAttribute('style');
    },
    appendTo: calendarContainer,
    onChange: function (selectedDates, dateStr, instance) {
      const selectedDate = selectedDates[0];
      const day = selectedDate.getDate();
      const month = selectedDate.toLocaleString('default', { month: 'short' });
      const year = selectedDate.getFullYear();
      sipDateDisplay.textContent = `${day} ${month} ${year}`;
    },
    position: (self, node) => {
      // 'self.element' is the calendar icon that was clicked
      // 'node' is the calendar popup itself

      // Position the calendar (node) right below the trigger (self.element).
      // The top position is the icon's top offset + its height + a small margin.
      const top = self.element.offsetTop + self.element.offsetHeight + 8; // 8px margin

      // The left position should align with the left side of the icon.
      const left = self.element.offsetLeft;

      // Apply our calculated positions directly.
      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
    },
  });

  // On close or redecorate
  // fpInstance.destroy();


}




