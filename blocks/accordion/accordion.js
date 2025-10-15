import { isDesktop } from '../header/header.js';

/**
 * Transforms a content block into an accessible accordion.
 * - First item is open by default (except mob-accordion on desktop).
 * - Only one item can be open at a time.
 * - "Load More" / "Show Less" toggles visibility of extra items.
 *
 * @param {HTMLElement} block - The accordion block element.
 */
export default function decorate(block) {
  if (window.location.href.includes('author')) return;

  // --- Part 1: Convert rows to semantic <details>/<summary> ---
  [...block.children].forEach((row) => {
    const [label, body] = row.children;
    if (!label || !body || !body.textContent.trim()) {
      row.remove();
      return;
    }

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    body.className = 'accordion-item-body';

    const detailsEl = document.createElement('details');
    detailsEl.className = 'accordion-item';
    detailsEl.append(summary, body);

    row.replaceWith(detailsEl);
  });

  const allItems = block.querySelectorAll('.accordion-item');
  if (!allItems.length) return;

  // --- Part 2: Accordion behavior ---
  if (block.closest('.section.mob-accordion') && isDesktop.matches) {
    // In mob-accordion + desktop → keep all open but prevent toggling
    allItems.forEach((item) => {
      item.setAttribute('open', '');
      // item.addEventListener('click', (e) => e.preventDefault());
      item.addEventListener('click', (e) => {
        e.preventDefault();
        window.addEventListener('resize', () => {
          if (item.getAttribute('open')) {
            item.setAttribute('open', '');
          }
        });
      });
    });
  } else {
    // Normal accordion → first item open by default, only one open at a time
    allItems[0].setAttribute('open', '');
    allItems.forEach((item) => {
      // const classPage = ['faq', 'our-funds'];
      if (block.closest('.freq-ask-ques')) {
        item.addEventListener('click', () => {
          allItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.removeAttribute('open');
            }
          });
        });
      } else {
        item.addEventListener('toggle', () => {
          if (item.open) {
            allItems.forEach((otherItem) => {
              if (otherItem !== item) {
                otherItem.removeAttribute('open');
              }
            });
          }
        });
      }
    });
  }

  // --- Part 3: Load More / Show Less ---
  const itemsToShowInitially = 3;
  const section = block.closest('.section');
  const loadMoreButton = section?.querySelector('.button-container a.button');

  if (!loadMoreButton || allItems.length <= itemsToShowInitially) {
    if (loadMoreButton) loadMoreButton.parentElement.remove();
    return;
  }

  // Hide items beyond initial count
  allItems.forEach((item, index) => {
    if (index >= itemsToShowInitially) item.classList.add('hidden');
  });

  loadMoreButton.addEventListener('click', (event) => {
    event.preventDefault();

    const isShowingAll = !block.querySelector('.accordion-item.hidden');

    if (isShowingAll) {
      // Hide extras
      allItems.forEach((item, index) => {
        if (index >= itemsToShowInitially) {
          item.classList.add('hidden');
          item.open = false;
        }
      });
      loadMoreButton.textContent = 'Load More';
      block.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Show all
      block.querySelectorAll('.accordion-item.hidden').forEach((item) => {
        item.classList.remove('hidden');
      });
      loadMoreButton.textContent = 'Show Less';
    }
  });

  if (
    window.location.href.includes('/motilalfigma/our-funds') || window.location.href.includes('/motilalfigma/motilal-oswal-edge')
  ) {
    const mainwrapper = block.closest('.freq-ask-ques');
    if (mainwrapper && !mainwrapper.querySelector('.faq-our-fund')) {
      const divwrapper = document.createElement('div');
      divwrapper.classList.add('faq-our-fund');
      if (block.closest('.table-wrapper')) {
        divwrapper.classList.add('fdp-faq-inner');
        block.closest('.table-wrapper').children[0]
          .classList.add('accordian-parent');
        block.closest('.table-wrapper').children[0]
          .querySelector('p').classList.add('faq-title');
        block.closest('.table-wrapper').children[2]
          .classList.add('accor-parent');
      }
      Array.from(mainwrapper.children).forEach((elchild) => {
        divwrapper.append(elchild);
      });
      mainwrapper.append(divwrapper);
    }
  }
}
