import dataMapMoObj from '../../scripts/constant.js';
// import {
//   input
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

  const placeholder = block.querySelector('.our-experts-cont2 .our-expert-sub1')?.textContent || 'Search';

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.placeholder = placeholder;

  const section1 = block.querySelector('.our-experts-cont2 .our-expert-sub1');
  const iconSpan = section1?.querySelector('span.icon');

  if (section1 && iconSpan) {
    iconSpan.insertAdjacentElement('afterend', inputEl);
  }

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
