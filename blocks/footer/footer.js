/* */
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import dataMapMoObj from '../../scripts/constant.js';
import { loadAutoBlock } from '../../scripts/scripts.js';

/**
 * Initializes the scroll-to-top button.
 */
function initScrollToTop() {
  let scrollBtn = document.querySelector('.scroll-to-top');

  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="12" height="18" viewBox="0 0 14 21" fill="none"
           class="scroll-to-top-icon">
        <path d="M1 7.8125L7 1.8125M7 1.8125L13 7.8125M7 1.8125V19.8125" />
      </svg>
    `;
    document.querySelector('footer').appendChild(scrollBtn);
  }

  // Show/hide button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Smooth scroll
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const mainBlock = block.closest('body');
  const download = mainBlock.querySelector('main .download');
  if (download != null) {
    dataMapMoObj.CLASS_PREFIXES = [
      'download-p',
      'download-ul',
      'download-li',
      'download-inner-ul',
      'download-first-list',
      'download-second-list',
    ];
    dataMapMoObj.addIndexed(download);
  }
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // index with your class prefixes
  dataMapMoObj.CLASS_PREFIXES = [
    'footer-container',
    'footer-section',
    'footer-sub',
    'footer-sub-cont',
    'section-content',
    'list-items',
    'list-inneritem-',
  ];
  dataMapMoObj.addIndexed(block);

  block.querySelectorAll('.accordion-item-body .list-inneritem-1').forEach((ele) => {
    Array.from(ele.children).forEach((el) => {
      el.classList.add('list-innerlist');
    });
  });

  Array.from(block.querySelector('.list-items2').children).forEach((lieltwo) => {
    lieltwo.classList.add('item-list');
    Array.from(lieltwo.children).forEach((elrt) => {
      elrt.classList.add('item-anchor');
    });
  });

  // open all footer accordions by default
  const acccontain = block.querySelector('.footer-sub2 .accordion')?.children;
  if (acccontain) {
    Array.from(acccontain).forEach((itemel) => {
      if (!itemel.hasAttribute('open')) {
        itemel.setAttribute('open', '');
      }
    });
  }

  // wrap .footer-sub-cont2 and .footer-sub-cont3 in a container
  const social = footer.querySelector('.footer-sub-cont2');
  const store = footer.querySelector('.footer-sub-cont3');
  if (social && store) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('footer-sub-wrapper');
    social.before(wrapper);
    wrapper.append(social, store);

    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont2 .section-content1 img'),
      'facebook-icon',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont2 .section-content2 img'),
      'instagram-icon',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont2 .section-content3 img'),
      'x-icon',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont2 .section-content4 img'),
      'youtube-icon',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont2 .section-content5 img'),
      'lindkin-icon',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont3 .section-content1 img'),
      'bar-code',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont3 .section-content2 img'),
      'Download on Google Play',
    );
    dataMapMoObj.altFunction(
      wrapper.querySelector('.footer-sub-cont3 .section-content3 img'),
      'Download on the App Store',
    );
  }

  loadAutoBlock(footer);

  // Init scroll-to-top button
  initScrollToTop();
  const footercls = block.closest('.footer');
  Array.from(
    footercls.querySelector('.footer-section3 .footer-sub-cont2').children,
  ).forEach((efthre) => {
    efthre.classList.add('footerthr');
  });
}
