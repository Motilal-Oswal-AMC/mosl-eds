/*    */
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import dataMapMoObj from '../../scripts/constant.js';
import { loadAutoBlock } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
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
  ];
  dataMapMoObj.addIndexed(block);

  // wrap .footer-sub-cont2 and .footer-sub-cont3 in a container <div>
  const social = footer.querySelector('.footer-sub-cont2');
  const store = footer.querySelector('.footer-sub-cont3');
  if (social && store) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('footer-sub-wrapper'); // your custom wrapper class
    social.before(wrapper);
    wrapper.append(social, store);
  }

  loadAutoBlock(footer);
}
