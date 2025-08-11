Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createModal = createModal;
exports.openModal = openModal;

const _fragment = require('../fragment/fragment.js');

const _aem = require('../../scripts/aem.js');

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError('Invalid attempt to spread non-iterable instance'); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]') return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
  This is not a traditional block, so there is no decorate function.
  Instead, links to a /modals/ path are automatically transformed into a modal.
  Other blocks can also use the createModal() and openModal() functions.
*/
function createModal(contentNodes) {
  let dialog; let dialogContent; let closeButton; let
    block;
  return regeneratorRuntime.async((_context) => {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _aem.loadCSS)(''.concat(window.hlx.codeBasePath, '/blocks/modal/modal.css')));

        case 2:
          dialog = document.createElement('dialog');
          dialogContent = document.createElement('div');
          dialogContent.classList.add('modal-content');
          dialogContent.append.apply(dialogContent, _toConsumableArray(contentNodes));
          dialog.append(dialogContent);
          closeButton = document.createElement('button');
          closeButton.classList.add('close-button');
          closeButton.setAttribute('aria-label', 'Close');
          closeButton.type = 'button';
          closeButton.innerHTML = '<span class="icon icon-close"></span>';
          closeButton.addEventListener('click', () => dialog.close());
          dialogContent.prepend(closeButton);
          block = (0, _aem.buildBlock)('modal', '');
          document.querySelector('main').append(block);
          (0, _aem.decorateBlock)(block);
          _context.next = 19;
          return regeneratorRuntime.awrap((0, _aem.loadBlock)(block));

        case 19:
          // close on click outside the dialog
          dialog.addEventListener('click', (e) => {
            const _dialog$getBoundingCl = dialog.getBoundingClientRect();
            const { left } = _dialog$getBoundingCl;
            const { right } = _dialog$getBoundingCl;
            const { top } = _dialog$getBoundingCl;
            const { bottom } = _dialog$getBoundingCl;

            const { clientX } = e;
            const { clientY } = e;

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
          return _context.abrupt('return', {
            block,
            showModal: function showModal() {
              dialog.showModal(); // reset scroll position

              setTimeout(() => {
                dialogContent.scrollTop = 0;
              }, 0);
              document.body.classList.add('modal-open');
            },
          });

        case 24:
        case 'end':
          return _context.stop();
      }
    }
  });
}

function openModal(fragmentUrl) {
  let path; let fragment; let _ref; let
    showModal;

  return regeneratorRuntime.async((_context2) => {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          path = fragmentUrl.startsWith('http') ? new URL(fragmentUrl, window.location).pathname : fragmentUrl;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _fragment.loadFragment)(path));

        case 3:
          fragment = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(createModal(fragment.childNodes));

        case 6:
          _ref = _context2.sent;
          showModal = _ref.showModal;
          showModal();

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  });
}
