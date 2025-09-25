import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import dataMapMoObj from '../../scripts/constant.js';
import dataCfObj from '../../scripts/dataCfObj.js';
// import { loadAutoBlock } from '../../scripts/scripts.js';
// import {a,button,div,h3,li,ul} from '../../scripts/dom-helpers.js';

// media query match that indicates mobile/tablet width
export const isDesktop = window.matchMedia('(min-width: 900px)');
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
    } else if (isDesktop.matches) {
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
  nav.classList.add('nfo-nav');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Find the main .nav-brand container once.
  const navBrand = nav.querySelector('.nav-brand');
  // Guard clause: If the .nav-brand element doesn't exist, prevent errors.
  if (navBrand) {
    // --- Section 1: Data Indexing and Button Cleanup (from your snippet) ---

    // Set up the class prefixes for your dataMapMoObj utility.
    if (typeof dataMapMoObj !== 'undefined' && dataMapMoObj.addIndexed) {
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

    // Find and clean up the legacy button wrapper, if it exists.
    const brandLink = navBrand.querySelector('.button');
    if (brandLink) {
      brandLink.className = ''; // Remove all classes from the link itself.
      const buttonContainer = brandLink.closest('.button-container');
      if (buttonContainer) {
        buttonContainer.className = ''; // Remove all classes from its container.
      }
    }

    // Select both the desktop and mobile logo containers within the navBrand element.
    const logoContainers = navBrand.querySelectorAll('.navbrand-sec1, .navbrand-sec2');

    logoContainers.forEach((container) => {
      // Change the cursor to a pointer to show it's clickable.
      container.style.cursor = 'pointer';

      // Add the click event listener to redirect to the home page.
      container.addEventListener('click', () => {
        window.location.href = 'https://mosldevexp--eds-cloud--rupeshdept.aem.live/motilalfigma/home-page';
      });
    });
  }
  const dropdownTrigger = navBrand.querySelector('.navbrand-sec3 .navbrand-inner-net1');
  const dropdownMenu = navBrand.querySelector('.navbrand-sec3 .navbrand-inner-net2');

  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle('open');
      dropdownTrigger.classList.toggle('active');
      const logineventab = block.querySelector('.nav-tools .nav-tools-sub4 .nav-tools-inner-net1');
      const nextel = logineventab.nextElementSibling;
      if (nextel.style.display === 'block') {
        nextel.style.display = 'none';
      }
    });

    dropdownMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', () => {
      if (dropdownMenu.classList.contains('open')) {
        dropdownMenu.classList.remove('open');
        dropdownTrigger.classList.remove('active');
      }
    });
  }
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    // A single timer is shared across all nav sections to prevent flickering.
    let leaveTimer;

    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach(async (navSection) => {
      if (navSection.querySelector('ul')) {
        navSection.classList.add('nav-drop');
        const hrefnaf = navSection.querySelector('ul li');
        const frgnav = await loadFragment(hrefnaf.children[0].getAttribute('href'));
        hrefnaf.innerHTML = '';
        hrefnaf.append(frgnav.children[0]);
      }

      // --- Desktop Hover Logic ---
      navSection.addEventListener('mouseenter', () => {
        if (isDesktop.matches) {
          // When entering a new item, cancel any pending timer to close a menu.
          // This prevents flickering when moving between menu items
          clearTimeout(leaveTimer);
          // Close all other menus before opening the new one.
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', 'true');
          document.body.classList.add('no-scroll');

          navSection.querySelector('ul > li').addEventListener('mouseleave', () => {
            if (isDesktop.matches) {
              leaveTimer = setTimeout(() => {
                toggleAllNavSections(navSections, false);
                document.body.classList.remove('no-scroll');
              }, 300); // A 300ms delay feels smooth and prevents accidental closing.
            }
          });
        }
        if (Array.from(navSection.classList).includes('nav-sec-sub2')) {
          const navdirect = navSection.querySelector('.nav-sec-inner-text2 .sub-popup-sec1');
          Array.from(navdirect.children).forEach((element) => {
            const listel = element.querySelector('.sub-popup-inner-text2');
            listel.querySelectorAll('a').forEach((ael) => {
              ael.removeAttribute('href');
              ael.addEventListener('click', (event) => {
                // localStorage.removeItem('viewmark');
                // localStorage.removeItem('planCode');
                let textcurr = event.currentTarget.textContent.trim();
                dataMapMoObj.selectviewFunds = '';
                if (Array.from(event.currentTarget.classList).length === 0) {
                  dataCfObj.forEach((datael) => {
                    if (datael.schDetail.schemeName === `Motilal Oswal ${textcurr}`) {
                      dataMapMoObj.selectviewFunds = datael.schcode;
                    }
                  });
                  if (dataMapMoObj.selectviewFunds !== '') {
                    localStorage.setItem('planCode', `Direct:${dataMapMoObj.selectviewFunds}`);
                    const pathname = '/motilalfigma/our-funds/funds-details-page';
                    window.location.href = `${window.location.origin}${pathname}`;
                  }
                } else {
                  if (textcurr === 'ETFs') {
                    textcurr = 'ETF';
                  }
                  if (textcurr === 'Large & Mid Cap') {
                    textcurr = 'large-and-mid-cap';
                  }
                  if (textcurr === 'Multi Cap') {
                    textcurr = 'multi-cap-fund';
                  }
                  if (textcurr === 'View All Funds') {
                    const pathname = '/motilalfigma/our-funds';
                    window.location.href = `${window.location.origin}${pathname}`;
                    return false;
                  }
                  dataMapMoObj.selectviewFunds = textcurr.toLocaleLowerCase().split(' ').join('-');
                  localStorage.setItem('viewmark', dataMapMoObj.selectviewFunds);
                  const pathname = '/motilalfigma/our-funds';
                  window.location.href = `${window.location.origin}${pathname}`;
                }
              });
            });
          });
        }
      });

      // When the mouse leaves the entire nav item area (L1 button + L2 menu),
      // start a timer to close it.
      navSection.addEventListener('mouseleave', () => {
        if (isDesktop.matches) {
          leaveTimer = setTimeout(() => {
            toggleAllNavSections(navSections, false);
            document.body.classList.remove('no-scroll');
          }, 300); // A 300ms delay feels smooth and prevents accidental closing.
        }
      });

      // --- Mobile Click Logic (Unaffected) ---
      navSection.addEventListener('click', () => {
        if (!isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });

      const subHeader = navSection.querySelectorAll('.section');
      dataMapMoObj.CLASS_PREFIXES = [
        'sub-popup-cont',
        'sub-popup-sec',
        'sub-popup-sub',
        'sub-popup-inner-text',
        'sub-popup-list',
        'sub-popup-list-content',
        'sub-popup-list-row',
      ];
      subHeader.forEach((sublist) => dataMapMoObj.addIndexed(sublist));
    });

    dataMapMoObj.CLASS_PREFIXES = [
      'nav-sec-cont',
      'nav-sec-sec',
      'nav-sec-sub',
      'nav-sec-inner-text',
      'nav-sec-list',
      'nav-sec-list-content',
    ];
    dataMapMoObj.addIndexed(navSections);
  }

  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const search = navTools.querySelector('a[href*="search"]');
    if (search && search.textContent === '') {
      search.setAttribute('aria-label', 'Search');
    }
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
  const dropTrigger = headerTop.querySelector('.header-top-sec1 .header-top-sub5 .header-top-inner-text1');
  const dropMenu = headerTop.querySelector('.header-top-sec1 .header-top-sub5 .header-top-inner-text2');

  if (dropTrigger && dropMenu) {
    dropTrigger.addEventListener('click', (event) => {
      event.stopPropagation();
      dropMenu.classList.toggle('open');
      dropTrigger.classList.toggle('active');
      const logineventab = block.querySelector('.nav-tools .nav-tools-sub4 .nav-tools-inner-net1');
      const nextel = logineventab.nextElementSibling;
      if (nextel.style.display === 'block') {
        nextel.style.display = 'none';
      }
    });

    dropMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
      if (dropMenu.classList.contains('open')) {
        dropMenu.classList.remove('open');
        dropTrigger.classList.remove('active');
      }
      if (!navSections.contains(event.target)) {
        toggleAllNavSections(navSections);
        document.body.classList.remove('no-scroll');
      }
    });
  }

  const nfoBanner = nav.querySelector('.section.nfo-banner');
  if (nfoBanner) {
    dataMapMoObj.CLASS_PREFIXES = [
      'nfo-banner-cont',
      'nfo-banner-sec',
      'nfo-banner-sub',
      'nfo-banner-inner-text',
      'nfo-banner-list',
      'nfo-banner-list-content',
    ];
    dataMapMoObj.addIndexed(nfoBanner);
  }
  (function initializeNfoBanner() {
    const setupUI = () => {
      const liveIndicatorContainer = nfoBanner.querySelector('.nfo-banner-sub1 .nfo-banner-list1');
      if (liveIndicatorContainer) {
        const liveIndicator = document.createElement('div');
        liveIndicator.className = 'live-indicator';
        liveIndicatorContainer.appendChild(liveIndicator);
      }

      const timerContainer = nfoBanner.querySelector('.nfo-banner-sub1 .nfo-banner-list3');
      if (timerContainer) {
        const timerElement = document.createElement('span');
        timerElement.id = 'countdown-timer';
        timerElement.textContent = '00d : 00h : 00m';
        timerContainer.appendChild(timerElement);
        return timerElement;
      }
      return null;
    };

    const startCountdown = (element) => {
      if (!element) {
        return;
      }

      const COUNTDOWN_DAYS = 2;
      const COUNTDOWN_HOURS = 20;
      const COUNTDOWN_MINUTES = 20;
      const ONE_SECOND_MS = 1000;

      const countDownDate = new Date();
      countDownDate.setDate(countDownDate.getDate() + COUNTDOWN_DAYS);
      countDownDate.setHours(countDownDate.getHours() + COUNTDOWN_HOURS);
      countDownDate.setMinutes(countDownDate.getMinutes() + COUNTDOWN_MINUTES);
      const countDownTime = countDownDate.getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownTime - now;

        if (distance < 0) {
          clearInterval(interval);
          element.textContent = 'EXPIRED';
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const pad = (num) => String(num).padStart(2, '0');

        element.textContent = `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m`;
      }, ONE_SECOND_MS);
    };

    const timerElement = setupUI();
    startCountdown(timerElement);
  }());

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => {
    toggleMenu(nav, navSections);
    toggleAllNavSections(navSections, 'false');
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });
  async function removeClassAfterDelay() {
    await delay(800);
    navSections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
      section.querySelectorAll('ul').forEach((elul) => {
        elul.style.display = 'none';
      });
      // const navshort = navSections.querySelector('ul').children[1];
      // const navsort = navshort.querySelector('.default-content-wrapper').firstElementChild;
      // navsort.querySelector('.li:nth-child(2)').style.display = 'flex';
      // navsort.querySelector('.sub-popup-list6 .sub-popup-list-content2').style.display = 'flex';

      const navinner = navSections.querySelector('.nav-sec-list1 .sub-popup-sub3 .sub-popup-inner-text2');
      navinner.querySelectorAll('ul').forEach((navel) => { navel.style.display = 'block'; });

      const navinnfive = navSections.querySelector('.nav-sec-sub5 .sub-popup-sub2 .sub-popup-inner-text2');
      navinnfive.querySelectorAll('ul').forEach((five) => { five.style.display = 'block'; });

      const navinnfour = navSections.querySelector('.nav-sec-sub4 .sub-popup-sub2 .sub-popup-inner-text2');
      navinnfour.querySelectorAll('ul').forEach((four) => { four.style.display = 'block'; });
    });
  }
  if (window.innerWidth < 900) {
    removeClassAfterDelay();
    const navContainer = document.querySelector('.nav-sec-sec1');
    navContainer.addEventListener('click', (event) => {
      const clickedListItem = event.target.closest('li.comlist');
      if (!clickedListItem) {
        return;
      }
      const submenu = clickedListItem.querySelector(':scope > ul');
      if (!submenu) {
        return;
      }
      event.stopPropagation();
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        submenu.closest('li').setAttribute('aria-expanded', 'false');
      } else {
        submenu.style.display = 'block';
        if (submenu.querySelector('.default-content-wrapper') !== null) {
          const subfilt = Array.from(submenu.querySelector('.default-content-wrapper').children);
          subfilt.forEach((elulsub) => {
            elulsub.style.display = 'block';
          });
        }
        submenu.closest('li').setAttribute('aria-expanded', 'true');
        if (submenu.closest('.nav-sec-sub2')) {
          const mosub = submenu.querySelector('.sub-popup-sec1 .sub-popup-sub3');
          if (mosub) {
            mosub.querySelector('.sub-popup-list5 ul').style.display = 'block';
            mosub.querySelector('.sub-popup-list6 ul').style.display = 'block';
          }
        }
      }
    });
  }

  const searchtemp = block.querySelector('.nav-tools .nav-tools-sec1 .nav-tools-inner-net1');
  const iconcls = searchtemp.querySelector('.nav-tools-list-content1');
  const navmain = block.closest('body');
  const navblk = navmain.querySelector('main');
  navblk.classList.add('nfo-nav');
  iconcls.addEventListener('click', () => {
    const nfoban = block.querySelector('.nfo-banner');
    const navelement = block.querySelector('nav');
    if (nfoban.style.display === 'none') {
      nfoban.style.display = 'block';
      navblk.classList.add('nfo-nav');
      navelement.classList.add('nfo-nav');
    } else {
      nfoban.style.display = 'none';
      navblk.classList.remove('nfo-nav');
      navelement.classList.remove('nfo-nav');
    }
  });

  const loginevent = block.querySelector('.nav-tools .nav-tools-sub4');// .nav-tools-inner-net1');
  loginevent.addEventListener('click', () => {
    const nextel = loginevent.querySelector('ul');
    if (nextel.style.display === 'none') {
      nextel.style.display = 'block';
    } else {
      nextel.style.display = 'none';
    }
  });
  Array.from(loginevent.querySelectorAll('a')).forEach((anchor) => {
    anchor.removeAttribute('href');
  });
  document.addEventListener('click', (event) => {
    try {
      const logineventab = block.querySelector('.nav-tools .nav-tools-sub4 .nav-tools-inner-net1');
      if (!logineventab.contains(event.target)) {
        const nextel = logineventab.nextElementSibling;
        nextel.style.display = 'none';
      }
    } catch (error) {
      // console.log(error)
    }
  });
  const userProfile = block.querySelector('.nav-tools .nav-tools-sub4');
  if (userProfile.querySelector('.nav-tools-inner-net2 .icon-user-icon-header img')) {
    dataMapMoObj.altFunction(
      userProfile.querySelector('.nav-tools-inner-net2 .icon-user-icon-header img'),
      'User Profile',
    );
  }
}
