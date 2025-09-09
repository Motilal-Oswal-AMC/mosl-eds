import {
  div,
  p,
  h3,
  img,
  button,
  input,
  label,
  span,
  ul,
  li,
} from '../../scripts/dom-helpers.js';
import '../../scripts/flatpickr.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';
import { myAPI } from '../../scripts/scripts.js';

export async function existingUser(paramblock) {
  const closestParam = paramblock.closest('main');
  const demo = Array.from(closestParam.querySelectorAll('.pan-details-modal p'));
  const inputLable = demo[0];
  if (!inputLable) {
    // console.warn('No <p> elements found inside .pan-details-modal');
    return;
  }

  inputLable.innerHTML = '';

  const addInputDiv = div(
    { class: 'input-wrapper' },
    p({ class: 'panlabel' }, 'Pan Number'),
    input({
      type: 'text',
      placeholder: 'Enter PAN Number',
      name: 'pan',
      class: 'iptpanfld',
    }),
  );

  dataMapMoObj.panDlts.isGuest = 'false';
  dataMapMoObj.panDlts.guestMenuState = {
    guestMenu: false,
    existingBox: true,
  };
  async function otpCall(param) {
    try {
      const request = {
        userId: param,
        loginModeId: 1,
        credentialModeId: 1,
        ipV4: '192.168.22.22',
        otpThroughDIT: false,
        ditotpType: '',
        pmsGuest: false,
        isAIF: false,
        mfGuest: false,
        product: 'MF',
      };

      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/LoginAPI/api/Login/GenerateOtpNew',
        request,
      );
      console.log(rejsin);
    } catch (error) {
      // console.log(error);
    }
  }
  async function kycCall(param) {
    try {
      const request = {
        panNo: param,
      };
      const rejsin = await myAPI(
        'POST',
        ' https://api.moamc.com/InitAPI/api/Init/CVLKYCCheck',
        request,
      );
      console.log('kyc api response ', rejsin);
      const kycres = rejsin.data.kycStatus;
      const isKyc = kycres === 'Y';
      const boolkyc = kycres === 'Y' ? 'true' : 'false';
      localStorage.setItem('kycstatus', boolkyc);
      const kycForm = closestParam.querySelector('.fdp-kyc-form');
      const panForm = closestParam.querySelector('.pan-details-modal');
      const pansuccessForm = closestParam.querySelector('.otp-fdp');

      const chclick = pansuccessForm.querySelector('.otp-main-con2');
      const resentBtn = pansuccessForm.querySelector('.sub-otp-con4 .otp-main-con1');
      chclick.removeAttribute('href');
      chclick.addEventListener('click', () => {
        kycForm.style.display = 'none'; // display none kycform
        // panForm.style.display = 'block'; // display none panform
        panForm.classList.add('show-element');
        kycForm.classList.add('hide-element');
        pansuccessForm.classList.add('hide-element');
        // pansuccessForm.style.display = 'none'; // display block otp form
      });
      resentBtn.removeAttribute('href');
      resentBtn.addEventListener('click', () => {
        otpCall();
      });
      if (isKyc) {
        kycForm.classList.add('hide-element');
        panForm.classList.add('hide-element');
        pansuccessForm.classList.add('show-element');
        // kycForm.style.display = 'none'; // display none kycform
        // panForm.style.display = 'none'; // display none panform
        // pansuccessForm.style.display = 'flex'; // display block otp form
        const paninp = pansuccessForm.querySelector('.otp-wrap input');
        paninp.focus();
        const classAddv3 = closestParam.querySelector('.otp-fdp');
        if (Array.from(classAddv3.classList).includes('hide-modal')) {
          classAddv3.classList.remove('hide-modal');
        }
        classAddv3.classList.remove('hide-modal');
        classAddv3.classList.add('modal-show');
        const inputs = pansuccessForm.querySelectorAll('.otp-wrap input');
        inputs.forEach((inputel, index) => {
          inputel.setAttribute('maxLength', 1);
          inputel.addEventListener('input', () => {
            inputel.value = inputel.value.replace(/[^0-9]/g, '');
            if (inputel.value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          });
          inputel.addEventListener('keydown', (event) => {
            const totalInputs = inputs.length;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
            }
            switch (event.key) {
              case 'Tab':
                if (!event.shiftKey && index === totalInputs - 1) {
                  event.preventDefault();
                  inputs[0].focus();
                } else if (event.shiftKey && index === 0) {
                  event.preventDefault();
                  inputs[totalInputs - 1].focus();
                }
                break;

              case 'ArrowRight': {
                const nextIndex = (index + 1) % totalInputs;
                inputs[nextIndex].focus();
                break;
              }
              case 'ArrowLeft': {
                // Move to the previous input, or wrap to the last
                const prevIndex = (index - 1 + totalInputs) % totalInputs;
                inputs[prevIndex].focus();
                break;
              }
              case 'Backspace':
                if (inputel.value.length === 0 && index > 0) {
                  inputs[index - 1].focus();
                }
                break;
              default:
                break;
            }
          });
        });

        otpCall(param);
      } else {
        kycForm.style.display = 'block';
        panForm.style.display = 'none';
        pansuccessForm.style.display = 'none';

        const classAddv3 = closestParam.querySelector('.fdp-kyc-form');
        if (Array.from(classAddv3.classList).includes('hide-modal')) {
          classAddv3.classList.remove('hide-modal');
        }
        classAddv3.classList.remove('hide-modal');
        classAddv3.classList.add('modal-show');

        const userLoginPanNumber = closestParam.querySelector('.user-pan-number');
        userLoginPanNumber.value = dataMapMoObj.panDlts.pannumber.toUpperCase();
        userLoginPanNumber.setAttribute('readonly', true);
        const userNm = closestParam.querySelector('.user-pan-name');
        const userNo = closestParam.querySelector('.user-number');
        const userem = closestParam.querySelector('.user-email');
        closestParam.querySelector('#opt1').click();
        const editInput = closestParam.querySelector('.pan-image');
        userLoginPanNumber.setAttribute('maxLength', 10);
        userNo.setAttribute('maxLength', 10);
        userNm.classList.add('fdp-valid-form');
        userNo.classList.add('fdp-valid-form');
        userem.classList.add('fdp-valid-form');
        editInput.addEventListener('click', () => {
          userLoginPanNumber.removeAttribute('readonly');
          userLoginPanNumber.focus();
        });
        userLoginPanNumber.addEventListener('input', (e) => {
          const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
          const inputValue = e.target.value.toUpperCase();
          const errorpan = e.target.closest('.pan-input');
          const errorPanEl = errorpan.nextElementSibling;
          if (panRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('hide-error');
            userLoginPanNumber.setAttribute('readonly', true);
          } else {
            errorPanEl.classList.remove('hide-error');
            errorPanEl.classList.add('show-error');
          }
        });
        userNm.addEventListener('input', (e) => {
          const panRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
          const inputValue = e.target.value.toUpperCase();
          const errorpan = e.target.parentElement;
          const errorPanEl = errorpan.nextElementSibling;
          if (panRegex.test(inputValue)) {
            errorPanEl.classList.add('hide-error');
            errorPanEl.classList.remove('show-error');
            userLoginPanNumber.setAttribute('readonly', true);
          } else {
            errorPanEl.classList.remove('hide-error');
            errorPanEl.classList.add('show-error');
          }
        });
        userNo.addEventListener('input', (e) => {
          const panRegex = /^\d{10}$/;
          const inputValue = e.target.value.toUpperCase();
          const errorpan = e.target.parentElement;
          const errorPanEl = errorpan.nextElementSibling;
          if (panRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('hide-error');
            userLoginPanNumber.setAttribute('readonly', true);
          } else {
            errorPanEl.classList.remove('hide-error');
            errorPanEl.classList.add('show-error');
          }
        });
        userem.addEventListener('input', (e) => {
          const panRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const inputValue = e.target.value.toUpperCase();
          const errorpan = e.target.parentElement;
          const errorPanEl = errorpan.nextElementSibling;
          if (panRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('hide-error');
            userLoginPanNumber.setAttribute('readonly', true);
          } else {
            errorPanEl.classList.remove('hide-error');
            errorPanEl.classList.add('show-error');
          }
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }
  // ModifyKyc API  start
  //  https://api.moamc.com/prelogin/api/KYC/KYCProcess

  async function modiFyKycApi(param, userName, userMobile, userEmail) {
    try {
      const request = {
        name: userName,
        email: userEmail,
        phone: userMobile,
        returnUrl: 'https://mf.moamc.com/onboarding/personal',
        timeOutUrl: 'https://mf.moamc.com/error',
        panNo: param,
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/prelogin/api/KYC/KYCProcess',
        request,
      );
      console.log('this is modiFuykyc Api Response ', rejsin);
    } catch (error) {
      // console.log(error);
    }
  }

  const ModifyKycForm = closestParam.querySelector('.tnc-container .panvalidsubinner4');
  ModifyKycForm.addEventListener('click', () => {
    const userLoginPanNumber = closestParam.querySelector('.user-pan-number').value; // input

    const userLoginPanName = closestParam.querySelector('.user-pan-name').value;
    const userLoginMobileNumber = closestParam.querySelector('.user-number').value;
    const userLoginEmail = closestParam.querySelector('.user-email').value;

    modiFyKycApi(userLoginPanNumber, userLoginPanName, userLoginMobileNumber, userLoginEmail);
  });
  // ModifyKyc API  ends

  inputLable.appendChild(addInputDiv);

  // api call for otp
  // 'AEEPW9969G',

  async function apiCall(userPanNumber) {
    try {
      dataMapMoObj.panDlts.isIndividualPan = userPanNumber;
      dataMapMoObj.panDlts.pannumber = userPanNumber;
      const request = {
        panNo: userPanNumber,
        isNri: false,
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/LoginAPI/api/Login/GetClientType',
        request,
      );
      console.log(rejsin);

      // const isSuccess = rejsin.data.existingClient === '' ? false : true;
      const tempArray = ['MF', 'BOTH'];
      const exixting = ['ZBF', 'REDEEMZBF'];
      if (rejsin.data.guestClient === '') {
        dataMapMoObj.panDlts.isNewGuest = true;
      } else if (tempArray.includes(rejsin.data.guestClient)) {
        dataMapMoObj.panDlts.isGuest = true;
        dataMapMoObj.panDlts.guestMenuState = {
          guestMenu: true,
          existingBox: false,
        };
      } else if (exixting.includes(rejsin.data.existingClient)) {
        dataMapMoObj.panDlts.isGuest = false;
        dataMapMoObj.panDlts.guestMenuState = {
          guestMenu: true,
          existingBox: false,
        };
      } else if (tempArray.includes(rejsin.data.newClient)) {
        dataMapMoObj.panDlts.isGuest = false;
        dataMapMoObj.panDlts.guestMenuState = {
          guestMenu: true,
          existingBox: false,
        };
      }

      if (window.location.href.includes('/our-funds/funds-details-page')) {
        const planCodesh = localStorage.getItem('planCode') || 'Direct:LM';
        const planslabel = planCodesh.split(':')[1];
        const schemeCode = planslabel;
        const parcloset = closestParam.querySelector('.fdp-card-container');
        const paranearby = parcloset.querySelector('.dropdownmidle .selecttext');
        const planCodenearby = paranearby.getAttribute('dataattr');
        const dataplan = dataCfObj.filter((eldata) => eldata.schcode === schemeCode);
        const amcPlanCode = dataplan[0].moAmcCode;
        const optioncode = dataplan[0].planList
          .filter((elop) => elop.groupedCode === planCodenearby);
        const sOptCode = optioncode[0].optionCode; //
        const { planCode } = optioncode[0];
        const existingQueryParams = '?';

        const redirectURL = `/quickbuy?fund=${schemeCode}&plan=${planCode}&amcPlan=${amcPlanCode}&option=${sOptCode}${existingQueryParams}&landingPage=true`;
        localStorage.setItem('prelogin-to-postlogin-redirect-url', redirectURL);
        localStorage.setItem('prelogin-to-postlogin-clientType', JSON.stringify(rejsin.data));
      }
      localStorage.setItem(
        'UPDATE_GUEST_MENU',
        JSON.stringify(dataMapMoObj.panDlts.guestMenuState),
      );
      localStorage.setItem('isGuest', dataMapMoObj.panDlts.isGuest);

      kycCall(userPanNumber);
    } catch (error) {
      console.log(error);
    }
  }

  const parentElements = closestParam.querySelector('.pan-details-modal');
  dataMapMoObj.CLASS_PREFIXES = ['mainpandts', 'subpandts', 'innerpandts'];
  dataMapMoObj.addIndexed(parentElements);

  // Authenciate click
  const authenticateClick = closestParam.querySelector('.subpandts3 .innerpandts1');
  authenticateClick.addEventListener('click', () => {
    const checkInput = closestParam.querySelector('.error-pan');
    const userPanNumber = closestParam.querySelector('.iptpanfld').value;

    const userPanNumberShow = closestParam.querySelector(
      '.sub-otp-con4 .inner-otp-con2 .otp-main-con1',
    );
    // added userPanNumber
    userPanNumberShow.textContent = userPanNumber.toUpperCase();

    closestParam.querySelector('.pan-details-modal').style.display = 'block';
    // existingUser(block);
    // const classAddv3 = closestParam.querySelector('.fdp-kyc-form');
    // if (Array.from(classAddv3.classList).includes('hide-modal')) {
    //   classAddv3.classList.remove('hide-modal');
    // }
    // classAddv3.classList.remove('hide-modal');
    // classAddv3.classList.add('modal-show');
    if (userPanNumber === '') {
      checkInput.classList.add('show-error');
    }
    if (!checkInput.classList.contains('show-error')) {
      apiCall(userPanNumber); // Only called if no error
    } else {
      console.log('PAN number is invalid. API call blocked.');
    }
  });

  // Create the error message element once

  const errorPanEl = document.createElement('p');
  errorPanEl.className = 'error-pan hide-error'; // initially hidden
  errorPanEl.textContent = 'Invalid PAN number';
  inputLable.appendChild(errorPanEl); // append it once

  inputLable.addEventListener('input', (e) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const inputValue = e.target.value.toUpperCase();

    if (inputValue === '') {
      // If empty, hide the error
      errorPanEl.classList.remove('show-error');
      errorPanEl.classList.add('hide-error');
    } else if (panRegex.test(inputValue)) {
      // If valid PAN, hide error
      errorPanEl.classList.remove('show-error');
      errorPanEl.classList.add('hide-error');
    } else {
      // If invalid PAN, show error
      errorPanEl.classList.remove('hide-error');
      errorPanEl.classList.add('show-error');
    }
  });

  // this function for hide modal forms

  const mod = closestParam.querySelector('.pan-details-modal .icon-modal-btn');
  const mod2 = closestParam.querySelector('.fdp-kyc-form .icon-modal-btn');
  const mod3 = closestParam.querySelector('.otp-fdp .icon-modal-btn');
  closestParam.querySelector('.pan-details-modal');
  const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });
  async function removeClassAfterDelay() {
    await delay(1200);
    closestParam.querySelector('.card-modal-overlay').remove();
  }

  function hideFormsClick(btn) {
    const card2 = closestParam.querySelector('.our-popular-funds')
      || closestParam.querySelector('.known-our-funds')
      || closestParam.querySelector('.fdp-card-container');

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop click from bubbling further
      document.body.classList.remove('noscroll');
      card2.classList.remove('modal-active-parent');

      const classAdd = card2.querySelector('.pan-details-modal');
      if (Array.from(classAdd.classList).includes('hide-modal')) {
        classAdd.classList.remove('hide-modal');
      }
      classAdd.classList.add('hide-modal');
      setTimeout(() => {
        classAdd.style.display = 'none';
      }, 1200);
      classAdd.classList.remove('modal-show');
      // }
      document.body.classList.remove('noscroll');
      card2.classList.remove('modal-active-parent');

      // v2 for kyc form

      const classAddv2 = card2.querySelector('.fdp-kyc-form');
      if (Array.from(classAdd.classList).includes('hide-modal')) {
        classAddv2.classList.remove('hide-modal');
      }
      classAddv2.classList.add('hide-modal');
      classAddv2.classList.remove('modal-show');
      // }
      document.body.classList.remove('noscroll');
      card2.classList.remove('modal-active-parent');

      // v3 for otp

      const classAddv3 = card2.querySelector('.otp-fdp');
      if (Array.from(classAdd.classList).includes('hide-modal')) {
        classAddv3.classList.remove('hide-modal');
      }
      classAddv3.classList.add('hide-modal');
      classAddv3.classList.remove('modal-show');
      // }
      document.body.classList.remove('noscroll');
      card2.classList.remove('modal-active-parent');

      // overlay.classList.add('hide-overlay');
      removeClassAfterDelay();
    });
  }

  hideFormsClick(mod2);
  hideFormsClick(mod);
  hideFormsClick(mod3);
}

