// import {
//   div,
//   p,
//   input,
//   label,
//   span,
// } from '../../scripts/dom-helpers.js';
// import dataMapMoObj from '../../scripts/constant.js';

// export default function decorate(block) {
//   const loginImage = document.querySelector('.login-image-item');
//   dataMapMoObj.CLASS_PREFIXES = ['login-item', 'login-sub-item', 'login-inner-item'];
//   dataMapMoObj.addIndexed(block);

//   dataMapMoObj.CLASS_PREFIXES = ['login-image-item', 'login-image-sub-item', 'login-image-inner-item'];
//   dataMapMoObj.addIndexed(loginImage);

//   const loginPagePan = div(
//     { class: 'main-login-page' },
//     div(
//       { class: 'login-pan-label' },
//       p({ class: 'user-pan-para' }, 'Let’s Get Started'),
//       div(
//         { class: 'user-input-error' },
//         label({ class: 'input-lable' }, 'Enter PAN'),
//         input({ class: 'user-input', placeholder: 'Enter Pan' }),
//         p({ class: 'error-login' }, 'Please enter a valid PAN'),
//       ),
//     ),

//     div(
//       { class: 'btn-descr' },
//       p({ class: 'auth btn' }, 'Authenticate'),
//       div(
//         { class: 'discr-new-invester' },
//         p({ class: 'discr' }, 'By clicking ‘Continue’, you accept the', span({ class: 'terms-disc' }, 'Terms and conditions'), 'of Motilal Oswal AMC and agree to receive alerts & notifications via Motilal Oswal AMC SMS, Email and Business Whatsapp Account services.'),
//         p({ class: 'new-invest' }, 'Don’t have an account ?', span({ class: 'new-invest-disc' }, 'New Investor')),
//       ),
//     ),

//   );

//   const userLoginPage = document.querySelector('.login-page-wrapper');

//   userLoginPage.innerHTML = '';
//   userLoginPage.append(loginPagePan);
// }
