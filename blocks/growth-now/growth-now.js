import formblock from '../form/form.js';

export default function decorate(block) {
  // console.log(block);
  Array.from(block.children).forEach((row) => {
    row.classList.add('fund-us-container');
    // row.classList.add(`fund-us-container-${rowIndex + 1}`);
    Array.from(row.children).forEach((column, colIndex) => {
      // column.classList.add('fund-sec');
      column.classList.add(`fund-sec-${colIndex + 1}`);
    });
  });
  const storeWrapper = document.createElement('div');
  storeWrapper.classList.add('fund-sec-5');
  const storeBlock = block.querySelector('.fund-sec-2 ul');
  storeWrapper.append(storeBlock);
  block.querySelector('.fund-us-container').appendChild(storeWrapper);
  // let formwrapper = document.createElement('div');
  // formwrapper.classList.add('fund-sec-5');
  const formstore = block.querySelector('.fund-sec-2 .button-container');
  formblock(formstore);
}
