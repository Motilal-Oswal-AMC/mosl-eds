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
  const titlle = panvalidmain1.querySelector('.panvalidmain1');
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
  const tnctext = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner3',
  ).cloneNode(true);
  const tncbtn = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner4',
  ).cloneNode(true);

  const divpv = div(
    { class: 'maincontainer' },
    titlle,
    div(
      {
        class: 'form-container',
      },
      div(
        {
          class: 'pan-container',
        },
        div(
          { class: 'input-wrap' },
          div(
            {
              class: 'pan-input',
            },
            label(
              {
                for: '',
              },
              panlab,
            ),
            input({
              class: 'user-pan-number',
              type: 'text',
            }),
            img({ class: 'pan-image', src: '../../icons/pencil.svg', alt: 'pencil' }),
          ),
          p({ class: 'show-pan-error error' }, 'Invalid PAN Number'),
        ),
        div(
          {
            class: 'radio-container',
          },
          div(
            {
              class: 'radios',
            },
            div(
              p(
                {
                  class: 'residenttext',
                },
                reslab,
              ),
            ),
            div(
              {
                class: 'radio-btns',
              },
              div(
                { class: 'radio-1' },
                input({
                  type: 'radio', name: 'radio-click', id: 'opt1',
                }),
                label({ class: 'rad-label', for: 'opt1' }, listraio[0].textContent.trim()),
              ),
              div(
                { class: 'radio-2' },
                input({
                  type: 'radio', name: 'radio-click', id: 'opt2',
                }),
                label({ class: 'rad-label', for: 'opt2' }, listraio[1].textContent.trim()),
              ),
            ),
          ),
          div(
            {
              class: 'kyc',
            },
            p(
              {
                class: 'iscriptin',
              },
              distext,
            ),
            p(
              {
                class: 'subdiscriptin',
              },
              distextsub,
            ),
          ),
        ),
      ),
      div(
        {
          class: 'name-container',
        },
        div(
          { class: 'fdp-inp-wrap' },
          div(
            {
              class: 'name-label pan-fields',
            },
            label(
              {
                class: 'pan-fields-label',
                for: '',
              },
              namelab,
            ),
            input({
              type: 'text',
              name: '',
              id: '',
              class: 'user-pan-name',
            }),
          ),
          p({ class: 'name-error error' }, 'Invalid Name'),
        ),
        div(
          { class: 'fdp-inp-wrap' },
          div(
            {
              class: 'number-label pan-fields',
            },
            label(
              {
                class: 'pan-fields-label',
                for: '',
              },
              pnlab,
            ),
            input({
              type: 'text',
              name: '',
              id: '',
              class: 'user-number',
            }),
            p({ class: 'country-code' }, '+91'),
          ),
          p({ class: 'number-error error' }, 'Invalid Number'),
        ),
        div(
          { class: 'fdp-inp-wrap' },
          div(
            {
              class: 'email-label pan-fields',
            },
            // ul(
            //   { class: 'list-of-options' },
            //   li({ class: 'email' }, 'Email'),
            //   li({ class: 'google' }, 'Google'),
            //   li({ class: 'Phone' }, 'Phone Number'),
            //   li({ class: 'etc' }, 'ETC'),
            //   li({ class: 'email' }, 'Email'),
            // ),
            label(
              {
                class: 'pan-fields-label',
                for: '',
              },
              emlab,
            ),
            input(
              {
                type: 'email',
                name: '',
                id: '',
                class: 'user-email',
              },
            ),
          ),
          p({ class: 'email-error error' }, 'Invalid Email'),
        ),
      ),
    ),
    div({ class: 'tnc-container' }, tnctext, tncbtn),
  );
  if (block.querySelector('.maincontainer') === null) {
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
    // const mokyc = mofdp.querySelector('.fdp-kyc-form');
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
    // mokyc.append(block);
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
    const otpDiv = div({ clasS: 'otp-container' },
      div({ class: 'modal-cross-btn' }, modalcrossbtn),
      div({ class: 'otp-heading' }, headTitle),
      // div({ class: 'pan-otp-wrap' },
      div({ class: 'pan-wrap' },
          div({ class: 'pan-field' },
            label({ class: 'pan-label' }, panLabel),
            input({ class: 'pan-inp', type: 'text' }),
          ),
          div({ class: 'kyc-verify' }, kycVerify),
      ),
      div({ class: 'otp-wrap' },
          p({ class: 'otp-label' }, otpLabel),
          div({ class: 'otp-field' },
            div({ class: 'otp-wrap' },
              input({ class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 1 of 6',})
            ),
            div({ class: 'otp-wrap' },
              input({ class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 2 of 6',})
            ),
            div({ class: 'otp-wrap' },
              input({ class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 3 of 6',})
            ),
            div({ class: 'otp-wrap' },
              input({ class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 4 of 6',})
            ),
            div({ class: 'otp-wrap' },
              input({ class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 5 of 6',})
            ),
            div({ class: 'otp-wrap' },
              input({ class: 'otp-inp', type: 'text', maxlength: 1, 'aria-label': 'OTP digit 6 of 6',})
            ),
          ),
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
              type: 'password', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 1 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 2 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 4 of 4',
            }),
          ),
          div(
            { class: 'pass-wrap' },
            input({
              type: 'password', maxlength: 1, class: 'confpass-inp pass-inp', 'aria-label': 'Passcode digit 3 of 4',
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
