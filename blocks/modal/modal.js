// eslint-disable-next-line import/no-cycle
import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock, decorateBlock, loadBlock, loadCSS,
} from '../../scripts/aem.js';

export async function createModal(contentNodes) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);
  const contentNodesClass = [...contentNodes].filter(
    (node) => node.classList && node.classList.contains('risk-o-meter-container'),
  );
  // if (contentNodesClass.length === 0) {
  //   contentNodesClass = [...contentNodes].filter(
  //     (node) => node.classList && node.classList.contains('live-streaming'),
  //   );
  // }
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
  if (contentNodesClass.length !== 0) {
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
// async function openModalOnElement(fragmentUrl, clickedElement) {
//   // **IMPORTANT**: Replace '.your-card-class' with the actual class of your fund card!
//   let schcodeactive;
//   if (
//     clickedElement.parentElement.parentElement.parentElement.querySelector(
//       '.star',
//     ) !== null
//   ) {
//     schcodeactive = clickedElement.parentElement.parentElement.parentElement.querySelector(
//       '.star',
//     ).attributes.schcode.value;
//   } else {
//     const carwrapp = clickedElement.closest('.card-wrapper');
//     schcodeactive = carwrapp
//       .querySelector('.fund-name-title')
//       .getAttribute('schcode');
//   }
//   localStorage.setItem('schcodeactive', schcodeactive);
//   // const card = clickedElement.closest('.our-popular-funds')
//   //   || clickedElement.closest('.known-our-funds')
//   //   || clickedElement.closest('.fdp-card-container');

//   const card = clickedElement.closest('.our-popular-funds')
//     || clickedElement.closest('.known-our-funds')
//     || document.querySelector('main');

//   // const card = document.querySelector('main');

//   if (!card) {
//     // console.error('On-card modal: Could not find parent card with class ".your-card-class".');
//     return;
//   }

//   card.scrollIntoView({ behavior: 'smooth', block: 'start' });

//   // card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

//   const path = fragmentUrl.startsWith('http')
//     ? new URL(fragmentUrl, window.location).pathname
//     : fragmentUrl;
//   const fragment = await loadFragment(path);
//   if (!fragment) return;

//   card.classList.add('modal-active-parent');

//   const overlay = document.createElement('div');
//   overlay.classList.add('card-modal-overlay');
//   overlay.style.visibility = 'hidden';
//   overlay.style.position = 'absolute';
//   overlay.style.left = '-9999px';

//   overlay.append(...fragment.childNodes);
//   card.append(overlay);

//   requestAnimationFrame(() => {
//     overlay.style.visibility = '';
//     overlay.style.position = '';
//     overlay.style.left = '';
//   });

//   const block = overlay.querySelector('.block');
//   if (block) {
//     await decorateBlock(block);
//     await loadBlock(block);
//   }
//   // Call the function
//   const closeButton = overlay.querySelector('.modal-btn');
//   if (closeButton) {
//     document.body.classList.add('noscroll');
//     closeButton.addEventListener('click', (e) => {
//       e.stopPropagation(); // Stop click from bubbling further
//       const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });
//       async function removeClassAfterDelay() {
//         await delay(1200);
//         overlay.remove('.card-modal-overlay');
//       }
//       const classAdd = card.querySelector('.invest-now-homepage-container');
//       if (Array.from(classAdd.classList).includes('hide-modal')) {
//         classAdd.classList.remove('hide-modal');
//       }
//       classAdd.classList.add('hide-modal');
//       classAdd.classList.remove('modal-show');
//       // }
//       document.body.classList.remove('noscroll');
//       card.classList.remove('modal-active-parent');
//       overlay.classList.add('hide-overlay');
//       removeClassAfterDelay();
//       // classList.add('hide-overplay');
//     });
//   }
// }

// --- Specialized function for On-Card Modals (New) ---
async function openModalOnElement(fragmentUrl, clickedElement) {
  // This business logic for schcode can remain the same
  let schcodeactive;
  const cardWrapper = clickedElement.closest('.card-wrapper'); // More robust DOM traversal
  if (cardWrapper) {
    const starEl = cardWrapper.querySelector('.star');
    const titleEl = cardWrapper.querySelector('.fund-name-title');
    if (starEl && starEl.getAttribute('schcode')) {
      schcodeactive = starEl.getAttribute('schcode');
    } else if (titleEl && titleEl.getAttribute('schcode')) {
      schcodeactive = titleEl.getAttribute('schcode');
    }
  }
  localStorage.setItem('schcodeactive', schcodeactive);

  // --- START: NEW LOGIC BORROWED FROM createModal ---
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  if (!fragment) return;

  // 1. Create a proper <dialog> element
  const dialog = document.createElement('dialog');
  const dialogContent = document.createElement('div');
  dialogContent.classList.add('modal-content');
  dialogContent.append(...fragment.childNodes);
  dialog.append(dialogContent);

  // 2. Add a close button (you can style it to appear where you need it)
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button'); // Use your existing modal CSS
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.type = 'button';
  closeButton.innerHTML = '<span class="icon icon-close"></span>';
  closeButton.addEventListener('click', () => dialog.close());
  dialog.prepend(closeButton); // Prepend to the dialog itself

  // 3. Temporarily append to a new 'modal' block to load its content
  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  document.querySelector('.modal').classList.add('block');
  document.querySelector('.modal').classList.add('modal-journey');

  // Clean up the block and append the dialog
  block.innerHTML = '';
  block.append(dialog);

  // Decorate and load blocks *within* the fragment
  // for (const innerBlock of dialog.querySelectorAll('.block')) {
  //   decorateBlock(innerBlock);
  //   await loadBlock(innerBlock);
  // }

  // This is the most straightforward fix if your linter allows a standard `for` loop.
  const blocks = dialog.querySelectorAll('.block');
  const blockPromises = Array.from(blocks).map(async (innerBlock) => {
    decorateBlock(innerBlock);
    return loadBlock(innerBlock); // loadBlock returns a promise.
  });

  // Wait for all promises to resolve.
  await Promise.all(blockPromises);

  // 4. Add event listeners for cleanup
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open', 'noscroll');
    block.remove(); // Clean up the modal block from the DOM
  });

  // 5. Show the modal
  dialog.showModal();
  document.body.classList.add('modal-open', 'noscroll');
  // --- END: NEW LOGIC ---
}
// --- The SINGLE, SMART handler for ALL modal clicks ---
export function initializeModalHandlers() {
  document.body.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    // Check if it's a link to a modal fragment
    if (link.href.includes('/modals/')) {
      e.preventDefault();

      if (link.href.includes('fm-portfolio')) {
        const fmId = e.target.parentNode.getAttribute('data_id');
        localStorage.setItem('FM-AgentName', fmId);
        document.body.classList.add('noscroll');
      }

      // If it's our special card button, use the on-card logic
      if (link.classList.contains('invest-now') || link.classList.contains('card-btn') || link.classList.contains('submit')) {
        e.stopPropagation(); // Stop other listeners!
        await openModalOnElement(link.href, link);
        // await openModal(link.href);
      } else {
        // For all other modal links, use the default behavior
        await openModal(link.href);
      }
    }
  });
}

//  FDP PAN FUND
