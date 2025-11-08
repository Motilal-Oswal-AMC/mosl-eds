// import dataMapMoObj from '../../scripts/constant.js';
// // import {
// //   input
// // } from '../../scripts/dom-helpers.js';

// export default function decorate(block) {
//   dataMapMoObj.CLASS_PREFIXES = [
//     'our-experts-cont',
//     'our-expert-section',
//     'our-expert-sub',
//     'expert-lists',
//     'expert-lists-wrap',
//     'expert-titles',
//     'expert-dropdown',
//   ];
//   dataMapMoObj.addIndexed(block);

//   const placeholder = block.querySelector('.our-experts-cont2
//  .our-expert-sub1')?.textContent || 'Search here...';

//   const inputEl = document.createElement('input');
//   inputEl.type = 'text';
//   inputEl.placeholder = placeholder;

//   const section1 = block.querySelector('.our-experts-cont2 .our-expert-sub1');
//   const iconSpan = section1?.querySelector('span.icon');

//   if (section1 && iconSpan) {
//     iconSpan.insertAdjacentElement('afterend', inputEl);
//   }

//   const listHeaders = document.querySelectorAll('.our-expert-sub3 .expert-lists-wrap1');

//   listHeaders.forEach((header) => {
//     header.addEventListener('click', () => {
//       const parentLi = header.closest('li'); // expert-lists1 / expert-lists2 / expert-lists3
//       const dropdown = parentLi.querySelector('.expert-dropdown2');

//       // Close other dropdowns
//       document.querySelectorAll('.our-expert-sub3 .expert-dropdown2').forEach((menu) => {
//         if (menu !== dropdown) {
//           menu.style.display = 'none';
//           menu.closest('li').classList.remove('open');
//         }
//       });

//       // Toggle current dropdown
//       if (dropdown) {
//         const isOpen = parentLi.classList.contains('open');
//         if (isOpen) {
//           dropdown.style.display = 'none';
//           parentLi.classList.remove('open');
//         } else {
//           dropdown.style.display = 'block';
//           parentLi.classList.add('open');
//         }
//       }
//     });
//   });
// }

import dataMapMoObj from '../../scripts/constant.js';
// import {
// } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    'our-experts-cont',
    'our-expert-section',
    'our-expert-sub',
    'expert-lists',
    'expert-lists-wrap',
    'expert-titles',
    'expert-dropdown',
  ];
  dataMapMoObj.addIndexed(block);

  // --- START: MODIFIED CODE ---

  const labelText = block.querySelector('.our-experts-cont2 .our-expert-sub1')?.textContent || 'Search here';
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('floating-label-wrapper');

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.id = 'our-experts-search';
  inputEl.placeholder = ' ';

  const labelEl = document.createElement('label');
  labelEl.htmlFor = inputEl.id;
  labelEl.textContent = labelText;

  inputWrapper.appendChild(inputEl);
  inputWrapper.appendChild(labelEl);

  const section1 = block.querySelector('.our-experts-cont2 .our-expert-sub1');
  const iconSpan = section1?.querySelector('span.icon');

  if (section1 && iconSpan) {
    iconSpan.insertAdjacentElement('afterend', inputWrapper);
  }

  // --- NEW: Add event listeners for focus/blur ---
  if (section1) {
    // Add class on input click (focus)
    inputEl.addEventListener('focus', () => {
      section1.classList.add('input-focused');
    });

    // Remove class when clicking away (blur)
    inputEl.addEventListener('blur', () => {
      section1.classList.remove('input-focused');
    });
  }
  // --- END: NEW CODE ---

  // --- END: MODIFIED CODE ---

  // --- UNCHANGED CODE ---
  const listHeaders = document.querySelectorAll('.our-expert-sub3 .expert-lists-wrap1');

  listHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const parentLi = header.closest('li'); // expert-lists1 / expert-lists2 / expert-lists3
      const dropdown = parentLi.querySelector('.expert-dropdown2');

      // Close other dropdowns
      document.querySelectorAll('.our-expert-sub3 .expert-dropdown2').forEach((menu) => {
        if (menu !== dropdown) {
          menu.style.display = 'none';
          menu.closest('li').classList.remove('open');
        }
      });

      // Toggle current dropdown
      if (dropdown) {
        const isOpen = parentLi.classList.contains('open');
        if (isOpen) {
          dropdown.style.display = 'none';
          parentLi.classList.remove('open');
        } else {
          dropdown.style.display = 'block';
          parentLi.classList.add('open');
        }
      }
    });
  });
}