function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Helper function to create a custom dropdown
function createCustomDropdown(id, labelText, options, defaultValue) {
  return div(
    { class: 'custom-select-wrapper', id: `custom-select-${id}` },
    label({ class: 'custom-select-label' }, labelText),
    div({ class: 'select-selected' }, defaultValue),
    div(
      { class: 'select-options' },
      ul(...options.map((opt) => li({ 'data-value': opt }, opt))),
    ),
    input({ type: 'hidden', id, value: defaultValue }),
  );
}

export default function decorate(block) {
  dataMapMoObj.panDlts = {};
  loadCSS('../../scripts/flatpickr.min.css');
  const schcodeFromStorage = localStorage.getItem('schcodeactive');
  const fundData = dataCfObj.find(
    (fund) => fund.schcode === schcodeFromStorage,
  );
  let fundNameFromData;
  if (fundData) {
    // console.log('Found Fund Data:', fundData);
    fundNameFromData = fundData.schDetail.schemeName
      .replaceAll('Motilal Oswal', '');
  } else {
    // console.error('No fund data found for schcode:', schcodeFromStorage);
  }
  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');

  const lumpsumLabel = col1[1]?.textContent || '';
  const sipLabel = col1[2]?.textContent || '';
  const inputLabel = col1[3]?.textContent || '';

  // const defaultAmount = col2[0]?.textContent || '';
  const rawAmount = col2[0]?.textContent || '';
  const defaultAmount = rawAmount
    ? Number(rawAmount).toLocaleString('en-IN')
    : '';
  const formattedSuggestions = [col2[1], col2[2], col2[3]].map(
    (pelem) => pelem?.textContent || '',
  );
  const suggestions = formattedSuggestions.map((s) => Number(s).toLocaleString('en-IN'));
  const frequency = col3[0]?.textContent || '';
  const endDate = col3[1]?.textContent || '';
  // const ctaLabel = col3[2]?.textContent || '';

  // Frequency options (mirror your JSON)
  const brandName = 'Motilal Oswal';
  // const logoSrc = '../../icons/Group.svg';
  const mop = `MO_${schcodeFromStorage}.svg`;
  const logoSrc = `../../icons/iconfund/${mop}`;
  const calendarIconSrc = '../../icons/calendar.svg'; // Replace with your real calendar icon path
  const infotoolsrc = '../../icons/infotooltip.svg';
  const closesrc = '../../icons/cross.svg';
  const frequencyOptions = [
    'Annual',
    'Daily',
    'Fortnightly',
    'Monthly',
    'Quarterly',
    'Weekly',
  ];
  const endDateOptions = ['Until I cancel', 'Select Date'];

  block.innerHTML = '';

  // Close Button
  function getTodaysDateFormatted() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const closebtn = div(
    { class: 'modal-btn' },
    span(
      { class: 'close-btn' },
      img({ class: 'modal-btn-svg', src: closesrc, alt: 'cross' }),
    ),
  );

  // Build modal
  const modal = div(
    { class: 'invest-now-modal fdp-sip-modal' },
    div(
      { class: 'modal-header-container' },
      div(
        { class: 'modal-header' },
        div(
          { class: 'modal-header-logo' },
          img({ class: 'brandlogo', src: logoSrc, alt: 'BrandLogo' }),
        ),
        div(
          { class: 'modal-header-subtitle' },
          p({ class: 'brandname' }, brandName),
          h3({ class: 'fund-name' }, fundNameFromData),
        ),
      ),
      div(
        { class: 'modal-toggle' },
        div(
          { class: 'modal-btn-lumpsum active' },
          button({ class: 'lumpsum-btn' }, lumpsumLabel),
        ),
        div({ class: 'modal-btn-sip' }, button({ class: 'sip-btn' }, sipLabel)),
      ),
    ),
    div(
      { class: 'modal-inputs-container' },
      div(
        { class: 'modal-inputs-subcontainer' },
        div(
          { class: 'modal-inputs' },
          div(
            { class: 'modal-input' },
            label(inputLabel),
            div(
              { class: 'modal-input-symbol' },
              // input({ type: 'number', value: defaultAmount, class: 'amount-input' })),
              input({
                type: 'tel',
                inputmode: 'numeric',
                pattern: '[0-9]*',
                value: defaultAmount,
                class: 'amount-input',
              }),
              span(
                { class: 'amount-error error-hide' },
                'Amount must be between 500 and 1000000',
              ),
            ),
          ),
          div(
            { class: 'modal-suggestions' },
            ...suggestions.map((s) => button({ class: 'suggestion-btn' }, `₹ ${s}`)),
          ),
        ),
        div(
          { class: 'modal-input-fields hidden' },
          div(
            { class: 'modal-sip' },
            div(
              { class: 'modal-sip-starts' },
              div(
                { class: 'sip-starts-maintext' },
                p({ class: 'sip-starts-text' }, 'SIP starts from '),
              ),
              div(
                { class: 'sip-starts-maindate' },
                p({ class: 'sip-starts-date' }, getTodaysDateFormatted()),
                // button({ class: 'calendar-btn' },
                //   img({ src: calendarIconSrc, alt: 'Calendar Icon' })
                // ))
                img({
                  class: 'calendar-btn',
                  src: calendarIconSrc,
                  alt: 'Calendar Icon',
                  'aria-label': 'Select start date',
                }),
              ),
            ),
            div(
              { class: 'modal-start-today' },
              label(
                input({ type: 'checkbox', class: 'start-today-checkbox' }),
                span({ class: 'custom-box' }),
                span(' Start Today'),
              ),
              div(
                { class: 'start-today-note' },
                p(
                  { class: 'sip-note' },
                  'Your 1st SIP Installment will be debited today ',
                ),
                span(
                  { class: 'sip-note-highlight' },
                  img({ class: '', src: infotoolsrc, alt: 'information' }),
                ),
              ),
            ),
          ),
          div(
            { class: 'date-drop-down' },
            createCustomDropdown(
              'frequency',
              'Frequency',
              frequencyOptions,
              frequency,
            ),
            createCustomDropdown('endDate', 'End Date', endDateOptions, endDate),
          ),
        ),
      ),
      div(
        { class: 'modal-cta' },
        button({ class: 'buy-now-btn' }, 'BUY NOW'),
        button({ class: 'start-now' }, 'Start Now'),
      ),
    ),
  );

  // Tooltip
  const tooltip = div(
    { class: 'sip-tooltip hide' },
    div(
      { class: 'modal-btn tooltip-btn' },
      span(
        { class: 'close-btn' },
        img({ class: 'modal-btn-svg', src: closesrc, alt: 'cross' }),
      ),
    ),
    div(
      { class: 'tooltip-box' },
      p({ class: 'tooltip-note' }, 'Note'),
      div(
        { class: 'tooltip-info' },
        'We’ll debit your first SIP installment today through your chosen payment mode, and all future installments will be automatically collected via your registered Autopay or URN.',
      ),
    ),
  );

  const modalContainer = div(
    { class: 'invest-now-container', id: 'invest-now-wrapper-flat' },
    closebtn,
    modal,
    tooltip,
  );
  block.append(modalContainer);

  const classAdd = block.closest('.invest-now-homepage-container');
  if (Array.from(classAdd.classList).includes('hide-modal')) {
    classAdd.classList.remove('hide-modal');
  }
  if (classAdd) {
    classAdd.classList.add('modal-show');
    classAdd.classList.remove('hide-modal');
  }
  modal.querySelector('.start-now').addEventListener('click', () => {
    const mainmo = block.closest('.card-modal-overlay');
    mainmo.querySelector('.invest-now-homepage-container').style.display = 'none';
    mainmo.querySelector('.pan-details-modal').style.display = 'block';
    existingUser(block);
    const classAddv2 = mainmo.querySelector('.pan-details-modal');
    if (Array.from(classAddv2.classList).includes('hide-modal')) {
      classAddv2.classList.remove('hide-modal');
    }
    classAddv2.classList.remove('hide-modal');
    classAddv2.classList.add('modal-show');

    // const classAddv3 = mainmo.querySelector('.otp-fdp');
    // if (Array.from(classAddv3.classList).includes('hide-modal')) {
    //   classAddv3.classList.remove('hide-modal');
    // }
    // classAddv3.classList.remove('hide-modal');
    // classAddv3.classList.add('modal-show');
  });

  // 1. Add open/close logic
  const lumpsumBtn = block.querySelector('.modal-btn-lumpsum');
  const sipBtn = block.querySelector('.modal-btn-sip');
  const sipFields = block.querySelector('.modal-input-fields');

  lumpsumBtn.addEventListener('click', () => {
    lumpsumBtn.classList.add('active');
    sipBtn.classList.remove('active');
    sipFields.classList.add('hidden');
    sipFields.classList.remove('flex');
  });

  sipBtn.addEventListener('click', () => {
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
      // Remove .active from all buttons
      suggestionButtons.forEach((b) => b.classList.remove('active'));
      // Add .active to the clicked button
      btn.classList.add('active');
      const value = btn.textContent.split(' ')[1];
      amountInput.value = value;
      amountInput.dispatchEvent(new Event('input'));
    });
  });

  // --- 2. ADD this new helper function ---
  function syncSuggestionButtonsState() {
    const currentValue = amountInput.value;
    // eslint-disable-next-line no-unused-vars
    let hasActiveMatch = false;
    suggestionButtons.forEach((btn) => {
    // Check if the button's text matches the input's value
      if (`₹ ${currentValue}` === btn.textContent.trim()) { // Added .trim() for robustness
        btn.classList.add('active');
        hasActiveMatch = true; // This reassignment is now valid
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- 3. MODIFY the `handleAmountInput` function to call the new sync function ---
  function handleAmountInput(e) {
    const inputVal = e.target;
    const rawValue = inputVal.value.replace(/[^0-9]/g, '');

    if (rawValue) {
      const formattedValue = parseInt(rawValue, 10).toLocaleString('en-IN');
      input.value = formattedValue;
    } else {
      input.value = '';
    }

    const amount = parseFloat(rawValue) || 0;
    const amountError = block.querySelector('.amount-error');

    if (amount < 500 && rawValue !== '') {
      amountError.classList.add('error-show');
    } else {
      amountError.classList.remove('error-show');
    }

    if (amount > 1000000) {
      input.value = input.value.slice(0, -1);
    }

    syncSuggestionButtonsState();
  }
  amountInput.addEventListener('input', handleAmountInput);

  // This sets the initial active button based on the default amount.
  syncSuggestionButtonsState();

  // 3. tooltip disaply
  const sipNote = block.querySelector('.sip-note-highlight');
  const sipText = block.querySelector('.sip-tooltip');
  sipNote.addEventListener('click', () => {
    sipText.classList.add('show');
    sipText.classList.remove('hide');
  });

  const closeTooltip = block.querySelector('.tooltip-btn');
  closeTooltip.addEventListener('click', () => {
    sipText.classList.add('hide');
    sipText.classList.remove('show');
  });

  // 4. flat date picker
  const calendarIcon = block.querySelector('.calendar-btn');
  const sipDateDisplay = block.querySelector('.sip-starts-date');
  const calendarContainer = block.querySelector('.invest-now-container');
  const selDate = block.querySelector('#custom-select-endDate .select-options');
  const finsel = selDate.querySelector('[data-value="Select Date"]');
  const dateSel = block.querySelector('#custom-select-endDate .select-selected');
  function flakterDate(datelement, displayDate) {
    // ADDED: A variable to store the user-selected date
    let originalSipDate = '';
    const fpInstance = window.flatpickr(datelement, {
      defaultDate: 'today',
      altInput: false,
      appendTo: calendarContainer,
      disableMobile: true,
      // FIX 1: Added a safety check to prevent the crash on mobile.
      onReady(_, __, fp) {
        if (fp.calendarContainer) {
          fp.calendarContainer.removeAttribute('style');
        } else {
          console.log('somehting is wrong');
        }
      },
      onChange(selectedDates) { // (selectedDates, dateStr, instance) {
        const selectedDate = selectedDates[0];
        const day = selectedDate.getDate();
        const month = selectedDate.toLocaleString('default', { month: 'short' });
        const year = selectedDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;

        displayDate.textContent = formattedDate;

        // Update the stored date whenever the user picks a new one
        originalSipDate = formattedDate;
      },
      position: (self, node) => {
        const top = self.element.offsetTop + self.element.offsetHeight + 8;
        const left = self.element.offsetLeft;

        node.style.top = `${top}px`;
        node.style.left = `${left}px`;
      },
    });
    console.log(fpInstance);
    // ADDED: Logic for the 'Start Today' checkbox
    const startTodayCheckbox = block.querySelector('.start-today-checkbox');

    // Helper function to get today's date in the correct format

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

  function flakterDateV2(datelement, displayDate, dropdownVal) {
    let disableRule = [];
    const defaultDate = new Date(); // Initialize with today

    // Use a single 'today' constant for all calculations
    const today = new Date();
    // Set time to 0 to avoid time-related comparison issues
    today.setHours(0, 0, 0, 0);

    switch (dropdownVal) {
      case 'Monthly': {
        const recurringDay = today.getDate();
        defaultDate.setMonth(today.getMonth() + 1);

        const year = defaultDate.getFullYear();
        const nextMonth = defaultDate.getMonth() + 1;
        const lastDayOfNextMonth = new Date(year, nextMonth, 0).getDate();
        const targetDay = Math.min(recurringDay, lastDayOfNextMonth);
        defaultDate.setDate(targetDay);

        disableRule = [
          function (date) {
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            const targetDayInMonth = Math.min(recurringDay, lastDayOfMonth);
            return date.getDate() !== targetDayInMonth;
          },
        ];
        break;
      }
      case 'Annual': {
        const recurringDay = today.getDate();
        const recurringMonth = today.getMonth();
        defaultDate.setFullYear(today.getFullYear() + 1);

        disableRule = [
          function (date) {
            return date.getDate() !== recurringDay || date.getMonth() !== recurringMonth;
          },
        ];
        break;
      }
      case 'Weekly': {
        const recurringDayOfWeek = today.getDay();
        defaultDate.setDate(today.getDate() + 7);

        disableRule = [
          function (date) {
            return date.getDay() !== recurringDayOfWeek;
          },
        ];
        break;
      }
      case 'Fortnightly': { // <-- CORRECTED LOGIC
        const startTime = today.getTime();
        defaultDate.setDate(today.getDate() + 14);

        disableRule = [
          function (date) {
            // Calculate difference in whole days for reliability
            const diffDays = Math.round((date.getTime() - startTime) / (1000 * 60 * 60 * 24));
            return diffDays % 14 !== 0;
          },
        ];
        break;
      }
      case 'Quarterly': {
        const startDay = today.getDate();
        const startMonth = today.getMonth();
        defaultDate.setMonth(today.getMonth() + 3);

        disableRule = [
          function (date) {
            const yearDiffInMonths = (date.getFullYear() - today.getFullYear()) * 12;
            const monthDiffInMonths = date.getMonth() - startMonth;
            const monthDiff = yearDiffInMonths + monthDiffInMonths;
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            const targetDay = Math.min(startDay, lastDayOfMonth);
            return date.getDate() !== targetDay || monthDiff % 3 !== 0;
          },
        ];
        break;
      }
      case 'Daily': { // <-- CORRECTED LOGIC
        defaultDate.setDate(today.getDate() + 1);
        // No custom disable rules are needed for 'Daily'. 'minDate' handles it.
        disableRule = [];
        break;
      }
      default:
        // Default case with no rules
        disableRule = [];
        break;
    }

    const fpInstance = window.flatpickr(datelement, {
      defaultDate,
      altInput: false,
      appendTo: calendarContainer,
      disableMobile: true,
      disable: disableRule,
      minDate: today, // Consistently prevent past dates for all cases

      onReady(_, __, fp) {
        if (fp.calendarContainer) {
          fp.calendarContainer.removeAttribute('style');
        }
      },
      onChange(selectedDates) {
        if (!selectedDates[0]) return;
        const selectedDate = selectedDates[0];
        const day = selectedDate.getDate();
        const month = selectedDate.toLocaleString('default', { month: 'short' });
        const year = selectedDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        displayDate.textContent = formattedDate;
        // originalSipDate = formattedDate;
      },
    });
    console.log(fpInstance);
    // Manually set the initial display text after initialization
    if (defaultDate) {
      const day = defaultDate.getDate();
      const month = defaultDate.toLocaleString('default', { month: 'short' });
      const year = defaultDate.getFullYear();
      displayDate.textContent = `${day} ${month} ${year}`;
    }
  }
  flakterDate(calendarIcon, sipDateDisplay);
  // flakterDateV2(finsel, dateSel, 'Monthly');
  // --- CORRECTED CUSTOM DROPDOWN LOGIC ---
  block.querySelectorAll('.custom-select-wrapper').forEach((wrapper) => {
    const selected = wrapper.querySelector('.select-selected');
    const options = wrapper.querySelector('.select-options');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    selected.addEventListener('click', (e) => {
      e.stopPropagation();
      block
        .querySelectorAll('.custom-select-wrapper.open')
        .forEach((openWrapper) => {
          if (openWrapper !== wrapper) {
            openWrapper.classList.remove('open');
          }
        });
      // Toggle the current one
      wrapper.classList.toggle('open');
    });

    options.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        hiddenInput.value = option.getAttribute('data-value');
        wrapper.classList.remove('open');
        if (selected.closest('#custom-select-frequency')) {
          if (block.querySelectorAll('.flatpickr-calendar').length === 2) {
            block.querySelectorAll('.flatpickr-calendar')[1].remove();
          }
          flakterDateV2(finsel, dateSel, option.textContent);
          const attr = Array.from(block.querySelectorAll('.flatpickr-calendar'));
          attr[1].classList.add('open');
        }
        if (selected.textContent === 'Select Date') {
          if (block.querySelectorAll('.flatpickr-calendar').length === 2) {
            block.querySelectorAll('.flatpickr-calendar')[1].remove();
          }
          const parSel = selected.closest('.date-drop-down');
          const paraText = parSel.querySelector('#custom-select-frequency .select-selected');
          flakterDateV2(finsel, dateSel, paraText.textContent);
          const attr = Array.from(block.querySelectorAll('.flatpickr-calendar'));
          attr[1].classList.add('open');
        }
      });
    });
  });

  // Add a listener to close dropdowns when clicking anywhere else
  block.addEventListener('click', () => {
    block
      .querySelectorAll('.custom-select-wrapper.open')
      .forEach((openWrapper) => {
        openWrapper.classList.remove('open');
      });
  });
}
