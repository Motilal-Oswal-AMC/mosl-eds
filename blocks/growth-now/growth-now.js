/*    */
import formblock from '../form/form.js';

export default function decorate(block) {
  console.log(block);
  formblock(block.querySelector('.button-container'));
  Array.from(block.children).forEach((row, rowIndex) => {
    // row.classList.add("fund-us-container");
    row.classList.add(`fund-sec-${rowIndex + 1}`);
    // Array.from(row.children).forEach((column, colIndex) => {
    //     column.classList.add("find-us-container-column");
    //     column.classList.add(`sebtxt-${colIndex + 1}`);
    // });
  });
}
