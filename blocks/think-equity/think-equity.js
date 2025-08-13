/*   */
export default function decorate(block) {
  Array.from(block.children).forEach((el, index) => {
    el.classList.add(`imagelist${index + 1}`);
    Array.from(el.children).forEach((elsub) => {
      elsub.classList.add('subimagelist');
    });
  });
  Array.from(
    block
      .closest('.think-equity-container')
      .querySelector('.default-content-wrapper').children,
  ).forEach((el, i) => {
    el.classList.add(`item-child-${i + 1}`);
  });
  Array.from(
    block.closest('.think-equity-container').querySelector('.columns-wrapper')
      .children[0].children[0].children,
  ).forEach((elem, index) => {
    elem.classList.add(`item-child-${index + 1}`);
    Array.from(elem.children).forEach((ele, ind) => {
      ele.classList.add(`subitem-child-${ind + 1}`);
    });
  });
}
