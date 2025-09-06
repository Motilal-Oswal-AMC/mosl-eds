import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
// import { loadAutoBlock } from '../../scripts/scripts.js';
import dataMapMoObj from '../../scripts/constant.js';

// media query match that indicates mobile/tablet width
export const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  // const download = mainBlock.querySelector('main .download');
  if (navBrand != null) {
    dataMapMoObj.CLASS_PREFIXES = [
      'navbrand-cont',
      'navbrand-sec',
      'navbrand-sub',
      'navbrand-inner-net',
      'navbrand-list',
      'navbrand-list-content',
    ];
    dataMapMoObj.addIndexed(navBrand);
  }
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }
  const dropdownTrigger = navBrand.querySelector('.navbrand-sec3 .navbrand-inner-net1');
  const dropdownMenu = navBrand.querySelector('.navbrand-sec3 .navbrand-inner-net2');
  // debugger;
  if (dropdownTrigger && dropdownMenu) {
    // 1. When the trigger is clicked, toggle the dropdown
    dropdownTrigger.addEventListener('click', (event) => {
      // Stop this click from bubbling up to the document
      event.stopPropagation();
      dropdownMenu.classList.toggle('open');
    });

    // 2. When the dropdown menu itself is clicked, do nothing (and stop the click)
    dropdownMenu.addEventListener('click', (event) => {
      // This prevents the menu from closing when you click inside it
      event.stopPropagation();
    });

    // 3. CORRECTED: When anywhere else on the page is clicked, close the menu
    document.addEventListener('click', () => {
      // If the menu is open, close it
      if (dropdownMenu.classList.contains('open')) {
        dropdownMenu.classList.remove('open');
      }
    });
  }

  // const triggers = document.querySelectorAll('.navbrand-inner-net1');

  // for (let i = 0; i < triggers.length; i++) {
  //   const trigger = triggers[i];
  //   const parent = trigger.closest('.navbrand-sub1');
  //   const dropdown = parent.querySelector('.navbrand-inner-net2');

  //   if (!dropdown) continue;

  //   trigger.addEventListener('click', (e) => {
  //     e.preventDefault();

  //     // Close other dropdowns
  //     const openMenus = document.querySelectorAll('.navbrand-inner-net2.open');
  //     for (let j = 0; j < openMenus.length; j++) {
  //       if (openMenus[j] !== dropdown) {
  //         openMenus[j].classList.remove('open');
  //       }
  //     }

  //     // Toggle this dropdown
  //     dropdown.classList.toggle('open');

  //     // Auto-select first item when opening
  //     if (dropdown.classList.contains('open')) {
  //       const firstLink = dropdown.querySelector('a');
  //       if (firstLink) {
  //         const allLinks = dropdown.querySelectorAll('a');
  //         for (let k = 0; k < allLinks.length; k++) {
  //           allLinks[k].classList.remove('active');
  //         }
  //         firstLink.classList.add('active');
  //       }
  //     }
  //   });
  // }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    dataMapMoObj.CLASS_PREFIXES = [
      'nav-tools-cont',
      'nav-tools-sec',
      'nav-tools-sub',
      'nav-tools-inner-net',
      'nav-tools-list',
      'nav-tools-list-content',
    ];
    dataMapMoObj.addIndexed(navTools);
  }
  const headerTop = nav.querySelector('.section.header-top');
  if (headerTop) {
    dataMapMoObj.CLASS_PREFIXES = [
      'header-top-cont',
      'header-top-sec',
      'header-top-sub',
      'header-top-inner-text',
      'header-top-list',
      'header-top-list-content',
    ];
    dataMapMoObj.addIndexed(headerTop);
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // loadAutoBlock();
}
