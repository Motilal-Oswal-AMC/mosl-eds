import {
  div,
  h2,
  p,
  img,
} from '../../scripts/dom-helpers.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import Swiper from '../swiper/swiper-bundle.min.js';
import dataMapMoObj from '../../scripts/constant.js';

// --- CONSTANTS AND STATE ---

/**
 * The breakpoint for activating the Swiper carousel.
 * It will be active on screens with a width <= this value.
 */
const MOBILE_BREAKPOINT = 1025;

/**
 * Holds the active Swiper instance for later destruction.
 */
let swiperInstance = null;

// --- HELPER FUNCTIONS ---

/**
 * Creates a single card element.
 * IMPORTANT: This function now appends the icons *after* the main structure is created,
 * which is a safer pattern for working with `dom-helpers`.
 *
 * @param {object} cardData - The data object for the card.
 * @param {string} brandName - The brand name text.
 * @param {HTMLElement} iconsTemplate - A template of the icons to clone for each card.
 * @returns {HTMLElement} The complete card element.
 */
function createCardElement(cardData, brandName, iconsTemplate) {
  const iconsvg = `${dataMapMoObj.iconsNfo[cardData.risk.riskType.toLowerCase().replaceAll(' ', '-')]}.svg`;
  const mop = cardData.fundIcon !== undefined ? cardData.fundIcon.split('/').at(-1) : 'MO_Midcap_Fund.png';
  const mopsec = mop.split('.');
  const mopthree = `${mopsec[0]}.svg`;
  // 1. Create the card structure WITHOUT the icons.
  const cardElement = div(
    { class: 'card-wrap' },
    div(
      { class: 'img-wrapper' },
      div(
        { class: 'imgelogo' },
        img({
          class: 'logoScheme',
          src: `../../icons/fundicon/${mopthree}`,
          alt: 'BrandLogo',
          loading: 'lazy',
        }),
      ),
    ),
    div(
      { class: 'title-subtitle' },
      p(brandName),
      div(
        { class: 'title title-logo' },
        h2(cardData.schDetail.schemeName.replaceAll('Motilal Oswal', '')), // Or use dynamic data: h2(cardData.name || 'Scheme Name')
      ),
    ),
    // Create an empty container for the icons
    div({ class: 'icons-card-wrap' }),
  );

  // 2. Find the empty container and append the cloned icons. This is the fix.
  const iconsContainer = cardElement.querySelector('.icons-card-wrap');
  if (iconsContainer && iconsTemplate) {
    const divwrapper = document.createElement('div');
    divwrapper.classList.add('risk-home');
    const link = document.createElement('a');
    link.href = '/motilalfigma/modals/risk-o-meter';
    const svfion = iconsTemplate.querySelector('img');
    svfion.src = `/icons/risk-icon/${iconsvg}`;
    link.append(svfion);
    divwrapper.append(link);
    iconsTemplate.querySelector('.icon').innerHTML = '';
    iconsTemplate.querySelector('.icon').append(divwrapper);

    const divwrappertwo = document.createElement('div');
    divwrappertwo.classList.add('risk-home-two');
    const linktwo = document.createElement('a');
    linktwo.href = 'https://mosldev--eds-cloud--rupeshdept.aem.page/motilalfigma/funds-details-page';
    const svfiontwo = iconsTemplate.children[1].querySelector('img');
    linktwo.append(svfiontwo);
    divwrappertwo.append(linktwo);
    iconsTemplate.children[1].innerHTML = '';
    iconsTemplate.children[1].append(divwrappertwo);
    iconsContainer.append(iconsTemplate.cloneNode(true));
  }

  return cardElement;
}

/**
 * Sets up the Swiper carousel on the block.
 * @param {HTMLElement} block - The main block element.
 */
function initSwiper(block) {
  // Prevent re-initialization
  if (block.classList.contains('swiper-initialized')) return;

  block.classList.add('swiper');
  const swiperWrapper = div({ class: 'swiper-wrapper' });
  const swiperPagination = div({ class: 'swiper-pagination' });

  // Take all existing card elements and move them into the new wrapper
  const cardElements = [...block.children];
  cardElements.forEach((card) => {
    card.classList.add('swiper-slide');
    swiperWrapper.appendChild(card);
  });

  block.append(swiperWrapper, swiperPagination);

  swiperInstance = new Swiper(block, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    // loop: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: -1,
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto', spaceBetween: 16, slidesOffsetBefore: -1, slidesOffsetAfter: -1,
      },
      768: {
        slidesPerView: 'auto', spaceBetween: 16, slidesOffsetBefore: -1, slidesOffsetAfter: -1,
      },
    },
  });

  block.classList.add('swiper-initialized');
}

/**
 * Destroys the Swiper and restores the DOM to a static grid layout.
 * @param {HTMLElement} block - The main block element.
 */
function destroySwiper(block) {
  // Only run if Swiper is actually initialized
  if (!swiperInstance) return;

  swiperInstance.destroy(true, true);
  swiperInstance = null;

  const swiperWrapper = block.querySelector('.swiper-wrapper');
  if (swiperWrapper) {
    // Move all slides out of the wrapper and back into the main block
    [...swiperWrapper.children].forEach((slide) => {
      slide.className = 'card-wrap'; // Reset classes to the base state
      block.appendChild(slide);
    });
    swiperWrapper.remove(); // Remove the now-empty wrapper
  }

  // Re-apply the --promoted class which might have been lost
  if (block.children.length % 0 === 0) {
    block.children[1].classList.add('card-wrap--promoted');
  }

  const pagination = block.querySelector('.swiper-pagination');
  if (pagination) pagination.remove();

  block.classList.remove('swiper', 'swiper-initialized');
}

// --- MAIN DECORATE FUNCTION ---

/**
 * Decorates the 'Broaden Your Research' block.
 * @param {HTMLElement} block The main block element from the DOM.
 */
export default function decorate(block) {
  // 1. Extract templates and data from the initial, author-configured DOM
  const brandName = block.querySelector('p')?.innerText.trim() || 'Motilal Oswal';
  const iconsTemplate = block.querySelector('ul'); // A simpler, more robust selector

  if (!iconsTemplate) {
    console.error('Broaden Your Research: Icons template (<ul>) not found in the initial block content.');
    return;
  }

  // 2. Create the card elements in memory
  const cardData = dataCfObj.slice(0, 3);
  const cardElements = cardData.map((data) => createCardElement(data, brandName, iconsTemplate));

  // 3. Set up the block with the static (desktop) view first
  block.innerHTML = '';
  block.append(...cardElements);

  // Apply the 'promoted' style to the middle card for the static desktop view
  if (block.children.length > 1) {
    block.children[1].classList.add('card-wrap--promoted');
  }

  // 4. Set up the resize listener to conditionally apply/remove Swiper
  const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  const handleResize = (e) => {
    if (e.matches) {
      // Screen is mobile/tablet size -> INITIALIZE Swiper
      initSwiper(block);
    } else {
      // Screen is desktop size -> DESTROY Swiper
      destroySwiper(block);
    }
  };

  mediaQuery.addEventListener('change', handleResize);

  // Run the check once on initial page load
  handleResize(mediaQuery);
}
