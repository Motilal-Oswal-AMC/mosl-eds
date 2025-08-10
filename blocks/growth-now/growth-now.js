import formblock from '../form/form.js';

export default function decorate(block) {
  // console.log(block);
  formblock(block.querySelector('.button-container'));
  Array.from(block.children).forEach((row) => {
    row.classList.add('fund-us-container');
    // row.classList.add(`fund-us-container-${rowIndex + 1}`);
    Array.from(row.children).forEach((column, colIndex) => {
      // column.classList.add('fund-sec');
      column.classList.add(`fund-sec-${colIndex + 1}`);
    });
  });
}
