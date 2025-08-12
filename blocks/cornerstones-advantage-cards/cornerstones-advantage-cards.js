export default function decorate(block) {
  const cardsChildren = block.querySelectorAll('.cornerstones-advantage-cards > div');
  cardsChildren.forEach((ele) => {
    ele.classList.add('cards-item');
    Array.from(ele.children[0].children).forEach((ele, ind) => {
      ele.classList.add(`item-child-${ind + 1}`, 'item-child');
    });
  });
}
