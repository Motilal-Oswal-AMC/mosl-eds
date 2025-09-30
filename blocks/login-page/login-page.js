import {
  div, p, input, label, span,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  const pagecontain = block.closest('.login-page-container');
  pagecontain.classList.add('login-register');

  const loginImage = document.querySelector('.login-image-item');
  dataMapMoObj.CLASS_PREFIXES = [
    'login-item',
    'login-sub-item',
    'login-inner-item',
  ];
  dataMapMoObj.addIndexed(block);

  dataMapMoObj.CLASS_PREFIXES = [
    'login-image-item',
    'login-image-sub-item',
    'login-image-inner-item',
  ];
  dataMapMoObj.addIndexed(loginImage);

  const loginPagePan = div(
    { class: 'main-login-page' },
    div(
      { class: 'login-pan-label' },
      p({ class: 'user-pan-para' }, 'Let’s Get Started'),
      div(
        { class: 'user-input-error' },
        label({ class: 'input-lable' }, 'Enter PAN'),
        input({ class: 'user-input', placeholder: 'Enter Pan' }),
        p({ class: 'error-login' }, 'Please enter a valid PAN'),
      ),
    ),

    div({ class: 'response-block' }),

    div(
      { class: 'btn-descr' },
      p({ class: 'auth btn' }, 'Authenticate'),
      div(
        { class: 'discr-new-invester' },
        p(
          { class: 'discr' },
          'By clicking ‘Continue’, you accept the',
          span({ class: 'terms-disc' }, 'Terms and conditions'),
          'of Motilal Oswal AMC and agree to receive alerts & notifications via Motilal Oswal AMC SMS, Email and Business Whatsapp Account services.',
        ),
        p(
          { class: 'new-invest' },
          'Don’t have an account ?',
          span({ class: 'new-invest-disc' }, 'New Investor'),
        ),
      ),
    ),
  );

  const userLoginPage = document.querySelector('.login-page-wrapper');

  userLoginPage.innerHTML = '';

  // block when need to form

  userLoginPage.append(loginPagePan);

  const kycVerified = div(
    { class: 'kycblock' },

    div(
      { class: 'enter-input-block' },
      label({ class: 'enter-label' }, 'Enter OTP'),
      div(
        { class: 'input-resend' },
        div(
          { class: 'otp-inputs-block' },
          input({ class: 'otp-input' }),
          input({ class: 'otp-input' }),
          input({ class: 'otp-input' }),
          input({ class: 'otp-input' }),
          input({ class: 'otp-input' }),
          input({ class: 'otp-input' }),
        ),
        p({ class: 'resend' }, 'Resend OTP'),
      ),
    ),

    div(
      { class: 'otp-para-block' },
      p(
        { class: 'otp-para' },
        'An OTP has been sent to siddharthXXXXX@gmail.com and mobile number 98XXX XXX65. SMS delivery may be delayed—please check your email for the OTP.',
      ),
    ),
  );

  const kycVerifiedAdd = document.querySelector('.response-block');

  // block when need to response kyc succssess

  // kycVerifiedAdd.append(kycVerified);

  const passcodeBlock = div(
    { class: 'passcode-main' },
    div(
      { class: 'label-pass' },
      label({ class: 'passcode-label' }, 'Enter Passcode'),
      div(
        { class: 'pass-input' },
        input({ class: 'pass-code-input' }),
        input({ class: 'pass-code-input' }),
        input({ class: 'pass-code-input' }),
        input({ class: 'pass-code-input' }),
      ),
    ),
    p(
      { class: 'forget-pass' },
      p({ class: 'pass-para' }, 'Forget Passcode?'),
    ),
  );

  // block when need to use passcode

  // kycVerifiedAdd.append(passcodeBlock);

  const kycRegistered = div(
    { class: 'main-register' },
    div(
      { class: 'text-status-block' },
      div(
        { class: 'radio-text' },
        p({ class: 'radio-text' }, 'Tax Status'),
        div(
          { class: 'text-radio-input' },
          div(
            { class: 'radio-label-input' },
            input({ class: 'radio-input', type: 'radio' }),
            label({ class: 'radio-label' }, 'Indian'),
          ),

          div(
            { class: 'radio-label-input' },
            input({ class: 'radio-input', type: 'radio' }),
            label({ class: 'radio-label' }, 'NRI'),
          ),
        ),
      ),

      div(
        { class: 'disc-text' },
        p({ class: 'text-registered' }, 'Your KYC is registered'),
        p({ class: 'disc-text-all' }, 'According to regulatory updates, KYC-registered investors must now submit Aadhaar-based KYC documents for investment transactions.'),
      ),
    ),

    div(
      { class: 'register-input-block' },
      div(
        { class: 'name-number-input' },
        div(
          { class: 'register-name-input  cont block-label-input' },
          label({ class: 'register-user-label label-reg ' }, 'Name as on PAN'),
          input({ class: 'register-user-input input-reg' }),
        ),

        div(
          { class: 'reg-mob-con-code' },
          div(
            { class: 'cont-code-block cont block-label-input cont-code' },
            p({ class: 'contry-code-para' }, '+91'),
            // input({ class: 'contry-code input-reg' }),
          ),
          div(
            { class: 'cont-code-block block-label-input' },
            label({ class: 'phone-number-label label-reg' }, 'Mobile Number'),
            input({ class: 'phone-number-input input-reg' }),
          ),

        ),
      ),

      div(
        { class: 'email-cty-name' },
        div(
          { class: 'email-block block-rex' },
          label({ class: 'label-email label-rex' }, 'Email ID'),
          input({ class: 'email-input input-rex' }),
        ),
        div(
          { class: 'city-block block-rex' },
          label({ class: 'label-city label-rex' }, 'City Name'),
          input({ class: 'city-input input-rex' }),
        ),
      ),
    ),
  );

  kycVerifiedAdd.append(kycRegistered);
}
