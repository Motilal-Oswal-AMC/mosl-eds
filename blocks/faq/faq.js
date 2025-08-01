/* eslint-disable */

/**
 * Transforms a content block into an accessible accordion.
 * - Only one item can be open (expanded) at a time.
 * - Initially shows a limited number of items (e.g., 3).
 * - Provides a "Load More" / "Show Less" button to toggle visibility of extra items.
 * @param {HTMLElement} block The accordion block element.
 */
export default function decorate(block) {
  // Part 1: Convert the initial HTML structure into semantic <details> elements.
  // This part assumes the source HTML is made of DIVs, as in the original problem.
  [...block.children].forEach((row) => {
    const [label, body] = row.children;
    if (!label || !body || !body.textContent.trim()) {
      row.remove(); // Remove malformed or empty rows
      return;
    }

    const summary = document.createElement('/.freq-ask-ques summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    body.className = 'accordion-item-body';

    const details = document.createElement('.freq-ask-ques details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });

  const allItems = block.querySelectorAll('.freq-ask-ques .accordion-item');
  if (!allItems.length) return;

  // Part 2: Add the "one-at-a-time" expand/collapse functionality.
  allItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        allItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  // Part 3: Implement the "Load More" / "Show Less" functionality.
  const itemsToShowInitially = 3;
  const section = block.closest('.section.freq-ask-ques');
  const loadMoreButton = section?.querySelector('.freq-ask-ques .button-container a.button');

  // If there are not enough items to hide or no button is found, do nothing.
  if (allItems.length <= itemsToShowInitially || !loadMoreButton) {
    if(loadMoreButton) loadMoreButton.parentElement.remove(); // Remove button if not needed
    return;
  }

  // Initially hide all items beyond the initial limit.
  allItems.forEach((item, index) => {
    if (index >= itemsToShowInitially) {
      item.classList.add('hidden');
    }
  });

  loadMoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    const isShowingAll = block.querySelector('.freq-ask-ques .accordion-item.hidden') === null;

    if (isShowingAll) {
      // If all are showing, HIDE the extra items.
      allItems.forEach((item, index) => {
        if (index >= itemsToShowInitially) {
          item.classList.add('hidden');
          item.open = false; // Also close the item when hiding it
        }
      });
      loadMoreButton.textContent = 'Load More';
      block.scrollIntoView({ behavior: 'smooth' }); // Scroll up for better UX
    } else {
      // If some are hidden, SHOW all items.
      block.querySelectorAll('.freq-ask-ques .accordion-item.hidden').forEach((hiddenItem) => {
        hiddenItem.classList.remove('hidden');
      });
      loadMoreButton.textContent = 'Show Less';
    }
  });
}