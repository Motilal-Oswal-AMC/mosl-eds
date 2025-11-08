import dataMapMoObj from '../../scripts/constant.js';
import {
  div, input, label, p, img, h2, span,
  button,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    'panvalidmain',
    'panvalidsub',
    'panvalidinner',
    'panvalidsubmain',
    'panvalidsubinner',
  ];
  dataMapMoObj.addIndexed(block.closest(['.section']));
  const panvalidmain1 = block.closest('.section');
  const title = panvalidmain1.querySelector('.panvalidmain1');
  const panlab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner1')
    .textContent.trim();

  const reslab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner2')
    .textContent.trim();

  const listraio = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidsubinner3',
  ).children;

  const distext = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner4')
    .textContent.trim();
  const distextsub = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner5')
    .textContent.trim();
  const namelab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner6')
    .textContent.trim();

  const pnlab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidinner2 .panvalidsubinner1')
    .textContent.trim();
  const emlab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidinner2 .panvalidsubinner2')
    .textContent.trim();
  const citylab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidinner2 .panvalidsubinner3')
    .textContent.trim();
  const tncbtn = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner4',
  ).cloneNode(true);
  const tnctext = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner5',
  ).cloneNode(true);
  const tncaccount = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner6',
  ).cloneNode(true);

  const divpv = div(
    { class: 'pankyc-container' },
    title,
    div(
      { class: 'form-container' },
      div(
        { class: 'pan-container' },
        div(
          { class: 'pan-field' },
          div(
            { class: 'pan-wrap pan-fail active' },
            label({ class: 'pan-label', for: 'pan' }, panlab),
            input({ class: 'pan-inp', id: 'pan', type: 'text' }),
            img({ class: 'error-icon', src: '/icons/icon-error.svg', alt: 'Cross Icon' }),
          ),
          span({ class: 'show-pan-error error-msg' }, 'Please enter a valid PAN'),
        ),
        div(
          { class: 'kyc-status-wrap' },
          div(
            { class: 'kyc-radio-wrap' },
            p({ class: 'kyc-radio-txt' }, reslab),
            div(
              { class: 'kyc-radio' },
              div(
                { class: 'radio-field' },
                input({
                  type: 'radio', class: 'radio-click', name: 'kyc-radio', id: 'opt1',
                }),
                label({ class: 'radio-label', for: 'opt1' }, listraio[0].textContent.trim()),
              ),
              div(
                { class: 'radio-field' },
                input({
                  type: 'radio', class: 'radio-click', name: 'kyc-radio', id: 'opt2',
                }),
                label({ class: 'radio-label', for: 'opt2' }, listraio[1].textContent.trim()),
              ),
            ),
          ),
          div(
            { class: 'kyc-txt-content' },
            p({ class: 'kyc-head' }, distext),
            p({ class: 'kyc-desc' }, distextsub),
          ),
        ),
      ),
      div(
        { class: 'kyc-detail-container' },
        div(
          { class: 'detail-field-wrap name-wrap' },
          div(
            { class: 'name-field detail-field' },
            label({ class: 'detail-label name-label', for: 'kyc-name' }, namelab),
            input({
              type: 'text', name: 'kyc-name', id: 'kyc-name', class: 'detail-inp name-inp',
            }),
            img({ class: 'error-icon', src: '/icons/icon-error.svg', alt: 'Cross Icon' }),
          ),
          p({ class: 'name-error error-msg' }, 'Please enter valid PAN name'),
        ),
        div(
          { class: 'detail-field-wrap mob-wrap' },
          div(
            { class: 'country-code-wrap' },
            p({ class: 'country-label' }, 'Country Code'),
            p({ class: 'country-code' }, '+91'),
          ),
          div(
            { class: 'mobile-field-wrap' },
            div(
              { class: 'mob-field detail-field' },
              label({ class: 'detail-label mob-label', for: 'kyc-mob' }, pnlab),
              input({
                type: 'tel', name: 'kyc-mob', id: 'kyc-mob', class: 'detail-inp mob-inp',
              }),
              img({ class: 'error-icon', src: '/icons/icon-error.svg', alt: 'Cross Icon' }),
            ),
            p({ class: 'mob-error error-msg' }, 'Enter valid Mobile number'),
          ),
        ),
        div(
          { class: 'detail-field-wrap email-wrap' },
          div(
            { class: 'email-field detail-field' },
            label({ class: 'detail-label email-label', for: 'kyc-email' }, emlab),
            input({
              type: 'email', name: 'kyc-email', id: 'kyc-email', class: 'detail-inp email-inp',
            }),
            img({ class: 'error-icon', src: '/icons/icon-error.svg', alt: 'Cross Icon' }),
          ),
          p({ class: 'email-error error-msg' }, 'Please enter valid email id'),
        ),
        div(
          { class: 'detail-field-wrap city-wrap' },
          div(
            { class: 'city-field detail-field' },
            label({ class: 'detail-label city-label', for: 'kyc-city' }, citylab),
            input({
              type: 'text', name: 'kyc-city', id: 'kyc-city', class: 'detail-inp city-inp',
            }),
            img({ class: 'error-icon', src: '/icons/icon-error.svg', alt: 'Cross Icon' }),
          ),
          p({ class: 'city-error error-msg' }, 'Please enter city name'),
        ),
      ),
    ),
    div({ class: 'tnc-container' }, tncbtn, tnctext, tncaccount),
  );
  if (block.querySelector('.pankyc-container') === null) {
    block.append(divpv);
  }

  block.querySelector('.panvalidinner1').style.display = 'none';
  block.querySelector('.panvalidinner2').style.display = 'none';

  const mofdp = block.closest('main');
  if (mofdp && mofdp.querySelector('.otp-fdp') !== null) {
  // mofdp.querySelector('.fdp-kyc-form .block').append(block);
    dataMapMoObj.CLASS_PREFIXES = ['main-otp-con', 'sub-otp-con', 'inner-otp-con', 'otp-main-con', 'otp-sub-con'];
    dataMapMoObj.addIndexed(mofdp.querySelector('.otp-fdp'));
    const optVar = mofdp.querySelector('.otp-fdp');
    const mokyc = mofdp.querySelector('.fdp-kyc-form');
    // const headtitle = optVar.querySelector('.sub-otp-con1').cloneNode(true);
    // const dis1 = optVar.querySelector('.sub-otp-con2').cloneNode(true);
    // const dis2 = optVar.querySelector('.sub-otp-con3').cloneNode(true);
    // const dis3 = optVar.querySelector('.sub-otp-con4').cloneNode(true);
    // const close = optVar.querySelector('.sub-otp-con5').cloneNode(true);
    const modalcrossbtn = optVar.querySelector('.sub-otp-con1').cloneNode(true);
    const headTitle = optVar.querySelector('.sub-otp-con2').cloneNode(true);
    const panLabel = optVar.querySelector('.sub-otp-con3').textContent;
    const kycVerify = optVar.querySelector('.sub-otp-con4').cloneNode(true);
    const otpLabel = optVar.querySelector('.sub-otp-con5').textContent;
    const reotpLabel = optVar.querySelector('.sub-otp-con6').textContent;
    const otpSent = optVar.querySelector('.sub-otp-con7').textContent;
    const sbmtBtn = optVar.querySelector('.sub-otp-con8').textContent;
    const termspolicy = optVar.querySelector('.sub-otp-con9').cloneNode(true);
    const haveAccnt = optVar.querySelector('.sub-otp-con10').cloneNode(true);
    mokyc.append(block);
    // const divotp = div(
    //   { class: 'main-contaienr' },
    //   div(
    //     { class: 'wrapper-block' },
    //     headtitle,
    //     div(
    //       { class: 'otpfield' },
    //       div(
    //         { class: 'otp-wrap' },
    //         input({
    //           type: 'text',
    //           class: 'otp-input',
    //           'aria-label': 'OTP digit 1 of 6',
    //           required: true,
    //           pattern: '[0-9]',
    //           tabindex: 1,
    //         }),
    //       ),
    //       div(
    //         { class: 'otp-wrap' },
    //         input({
    //           type: 'text',
    //           class: 'otp-input',
    //           'aria-label': 'OTP digit 2 of 6',
    //           required: true,
    //           pattern: '[0-9]',
    //           tabindex: 1,
    //         }),
    //       ),
    //       div(
    //         { class: 'otp-wrap' },
    //         input({
    //           type: 'text',
    //           class: 'otp-input',
    //           'aria-label': 'OTP digit 3 of 6',
    //           required: true,
    //           pattern: '[0-9]',
    //           tabindex: 1,
    //         }),
    //       ),
    //       div(
    //         { class: 'otp-wrap' },
    //         input({
    //           type: 'text',
    //           class: 'otp-input',
    //           'aria-label': 'OTP digit 4 of 6',
    //           required: true,
    //           pattern: '[0-9]',
    //           tabindex: 1,
    //         }),
    //       ),
    //       div(
    //         { class: 'otp-wrap' },
    //         input({
    //           type: 'text',
    //           class: 'otp-input',
    //           'aria-label': 'OTP digit 5 of 6',
    //           required: true,
    //           pattern: '[0-9]',
    //           tabindex: 1,
    //         }),
    //       ),
    //       div(
    //         { class: 'otp-wrap' },
    //         input({
    //           type: 'text',
    //           class: 'otp-input',
    //           'aria-label': 'OTP digit 6 of 6',
    //           required: true,
    //           pattern: '[0-9]',
    //           tabindex: 1,
    //         }),
    //       ),
    //     ),
    //     dis1,
    //     dis2,
    //     dis3,
    //     close,
    //   ),
    // );
    // if (optVar.querySelector('.otp-fdp .main-contaienr') === null) {
    //   optVar.querySelector('.main-otp-con1').innerHTML = '';
    //   optVar.querySelector('.main-otp-con1').append(divotp);
    //   if (optVar.querySelector('.otp-fdp .main-contaienr .main-contaienr')) {
    //     optVar.querySelector('.otp-fdp .main-contaienr .main-contaienr').remove();
    //   }
    // }
    const otpDiv = div(
      { clasS: 'otp-container' },
      div({ class: 'modal-cross-btn' }, modalcrossbtn),
      div({ class: 'otp-heading' }, headTitle),
      // div({ class: 'pan-otp-wrap' },
      div(
        { class: 'pan-wrap' },
        div(
          { class: 'pan-field' },
          label({ class: 'pan-label' }, panLabel),
          input({ class: 'pan-inp', type: 'text' }),
        ),
        div({ class: 'kyc-verify' }, kycVerify),
      ),
      div(
        { class: 'otp-wrap' },
        p({ class: 'otp-label' }, otpLabel),
        div(
          { class: 'otp-field' },
          div(
            { class: 'otp-wrap' },
            input({
              class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 1 of 6',
            }),
          ),
          div(
            { class: 'otp-wrap' },
            input({
              class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 2 of 6',
            }),
          ),
          div(
            { class: 'otp-wrap' },
            input({
              class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 3 of 6',
            }),
          ),
          div(
            { class: 'otp-wrap' },
            input({
              class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 4 of 6',
            }),
          ),
          div(
            { class: 'otp-wrap' },
            input({
              class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 5 of 6',
            }),
          ),
          div(
            { class: 'otp-wrap' },
            input({
              class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 6 of 6',
            }),
          ),
        ),
        p({ class: 'otp-error error-msg' }, 'Incorrect OTP'),
        button({ class: 'resend-btn' }, reotpLabel),
      ),
      p({ class: 'otp-sent-text' }, otpSent),
      button({ class: 'sbmt-btn' }, sbmtBtn),
      div({ class: 'terms-policy' }, termspolicy),
      div({ class: 'new-investor' }, haveAccnt),
      // ),
    );

    if (!optVar.querySelector('.otp-container')) {
      optVar.append(otpDiv);
    }
  }

  if (mofdp.querySelector('.reset-passcode')) {
    const resetPasscode = mofdp.querySelector('.reset-passcode');
    dataMapMoObj.CLASS_PREFIXES = ['resetpasscode', 'innerpasscode'];
    dataMapMoObj.addIndexed(resetPasscode);
    const resetmodalcross = mofdp.querySelector('.innerpasscode1').cloneNode(true);
    const resetpasstitle = mofdp.querySelector('.innerpasscode2').textContent;
    const resetpassotp = mofdp.querySelector('.innerpasscode3').textContent;
    const resetpassreotp = mofdp.querySelector('.innerpasscode4').textContent;
    const resetnewpass = mofdp.querySelector('.innerpasscode5').textContent;
    const resetconfpass = mofdp.querySelector('.innerpasscode6').textContent;
    const resetsubmit = mofdp.querySelector('.innerpasscode7').textContent;

    const resetpasscont = div(
      { class: 'reset-passcode-container' },
      div({ class: 'modal-cross-wrap' }, resetmodalcross),
      h2({ class: 'reset-title' }, resetpasstitle),
      p({ class: 'reset-desc' }, 'OTP has been sent to arjXXXXX@gmail.com & Mobile 7498XXXX58. Receiving on SMS may have delay, check your Email.'),
      div(
        { class: 'reset-otp-wrap' },
        p({ class: 'reset-otp-title' }, resetpassotp),
        div(
          { class: 'input-resend-wrap' },
          div(
            { class: 'otp-field-wrap' },
            div(
              { class: 'otp-wrap' },
              input({ type: 'text', class: 'otp-inp', 'aria-label': 'OTP digit 1 of 6' }),
            ),
            div(
              { class: 'otp-wrap' },
              input({ type: 'text', class: 'otp-inp', 'aria-label': 'OTP digit 2 of 6' }),
            ),
            div(
              { class: 'otp-wrap' },
              input({ type: 'text', class: 'otp-inp', 'aria-label': 'OTP digit 3 of 6' }),
            ),
            div(
              { class: 'otp-wrap' },
              input({ type: 'text', class: 'otp-inp', 'aria-label': 'OTP digit 4 of 6' }),
            ),
            div(
              { class: 'otp-wrap' },
              input({ type: 'text', class: 'otp-inp', 'aria-label': 'OTP digit 5 of 6' }),
            ),
            div(
              { class: 'otp-wrap' },
              input({ type: 'text', class: 'otp-inp', 'aria-label': 'OTP digit 6 of 6' }),
            ),
          ),
          span({ class: 'otp-msg' }, 'Incorrect OTP'),
          button({ class: 'resend-btn' }, resetpassreotp),
        ),
      ),
      div(
        { class: 'new-passcode passcode' },
        p({ class: 'new-pass-title passcode-title' }, resetnewpass),
        div(
          { class: 'new-pass-wrap passcode-field-wrap' },
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'newpass-inp pass-inp', 'aria-label': 'Passcode digit 1 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'newpass-inp pass-inp', 'aria-label': 'Passcode digit 2 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'newpass-inp pass-inp', 'aria-label': 'Passcode digit 4 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'newpass-inp pass-inp', 'aria-label': 'Passcode digit 3 of 4',
            }),
          ),
        ),
        span({ class: 'passcode-msg' }, 'Incorrect Passcode'),
      ),
      div(
        { class: 'conf-passcode passcode' },
        p({ class: 'conf-pass-title passcode-title' }, resetconfpass),
        div(
          { class: 'conf-pass-wrap passcode-field-wrap' },
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', placeholder: '', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 1 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', placeholder: '', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 2 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', placeholder: '', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 4 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', placeholder: '', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 3 of 4',
            }),
          ),
        ),
        span({ class: 'passcode-msg' }, 'Incorrect Passcode'),
      ),
      div(
        { class: 'submt-btn' },
        button({ class: 'submt-btn-txt' }, resetsubmit),
      ),
    );
    if (!resetPasscode.querySelector('.reset-passcode-container')) {
      resetPasscode.append(resetpasscont);
      resetPasscode.querySelector('.resetpasscode1').style.display = 'none';
    }
  }
}
