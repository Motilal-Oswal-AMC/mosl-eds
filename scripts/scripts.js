import { loadEmbed } from '../blocks/embed/embed.js';
import loadFragment from "../blocks/fragment/fragment.js"; // eslint-disable-line
import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';
import dataMapMoObj from './constant.js';

import delayed from './delayed.js';
import { initializeModalHandlers } from '../blocks/modal/modal.js';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
function wrapImgsInLinks(container) {
  const pictures = container.querySelectorAll('picture');
  pictures.forEach((pic) => {
    const link = pic.nextElementSibling;
    if (link && link.tagName === 'A' && link.href) {
      link.innerHTML = pic.outerHTML;
      pic.replaceWith(link);
    }
  });
}
function autolinkFragements(element) {
  element.querySelectorAll('a').forEach((origin) => {
    if (origin && origin.href && origin.href.includes('/fragment/')) {
      const parent = origin.parentElement;
      const div = document.createElement('div');
      div.append(origin);
      parent.append(div);
      loadFragment(div);
    }
  });
}
export function moveAttributes(from, to, attributes) {
  let attrs = attributes;
  if (!attrs) {
    attrs = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attrs.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter(
        (attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-'),
      ),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) {
      sessionStorage.setItem('fonts-loaded', 'true');
    }
  } catch (e) {
    // do nothing
  }
}
// function autolinkModals(element) {
//   element.addEventListener('click', async (e) => {
//     const origin = e.target.closest('a');

//     if (origin && origin.href && origin.href.includes('/modals/')) {
//       e.preventDefault();
//       const { openModal } = await import(
//         `${window.hlx.codeBasePath}/blocks/modal/modal.js`
//       );
//       openModal(origin.href);
//     }
//   });
// }

function autolinkVideo(element) {
  const origin = element.querySelector('a');

  if (origin && origin.href && origin.href.includes('/www.youtube.com/')) {
    // e.preventDefault();
    // const { openModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
    // openModal(origin.href);
    loadEmbed(origin, origin.href);
  }
  // });
}

// loadEmbed(block,link)

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    //   -next-line no-console
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
//   -next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  autolinkVideo(doc);
  // autolinkModals(doc);
  const main = doc.querySelector('main');
  autolinkFragements(doc);
  wrapImgsInLinks(doc);
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  //   -next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

/// API ///
export function fetchAPI(method, url, data) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // Optional: tag which API endpoint was called
        // Sentry.configureScope(function (scope) {
        //   scope.setTag("api-url", url); // Add a tag
        //   scope.setContext("api-request", {
        //     method,
        //     url,
        //     data
        //   });
        // });

        if (method === 'GET') {
          const resp = await fetch(url);
          resolve(resp);
        } else if (method === 'POST') {
          data.headerJson = data.headerJson || {
            'Content-Type': 'application/json',
          };
          if (data.headerJson['Content-Type'] === 'remove') {
            data.headerJson['Content-Type'] = '';
          } else {
            data.headerJson['Content-Type'] = data.headerJson['Content-Type']
              ? data.headerJson['Content-Type']
              : 'application/json';
          }
          /* Optimzie Code */
          const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data.requestJson),
            headers: data.headerJson,
            // mode: 'no-cors'
          });
          const response = await fetch(request);
          const json = await response.json();
          resolve({ responseJson: json });
        }
      } catch (error) {
        reject(error);
      }
    })();
  });
}

window.addEventListener('load', () => {
  delayed(); // ✅ this must be here!
});

// Fragment 15 Apr 25

export function getTimeLeft(targetDateStr) {
  const now = new Date();
  const targetDate = new Date(targetDateStr);

  // Calculate the time difference in milliseconds
  const diffMs = targetDate - now;

  if (diffMs <= 0) {
    return "Time's up!";
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  // Pad with leading zeros if needed
  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(days)} days ${pad(hours)} hrs ${pad(minutes)} mins left`;
}

export function initObserver(block, callback) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(block);
}
export function evaluateByDays(pastDateStr) {
  const now = new Date();
  const pastDate = new Date(pastDateStr);

  // Check for future dates
  if (now < pastDate) {
    return 'Date is in the future';
  }

  // Calculate difference in milliseconds and convert to days
  const diffMs = now - pastDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Apply logic based on days
  if (diffDays === 365) {
    return 'Annualised';
  }
  if (diffDays > 365) {
    return 'CAGR';
  }
  if (diffDays >= 180 && diffDays < 365) {
    return 'Annualised';
  }
  return 'Annualised'; // `${diffDays} days`;
}

export function wishlist() {
  dataMapMoObj.schstar = [];
  const paramCount = document.querySelectorAll('.star-filled');
  paramCount.forEach((el) => {
    dataMapMoObj.schstar.push(el.getAttribute('schcode'));
  });
  document.querySelector('.watchlisttext span').textContent = '';
  if (paramCount.length < 10) {
    document.querySelector(
      '.watchlisttext span',
    ).textContent = `My Watchlist (0${paramCount.length})`;
  } else {
    document.querySelector(
      '.watchlisttext span',
    ).textContent = `My Watchlist (${paramCount.length})`;
  }
}
window.hlx = window.hlx || {};
window.hlx.utils = {
  getTimeLeft,
  evaluateByDays,
  wishlist,
};

initializeModalHandlers();
if (document.querySelector('.quick-actions') !== null) {
  dataMapMoObj.CLASS_PREFIXES = ['quckactmain', 'quckactmain-sub', 'quckactmain-sub-wrp', 'quicksubactmain', 'quicksubinnactmain', 'quckaqweactmain'];
  dataMapMoObj.addIndexed(document.querySelector('.quick-actions'));
}
