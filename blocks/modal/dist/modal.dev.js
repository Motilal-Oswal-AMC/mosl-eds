/*
 * Modal Block
 * This is not a traditional block, so there is no decorate function.
 * Instead, links to a /modals/ path are automatically transformed into a modal.
 */
import { loadFragment } from '../fragment/fragment.js'; //eslint-disable-line 
import {
  buildBlock,
  decorateBlock,
  loadBlock,
  loadCSS,
} from '../../scripts/aem.js'; //eslint-disable-line 

/**
 * Creates a modal dialog.
 * @param {NodeList} contentNodes The nodes to add to the modal body.
 * @returns {object} An object with the block and a function to show the modal.
 */
async function createModal(contentNodes) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);

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
  dialogContent.prepend(closeButton);

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  decorateBlock(block);
  await loadBlock(block);

  // Close the modal when a user clicks outside the dialog area
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left
      || e.clientX > rect.right
      || e.clientY < rect.top
      || e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });

  // Remove the modal from the DOM when it is closed
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
      // Reset scroll position to the top
      setTimeout(() => {
        dialogContent.scrollTop = 0;
      }, 0);
      document.body.classList.add('modal-open');
    },
  };
}

/**
 * Fetches fragment content and opens it in a modal.
 * @param {string} fragmentUrl The URL of the fragment to display.
 */
async function openModal(fragmentUrl) {
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  if (fragment) {
    const { showModal } = await createModal([...fragment.childNodes]);
    showModal();
  }
}

export { createModal, openModal };
