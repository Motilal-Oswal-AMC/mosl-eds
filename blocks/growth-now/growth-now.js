import formblock from '../form/form.js';

export default function decorate(block) {
  // console.log(block)
  Array.from(block.children).forEach((row, rowIndex) => {
    row.classList.add('fund-us-container');
    row.classList.add(`growth-now-row-${rowIndex + 1}`);
    Array.from(row.children).forEach((column, colIndex) => {
      // column.classList.add('fund-sec');
      column.classList.add(`fund-sec-${colIndex + 1}`);
    });
  });
  formblock(block.querySelector('.button-container'));
}
