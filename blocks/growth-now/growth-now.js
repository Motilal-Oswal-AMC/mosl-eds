import dataMapMoObj from '../../scripts/constant.js';
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
  // block.querySelector(".growth-now-row-2 .fund-sec-3 ul")

  const ulfund = block.querySelector('.growth-now-row-2 .fund-sec-3 ul');
  ulfund.classList.add('fundgul');
  // Array.from(ulfund).forEach((dfer) => {
  //   dfer.classList.add("fundgulli");
  // });

  dataMapMoObj.CLASS_PREFIXES = ['growth-sectri', 'growth-mainthr', 'growth-subthr'];
  dataMapMoObj.addIndexed(ulfund);
  ulfund.querySelectorAll('a').forEach((ela) => {
    ela.classList.add('ahreg');
  });

  const goggleplaystore = block.querySelector('.fundgul');
  dataMapMoObj.altFunction(
    goggleplaystore.querySelector('.comlist.growth-sectri1 img'),
    'Download on Google Play',
  );

  dataMapMoObj.altFunction(
    goggleplaystore.querySelector('.comlist.growth-sectri2 img'),
    'Download on the App Store',
  );
}
