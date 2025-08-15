import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock, decorateBlock, loadBlock, loadCSS,
} from '../../scripts/aem.js';

export async function createModal(contentNodes) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);
  const contentNodesClass = [...contentNodes].filter((node) => node.classList && node.classList.contains('risk-o-meter-container'));
  const dialog = document.createElement('dialog');
  const dialogContent = document.createElement('div');
  dialogContent.classList.add('modal-content');
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.type = 'button';
  closeButton.innerHTML = '<span class="icon icon-close"></span>';
  closeButton.addEventListener('click', () => dialog.close());
  if (contentNodesClass) {
    dialogContent.prepend(closeButton);
    dialogContent.classList.add('risk-meter');
  } else {
    dialog.prepend(closeButton);
  }

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  decorateBlock(block);
  await loadBlock(block);

  // close on click outside the dialog
  dialog.addEventListener('click', (e) => {
    const {
      left, right, top, bottom,
    } = dialog.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    block.remove();
  });

  block.innerHTML = '';
  block.append(dialog);

  return {
    block,
    showModal: () => {
      dialog.showModal();
      // reset scroll position
      setTimeout(() => { dialogContent.scrollTop = 0; }, 0);
      document.body.classList.add('modal-open');
    },
  };
}

// --- Original openModal function (unchanged) ---
export async function openModal(fragmentUrl) {
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  const { showModal } = await createModal(fragment.childNodes);
  showModal();
}

// --- Specialized function for On-Card Modals ---
async function openModalOnElement(fragmentUrl, clickedElement) {
  // **IMPORTANT**: Replace '.your-card-class' with the actual class of your fund card!
  const schcodeactive = clickedElement.parentElement.parentElement.parentElement.querySelector('.star').attributes.schcode.value;
  localStorage.setItem('schcodeactive', schcodeactive);
  const card = clickedElement.closest('.our-popular-funds');
  if (!card) {
    // console.error('On-card modal: Could not find parent card with class ".your-card-class".');
    return;
  }

  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;
  const fragment = await loadFragment(path);
  if (!fragment) return;

  const overlay = document.createElement('div');
  overlay.classList.add('card-modal-overlay');
  overlay.append(...fragment.childNodes);
  card.append(overlay);

  const block = overlay.querySelector('.block');
  if (block) {
    await decorateBlock(block);
    await loadBlock(block);
  }

  const closeButton = overlay.querySelector('.modal-btn');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop click from bubbling further
      overlay.remove();
    });
  }
}

// --- The SINGLE, SMART handler for ALL modal clicks ---
export function initializeModalHandlers() {
  document.body.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    // Check if it's a link to a modal fragment
    if (link.href.includes('/modals/')) {
      e.preventDefault();

      // If it's our special card button, use the on-card logic
      if (link.classList.contains('invest-now') && link.classList.contains('card-btn')) {
        e.stopPropagation(); // Stop other listeners!
        await openModalOnElement(link.href, link);
      } else {
        // For all other modal links, use the default behavior
        await openModal(link.href);
      }
    }
  });
}
