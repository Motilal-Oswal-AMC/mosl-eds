/**
 * Transforms a content block into an accessible accordion.
 * - Only one item can be open (expanded) at a time.
 * - Initially shows a limited number of items (e.g., 3).
 * - Provides a "Load More" / "Show Less" button to toggle visibility of extra items.
 * @param {HTMLElement} block The accordion block element.
 */
export default function decorate(block) {
  // Convert the initial HTML structure into semantic <details> elements
  [...block.children].forEach((row) => {
    const [label, body] = row.children;

    if (!label || !body || !body.textContent.trim()) {
      row.remove(); // Remove malformed or empty rows
      return;
    }

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    body.className = 'accordion-item-body';

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });

  const allItems = block.querySelectorAll('.accordion-item');
  if (!allItems.length) return;

  // One-at-a-time expand/collapse functionality
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

  // Load More / Show Less functionality
  const itemsToShowInitially = 3;
  const section = block.closest('.section.freq-ask-ques');
  const loadMoreButton = section?.querySelector('.freq-ask-ques .button-container a.button');

  if (allItems.length <= itemsToShowInitially || !loadMoreButton) {
    if (loadMoreButton) loadMoreButton.parentElement.remove(); // Remove button if not needed
    return;
  }

  // Initially collapse items beyond the limit
  allItems.forEach((item, index) => {
    if (index >= itemsToShowInitially) {
      item.classList.add('collapsed');
      item.open = false;
    }
  });

  loadMoreButton.addEventListener('click', (event) => {
    event.preventDefault();

    const isShowingAll = [...allItems].every((item, index) => index < itemsToShowInitially || !item.classList.contains('collapsed'));

    if (isShowingAll) {
      // Collapse extra items
      allItems.forEach((item, index) => {
        if (index >= itemsToShowInitially) {
          item.classList.add('collapsed');
          item.open = false;
        }
      });
      loadMoreButton.textContent = 'Load More';
      block.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Expand all items
      allItems.forEach((item) => item.classList.remove('collapsed'));
      loadMoreButton.textContent = 'Show Less';
    }
  });
}
