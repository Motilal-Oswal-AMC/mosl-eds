import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
// import { loadAutoBlock } from '../../scripts/scripts.js';
import dataMapMoObj from '../../scripts/constant.js';
import {a, button, div ,h3, li, ul} from '../../scripts/dom-helpers.js';
 
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
    // const navSections = nav.querySelector('.nav-sections');
    // const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    // if (navSectionExpanded && isDesktop.matches) {
    //   // eslint-disable-next-line no-use-before-define
    //   toggleAllNavSections(navSections, false);
    // } else if (!isDesktop.matches) {
    //   // eslint-disable-next-line no-use-before-define
    //   toggleMenu(nav, navSections, false);
    // }
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

  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle('open');
      dropdownTrigger.classList.toggle('active');
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
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach(async (navSection) => {
      if (navSection.querySelector('ul')) {
        navSection.classList.add('nav-drop');
        const hrefnaf = navSection.querySelector('ul li');
        const frgnav = await loadFragment(hrefnaf.children[0].getAttribute('href'));
        hrefnaf.innerHTML = '';
        // debugger
        hrefnaf.append(frgnav.children[0]);
      }
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
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
    if (window.innerWidth < 900) {
      const mobBlock = div({
        'class': 'accordion-container'
      },
      button({
              'class': 'accordion-header-outer'
          },
          'Our Funds',
      ),
      div({
              'class': 'accordion-panel-outer'
          },
          div({
                  'class': 'inner-accordion-container'
              },
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Indian Equity',
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('Large Cap'),
                      li('Large & Mid Cap'),
                      li('Mid Cap'),
                      li('Small Cap'),
                      li('Flexi Cap'),
                      li('Multi Cap'),
                      li('Sector'),
                      li('Tax Saver (ELSS)')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Other Categories'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('International Equity'),
                      li('Hybrid & Balanced'),
                      li('Multi Asset'),
                      li('ETFs'),
                      li('Commodity'),
                      li('Debt & Liquid'),
                      li('Index Funds')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Popular Funds'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('Motilal Oswal Asset Allocation Passive Fund Conservative'),
                      li('Motilal Oswal Nifty 500 Momentum 50 Index Fund'),
                      li('Motilal Oswal Mid Cap Fund'),
                      li('Motilal Oswal Flexi Cap Fund')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Related Links'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li(a({
                              'href': '#'
                          },
                          'Factsheet'
                      )),
                      li(a({
                              'href': '#'
                          },
                          'Presentations'
                      )),
                      li(a({
                              'href': '#'
                          },
                          'NAV & TER'
                      )),
                      li(a({
                              'href': '#'
                          },
                          'iNAV'
                      ))
                  )
              )
          )
      ),
      button({
              'class': 'accordion-header-outer'
          },
          'Services'
      ),
      div({
              'class': 'accordion-panel-outer'
          },
          div({
                  'class': 'inner-accordion-container'
              },
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Downloads'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('Statements & Reports'),
                      li('Factsheet'),
                      li('Forms'),
                      li('Product Literature')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Other Services'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('NAV & TER'),
                      li('Track Your Transaction Status'),
                      li('Autopay (Mandate) Registration'),
                      li('Grievance Redressal')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Update Account Details'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('Email ID'),
                      li('Mobile No.'),
                      li('KYC Status'),
                      li('Modify KYC'),
                      li('Nominee'),
                  )
              )
          )
      ),
      button({
              'class': 'accordion-header-outer'
          },
          'Calculators'
      ),
      div({
              'class': 'accordion-panel-outer'
          },
          div({
                  'class': 'inner-accordion-container'
              },
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Plan Your Investments'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('SIP Calculator'),
                      li('Cost of delay Calculator'),
                      li('SWP Calculator'),
                      li('Lumpsum Calculator'),
                      li('Inflation Calculator')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Goal Calculators'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('Retirement planning'),
                      li('Buying a House'),
                      li('Plan a Trip'),
                      li('Child’s Education')
                  )
              )
          )
      ),
      button({
              'class': 'accordion-header-outer'
          },
          'Investor Education'
      ),
      div({
              'class': 'accordion-panel-outer'
          },
          div({
                  'class': 'inner-accordion-container'
              },
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Content Library'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li('Blogs'),
                      li('Videos'),
                      li('Podcasts'),
                      li('5 Keys of Investing'),
                      li('Glossary')
                  )
              ),
              button({
                      'class': 'accordion-header-inner'
                  },
                  'Mutual Fund Categories'
              ),
              div({
                      'class': 'accordion-panel-inner'
                  },
                  ul(
                      li(a({
                              'href': '#'
                          },
                          'Equity Funds'
                      )),
                      li(a({
                              'href': '#'
                          },
                          'International Equities'
                      )),
                      li(a({
                              'href': '#'
                          },
                          'Hybrid and Balanced'
                      )),
                      li(a({
                              'href': '#'
                          },
                          'Index Funds'
                      ))
                  )
              )
          )
      )
      );
      navSections.append(mobBlock);
      navSections.children[0].style.display = 'none';

      function setupAccordion(headerClass, panelClass) {
        const headers = navSections.querySelectorAll(headerClass);

        headers.forEach(header => {
            header.addEventListener("click", function() {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                
                if (panel.style.minHeight) {
                    panel.style.minHeight = 0;
                    // Reset padding for outer panels
                    if (panel.classList.contains('accordion-panel-outer')) {
                       panel.style.padding = "0 0 0 16px";
                    }
                } else {
                    panel.style.minHeight = panel.scrollHeight + "px";
                    // Set padding for outer panels when opened
                    if (panel.classList.contains('accordion-panel-outer')) {
                       panel.style.padding= "0 0 0 16px";
                    }
                }
            });
        });
      }

    // Initialize both accordions
      setupAccordion(".accordion-header-outer", ".accordion-panel-outer");
      setupAccordion(".accordion-header-inner", ".accordion-panel-inner");
    }
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
    });

    dropMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', () => {
      if (dropMenu.classList.contains('open')) {
        dropMenu.classList.remove('open');
        dropTrigger.classList.remove('active');
      }
    });
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
  // if (getMetadata('breadcrumbs').toLowerCase() === 'true') {
  //   navWrapper.append(await buildBreadcrumbs());
  // }
  // loadAutoBlock();
}
